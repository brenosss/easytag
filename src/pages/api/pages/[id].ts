import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";


async function get(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (typeof req.query.id !== "string") {
    res.status(400).json({message: "Bad request"});
    return;
  }
  const page = await prisma.page.findUnique({where: {id: req.query.id}});
  res.status(200).json(page);
}


async function patch(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (typeof req.query.id !== "string") {
    res.status(400).json({message: "Bad request"});
    return;
  }
  const page = await prisma.page.update({
    where: {id: req.query.id},
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
  if(req.method === "GET") await get(req, res);
  if(req.method === "PATCH") await patch(req, res);
};


export default pages;
