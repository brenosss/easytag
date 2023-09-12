import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../../../../server/db/client";
import { getToken } from "next-auth/jwt";
import { env } from "src/env/server.mjs";


const patch = async (
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string,
  projectId: string,
  userToBeUpdatedId: string
) => {
  const invitation = await prisma.usersInProjects.findUnique({
    where: {
      projectId_userId: {
        projectId,
        userId: userToBeUpdatedId,
      },
    },
  });
  if (!invitation) {
    return res.status(404).json({ error: "No invitation found" });
  }
  const amITryingToUpdateMyself = userId === userToBeUpdatedId;
  if (!amITryingToUpdateMyself) {
    return res.status(403).json({ error: "Forbidden" });
  }
  if (invitation.projectStatus === "ACCEPTED") {
    return res.status(400).json({ error: "Already accepted" });
  }
  await prisma.usersInProjects.update({
    where: {
      projectId_userId: {
        projectId,
        userId: userToBeUpdatedId,
      },
    },
    data: {
      projectStatus: "ACCEPTED",
    },
  });
  res.status(200).json({ message: "Invite accepted" });
};

const deleteRelation = async (
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string,
  projectId: string,
  userToBeDeletedId: string
) => {
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });
  if (!project) {
    return res.status(404).json({ error: "No project found" });
  }
  const amITryingToDeleteMyself = userId === userToBeDeletedId;
  if (!amITryingToDeleteMyself) {
    return res.status(403).json({ error: "Forbidden" });
  }
  const relationship = await prisma.usersInProjects.findUnique({
    where: {
      projectId_userId: {
        projectId,
        userId: userId,
      },
    },
  });
  if (!relationship) {
    return res.status(404).json({ error: "Relationship not found" });
  }
  await prisma.usersInProjects.delete({
    where: {
      projectId_userId: {
        projectId,
        userId: userToBeDeletedId,
      },
    },
  });
  return res.status(200).json({ message: "Left project" });
};

const amIInProject = async (projectId: string, userId: string) => {
  const relationship = await prisma.usersInProjects.findUnique({
    where: {
      projectId_userId: {
        projectId,
        userId: userId,
      },
    },
  });
  return Boolean(relationship);
};

const projectUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req, secret: env.NEXTAUTH_SECRET });
  if (!token || !token.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const { projectId, userId: userToBeChanged } = req.query;
  if (typeof projectId !== "string" || typeof userToBeChanged !== "string") {
    return res.status(400).json({ error: "Invalid params" });
  }
  if (!(await amIInProject(projectId, token.userId))) {
    return res.status(403).json({ error: "Forbidden" });
  }
  try {
    if (req.method === "PATCH")
      return patch(req, res, token.userId, projectId, userToBeChanged);
    if (req.method === "DELETE")
      return deleteRelation(req, res, token.userId, projectId, userToBeChanged);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
export default projectUser;
