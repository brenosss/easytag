import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";

import { prisma } from "../../../server/db/client";
import { type SessionUser } from "../../../types/next-auth";
import { env } from "../../../env/server.mjs";

import Stripe from 'stripe';

const BASIC_PRODUCT = "price_1Mz2j8IJ9u9L1WwdixGBwdyM"

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

async function createCheckoutSession(stripeCustomerId: string): Promise<Stripe.Checkout.Session> {
  const session = await stripe.checkout.sessions.create({
    success_url: env.PAYMENTS_SUCCESS_URL,
    line_items: [
      {price: BASIC_PRODUCT, quantity: 1},
    ],
    mode: 'subscription',
    customer: stripeCustomerId,
  });
  return session;
}

async function post(
  req: NextApiRequest,
  res: NextApiResponse,
  sessionUser: SessionUser
): Promise<void> {
  const user = await prisma.user.findFirst({
    where: {
      id: sessionUser.id,
    },
    include: {
      customer: true,
    },
  });
  if (!user) {
    return res.status(404).json({ error: "Not found" });
  }
  if (user.customer === null) {
    const params: Stripe.CustomerCreateParams = {
        email: user.email,
        name: user.name,
      };

    const customer = await stripe.customers.create(params)
    await prisma.customer.create({
      data: {
        stripeCustomerId: customer.id,
        userId: user.id,
        paymentStatus: "incomplete",
      },
    });
    return res.status(200).json({ url: (await createCheckoutSession(customer.id)).url });
  }
  return res.status(200).json({ url: (await createCheckoutSession(user.customer.stripeCustomerId)).url });
}

async function get(
  req: NextApiRequest,
  res: NextApiResponse,
  sessionUser: SessionUser
): Promise<void> {

  const customer = await prisma.customer.findFirst({
    where: {
      userId: sessionUser.id,
    },
  });

  if (customer) {
    return res.status(200).json({status: customer.paymentStatus});
  } else {
    return res.status(200).json({status: "incomplete"});
  }
}

const payments = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  if (!session || !session.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  try {
    if (req.method === "GET") await get(req, res, session.user);
    if (req.method === "POST") await post(req, res, session.user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default payments;
