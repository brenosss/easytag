import { type NextApiRequest, type NextApiResponse } from "next";

import { getServerAuthSession } from "../../../../../../server/common/get-server-auth-session";

import { prisma } from "src/server/db/client";


async function get(
  req: NextApiRequest,
  res: NextApiResponse,
  projectId: string,
  skip: number
): Promise<void> {
  const totalPages = await prisma.page.count({
    where: {
      projectId,
    },
  });
  const pages = await prisma.page.findMany({
    skip: skip,
    take: 15,
    where: {
      projectId,
    },
  });
  res.status(200).json({ "pages": pages, "totalPages": totalPages });
}

const pages = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  if (!session || !session.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const { projectId, skipIndex } = req.query;
  if (typeof projectId !== "string") {
    return res.status(400).json({ error: "Invalid/missing projectId" });
  }
  try {
    if (req.method === "GET") await get(req, res, projectId, Number(skipIndex));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default pages;
