import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";
import { getToken } from "next-auth/jwt";
import { env } from "src/env/server.mjs";


async function get(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string
): Promise<void> {
  const project = await prisma.usersInProjects.findFirst({
    where: {
      userId: userId,
      selected: true,
    },
    select: {
      project: {
        select: {
          id: true,
          name: true,
          domain: true,
        },
      },
    },
  });
  !!project && !!project.project ? res.status(200).json(project.project) : res.status(404).json({ error: "Project not found" });
}

const currentProject = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req, secret: env.NEXTAUTH_SECRET });
  if (!token || !token.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  try {
    if (req.method === "GET") await get(req, res, token.userId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default currentProject;
