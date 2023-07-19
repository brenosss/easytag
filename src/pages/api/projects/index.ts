import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";

import { prisma } from "../../../server/db/client";
import { type SessionUser } from "../../../types/next-auth";

async function get(
  req: NextApiRequest,
  res: NextApiResponse,
  user: SessionUser
): Promise<void> {
  const projects = await prisma.project.findMany({
    where: {
      UsersInProjects: {
        some: {
          userId: user.id,
          pending: false,
        },
      },
    },
  });
  res.status(200).json(projects);
}

async function post(
  req: NextApiRequest,
  res: NextApiResponse,
  user: SessionUser
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
  await prisma.usersInProjects.create({
    data: {
      userId: user.id,
      projectId: project.id,
      pending: false,
    },
  });
  await prisma.usersInProjects.updateMany({
    where: {
      userId: user.id,
      projectId: {
        not: project.id,
      },
    },
    data: {
      selected: false,
    },
  });
  user.projects.push(project);
  res.status(201).json(project);
}

const projects = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  if (!session || !session.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  try {
    if (req.method === "GET") await get(req, res, session.user);
    if (req.method === "POST") await post(req, res, session.user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default projects;
