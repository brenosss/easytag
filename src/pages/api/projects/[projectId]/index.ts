import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerAuthSession } from "../../../../server/common/get-server-auth-session";

import { prisma } from "../../../../server/db/client";
import { type SessionUser } from "../../../../types/next-auth";

async function get(
  req: NextApiRequest,
  res: NextApiResponse,
  projectId: string,
  sessionUser: SessionUser
): Promise<void> {
  const userProject = await prisma.usersInProjects.findFirst({
    where: {
      userId: sessionUser.id,
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
  user: SessionUser
): Promise<void> {
  await prisma.usersInProjects.update({
    where: {
      projectId_userId: {
        userId: user.id,
        projectId: projectId,
      },
    },
    data: {
      selected: true,
    },
  });

  await prisma.usersInProjects.updateMany({
    where: {
      userId: user.id,
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
  const session = await getServerAuthSession({ req, res });
  if (!session || !session.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const { projectId } = req.query;
  if (typeof projectId != "string")
    return res.status(400).json({ error: "Bad request" });
  try {
    if (req.method === "GET") await get(req, res, projectId, session.user);
    if (req.method === "PATCH") await patch(req, res, projectId, session.user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default pages;
