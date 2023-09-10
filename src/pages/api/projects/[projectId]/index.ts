import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../../server/db/client";
import { env } from "src/env/server.mjs";
import { getToken } from "next-auth/jwt"

async function get(
  req: NextApiRequest,
  res: NextApiResponse,
  projectId: string,
  userId: string
): Promise<void> {
  const userProject = await prisma.usersInProjects.findFirst({
    where: {
      userId: userId,
      projectId: projectId,
    },
    include: {
      project: true,
    },
  });

  if (userProject) {
    return res.status(200).json(userProject.project);
  } else {
    return res.status(404).json({ error: "Not found" });
  }
}

async function patch(
  req: NextApiRequest,
  res: NextApiResponse,
  projectId: string,
  userId: string
): Promise<void> {
  await prisma.usersInProjects.update({
    where: {
      projectId_userId: {
        userId: userId,
        projectId: projectId,
      },
    },
    data: {
      selected: true,
    },
  });

  await prisma.usersInProjects.updateMany({
    where: {
      userId: userId,
      projectId: {
        not: projectId,
      },
    },
    data: {
      selected: false,
    },
  });
  res.status(200).json({ selected: projectId });
}

const pages = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req, secret: env.NEXTAUTH_SECRET });
  if (!token || !token.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const { projectId } = req.query;
  if (typeof projectId != "string")
    return res.status(400).json({ error: "Bad request" });
  try {
    if (req.method === "GET") await get(req, res, projectId, token.userId);
    if (req.method === "PATCH") await patch(req, res, projectId, token.userId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default pages;
