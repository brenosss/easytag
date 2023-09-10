import { type NextApiRequest, type NextApiResponse } from "next";
import { env } from "src/env/server.mjs";
import { prisma } from "../../../server/db/client";
import type { JWT } from "next-auth/jwt"
import { createToken } from "src/domain/projects/tokens/project-token";
import { getToken } from "next-auth/jwt"

async function get(
  req: NextApiRequest,
  res: NextApiResponse,
  token: JWT
): Promise<void> {
  const projects = await prisma.project.findMany({
    where: {
      UsersInProjects: {
        some: {
          userId: token.userId,
          projectStatus: "ACCEPTED",
        },
      },
    },
  });
  res.status(200).json(projects);
}

async function post(
  req: NextApiRequest,
  res: NextApiResponse,
  token: JWT
): Promise<void> {
  if (
    typeof req.body.name !== "string" ||
    typeof req.body.domain !== "string"
  ) {
    return res.status(400).json({ error: "Invalid param" });
  }
  const project = await prisma.project.create({
    data: {
      name: req.body.name,
      domain: req.body.domain,
    },
  });
  await createToken(project.id);
  await prisma.usersInProjects.create({
    data: {
      userId: token.userId,
      projectId: project.id,
      projectStatus: "ACCEPTED",
      role: "OWNER",
    },
  });
  await prisma.usersInProjects.updateMany({
    where: {
      userId: token.userId,
      projectId: {
        not: project.id,
      },
    },
    data: {
      selected: false,
    },
  });
  res.status(201).json(project);
}

const projects = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req, secret: env.NEXTAUTH_SECRET })
  if (!token || !token.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  try {
    if (req.method === "GET") await get(req, res, token);
    if (req.method === "POST") await post(req, res, token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default projects;
