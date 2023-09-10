import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../../../../server/db/client";
import { getUsersByProjectId } from "src/domain/projects/users/users-in-projects";
import { getToken } from "next-auth/jwt";
import { env } from "src/env/server.mjs";


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
  return res.status(200).json(getUsersByProjectId(projectId));
};

const amIInProject = async (projectId: string, userId: string) => {
  return Boolean(
    await prisma.usersInProjects.findUnique({
      where: {
        projectId_userId: {
          projectId,
          userId: userId,
        },
      },
    })
  );
};

const projectUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req, secret: env.NEXTAUTH_SECRET });
  if (!token || !token.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const { projectId } = req.query;
  if (typeof projectId !== "string") {
    return res.status(400).json({ error: "Invalid project id" });
  }
  if (!(await amIInProject(projectId, token.userId))) {
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
