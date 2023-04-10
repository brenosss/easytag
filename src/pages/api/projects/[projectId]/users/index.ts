import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerAuthSession } from "../../../../../server/common/get-server-auth-session";
import { prisma } from "../../../../../server/db/client";
import { type SessionUser } from "../../../../../types/next-auth";

const post = async (
  req: NextApiRequest,
  res: NextApiResponse,
  projectId: string
) => {
  const userToBeAdded = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });
  if (!userToBeAdded) {
    return res.status(404).json({ error: "User not found" });
  }
  const isUserAlreadyInProject = await prisma.usersInProjects.findUnique({
    where: {
      projectId_userId: {
        userId: userToBeAdded.id,
        projectId,
      },
    },
  });
  if (isUserAlreadyInProject) {
    return res.status(400).json({ error: "User already in project" });
  }
  await prisma.usersInProjects.create({
    data: {
      projectId,
      userId: userToBeAdded.id,
    },
  });
  return res.status(201).json({ message: "User invited to project" });
};

const get = async (
  req: NextApiRequest,
  res: NextApiResponse,
  projectId: string
) => {
  const usersInProject = await prisma.usersInProjects.findMany({
    where: {
      projectId,
      pending: false,
    },
    include: {
      user: true,
    },
  });
  return res.status(200).json(usersInProject);
};

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

const projectUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  if (!session || !session.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const { projectId } = req.query;
  if (typeof projectId !== "string") {
    return res.status(400).json({ error: "Invalid project id" });
  }
  if (!(await amIInProject(projectId, session.user))) {
    return res.status(403).json({ error: "Forbidden." });
  }
  try {
    if (req.method === "POST") await post(req, res, projectId);
    if (req.method === "GET") await get(req, res, projectId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default projectUsers;
