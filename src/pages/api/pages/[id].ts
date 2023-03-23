import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";

import { prisma } from "../../../server/db/client";

async function get(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (typeof req.query.id !== "string") {
    res.status(400).json({ message: "Bad request" });
    return;
  }
  const page = await prisma.page.findUnique({ where: { id: req.query.id } });
  res.status(200).json(page);
}

async function patch(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (typeof req.query.id !== "string") {
    res.status(400).json({ message: "Bad request" });
    return;
  }
  const page = await prisma.page.update({
    where: { id: req.query.id },
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
  if (req.method === "PATCH") await patch(req, res);
};

export default pages;
