import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";

import { prisma } from "../../../server/db/client";

async function get(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const pages = await prisma.page.findMany();
  res.status(200).json(pages);
}

async function post(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const page = await prisma.page.create({
    data: {
      path: req.body.path,
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
    },
  });
  res.status(200).json(page);
}

const pages = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  if (req.method === "GET") await get(req, res);
  else if (req.method === "POST") await post(req, res);
};

export default pages;
