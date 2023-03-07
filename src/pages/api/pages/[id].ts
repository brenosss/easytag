import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";


async function get(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (typeof req.query.id !== "string") {
    res.status(400).json({message: "Bad request"});
    return;
  }
  const pages = await prisma.page.findUnique({where: {id: req.query.id}});
  res.status(200).json(pages);
}

const pages = async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === "GET") await get(req, res);
};


export default pages;
