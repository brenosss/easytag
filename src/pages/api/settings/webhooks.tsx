import { buffer } from 'micro';
import Cors from 'micro-cors';
import { type NextApiRequest, type NextApiResponse } from "next";
import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";

import Stripe from 'stripe';

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
});

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
}

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const sig = req.headers['stripe-signature']!
    const buf = await buffer(req)
    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(buf, sig, env.STRIPE_WEBHOOK_SECRET)
    } catch (err) {
      console.log(`❌ Error message: ${err.message}`)
      res.status(400).send("Webhook Error!")
      return
    }
    if (event.type === 'checkout.session.completed') {
      if(event.data.object.customer === null) {
        res.status(400).send("Webhook Error!")
      }
      await prisma.customer.update({
        where: {
          stripeCustomerId: event.data.object.customer,
        },
        data: {
          paymentStatus: "active",
        },
      });
    }
    res.status(200).send("Ok")
  }
}
export default cors(webhookHandler as any)