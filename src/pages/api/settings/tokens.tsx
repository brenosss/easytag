import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";

import { prisma } from "../../../server/db/client";
import { type SessionUser } from "../../../types/next-auth";

async function get(
  req: NextApiRequest,
  res: NextApiResponse,
  sessionUser: SessionUser
): Promise<void> {

  const apiToken = await prisma.aPIToken.findFirst({
    where: {
      userId: sessionUser.id,
      // TODO: add expires date
    },
  });

  if (apiToken) {
    return res.status(200).json({token: apiToken.token});
  } else {
    return res.status(404).json({ error: "Not found" });
  }
}

async function post(
  req: NextApiRequest,
  res: NextApiResponse,
  sessionUser: SessionUser
): Promise<void> {

  await prisma.aPIToken.deleteMany({
    where: {
      userId: sessionUser.id,
    },
  });

  const apiToken = await prisma.aPIToken.create({
    data: {
      token: (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toLocaleUpperCase(),
      userId: sessionUser.id,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 10)
    }
  });

  if (apiToken) {
    return res.status(200).json({token: apiToken.token });
  } else {
    return res.status(404).json({ error: "Not found" });
  }
}

const tokens = async (req: NextApiRequest, res: NextApiResponse) => {
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

export default tokens;
