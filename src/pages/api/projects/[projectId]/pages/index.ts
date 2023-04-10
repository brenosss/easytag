import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerAuthSession } from "../../../../../server/common/get-server-auth-session";

import { prisma } from "../../../../../server/db/client";
import { type SessionUser } from "../../../../../types/next-auth";

async function get(
  req: NextApiRequest,
  res: NextApiResponse,
  projectId: string
): Promise<void> {
  const pages = await prisma.page.findMany({
    where: {
      projectId,
    },
  });
  res.status(200).json(pages);
}

async function post(
  req: NextApiRequest,
  res: NextApiResponse,
  projectId: string
): Promise<void> {
  const page = await prisma.page.create({
    data: {
      path: req.body.path,
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      projectId,
    },
  });
  res.status(200).json(page);
}

const amIInProject = async (projectId: string, sessionUser: SessionUser) => {
  return Boolean(
    await prisma.usersInProjects.findUnique({
      where: {
        projectId_userId: {
          projectId,
          userId: sessionUser.id,
        },
      },
    })
  );
};

const pages = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  if (!session || !session.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const { projectId } = req.query;
  if (typeof projectId !== "string") {
    return res.status(400).json({ error: "Invalid/missing projectId" });
  }
  if (!(await amIInProject(projectId, session.user))) {
    return res.status(403).json({ error: "Forbidden." });
  }
  try {
    if (req.method === "GET") await get(req, res, projectId);
    if (req.method === "POST") await post(req, res, projectId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default pages;
