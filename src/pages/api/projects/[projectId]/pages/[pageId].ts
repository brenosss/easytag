import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerAuthSession } from "../../../../../server/common/get-server-auth-session";

import { prisma } from "../../../../../server/db/client";
import { type SessionUser } from "../../../../../types/next-auth";

async function get(
  req: NextApiRequest,
  res: NextApiResponse,
  pageId: string
): Promise<void> {
  const page = await prisma.page.findUnique({
    where: { id: pageId },
  });
  if (!page) return res.status(404).json({ error: "Page not found" });
  res.status(200).json(page);
}

async function patch(
  req: NextApiRequest,
  res: NextApiResponse,
  pageId: string
): Promise<void> {
  const page = await prisma.page.update({
    where: { id: pageId },
    data: {
      path: req.body.path,
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
    },
  });
  res.status(200).json({ message: "Page updated", data: page });
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
  const { projectId, pageId } = req.query;
  if (typeof projectId !== "string" || typeof pageId !== "string") {
    return res.status(400).json({ error: "Invalid/missing project or page" });
  }
  if (!(await amIInProject(projectId, session.user))) {
    return res.status(403).json({ error: "Forbidden" });
  }
  try {
    if (req.method === "GET") await get(req, res, pageId);
    if (req.method === "PATCH") await patch(req, res, pageId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default pages;
