import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";


async function get(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const pages = await prisma.page.findMany();
  res.status(200).json(pages);
}

async function post(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const page = await prisma.page.create({
    data: {
      path: req.body.path,
    }
  });
  res.status(200).json(page);
}

const pages = async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === "GET") await get(req, res);
  else if(req.method === "POST") await post(req, res);
};


export default pages;
