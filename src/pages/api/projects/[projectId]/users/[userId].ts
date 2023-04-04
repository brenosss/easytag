import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerAuthSession } from "../../../../../server/common/get-server-auth-session";
import { prisma } from "../../../../../server/db/client";
import { type SessionUser } from "../../../../../types/next-auth";

const patch = async (
  req: NextApiRequest,
  res: NextApiResponse,
  sessionUser: SessionUser,
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
  const amITryingToUpdateMyself = sessionUser.id === userToBeUpdatedId;
  if (!amITryingToUpdateMyself) {
    return res.status(403).json({ error: "Forbidden" });
  }
  if (invitation.pending === false) {
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
      pending: false,
    },
  });
  res.status(200).json({ message: "Invite accepted" });
};

const deleteRelation = async (
  req: NextApiRequest,
  res: NextApiResponse,
  sessionUser: SessionUser,
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
  const amITryingToDeleteMyself = sessionUser.id === userToBeDeletedId;
  if (!amITryingToDeleteMyself) {
    return res.status(403).json({ error: "Forbidden" });
  }
  const relationship = await prisma.usersInProjects.findUnique({
    where: {
      projectId_userId: {
        projectId,
        userId: sessionUser.id,
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

const amIInProject = async (projectId: string, sessionUser: SessionUser) => {
  const relationship = await prisma.usersInProjects.findUnique({
    where: {
      projectId_userId: {
        projectId,
        userId: sessionUser.id,
      },
    },
  });
  return Boolean(relationship);
};

const projectUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  if (!session || !session.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const { projectId, userId: userToBeChanged } = req.query;
  if (typeof projectId !== "string" || typeof userToBeChanged !== "string") {
    return res.status(400).json({ error: "Invalid params" });
  }
  if (!(await amIInProject(projectId, session.user))) {
    return res.status(403).json({ error: "Forbidden" });
  }
  try {
    if (req.method === "PATCH")
      return patch(req, res, session.user, projectId, userToBeChanged);
    if (req.method === "DELETE")
      return deleteRelation(req, res, session.user, projectId, userToBeChanged);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
export default projectUser;
