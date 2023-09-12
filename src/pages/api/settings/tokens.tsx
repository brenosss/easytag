import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";
import { getTokenByProjectId, createToken } from "src/domain/projects/tokens/project-token"
import { getLastSelectedProject } from "src/domain/projects/projects";
import { getToken } from "next-auth/jwt";


async function get(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string
): Promise<void> {
  const currentProject = await getLastSelectedProject(userId)
  if (currentProject === null) {
    return res.status(404).json({ error: "Not found" });
  }
  const apiToken = await getTokenByProjectId(currentProject.id)
  if (apiToken) {
    return res.status(200).json({ token: apiToken.token });
  } else {
    return res.status(404).json({ error: "Not found" });
  }
}

async function post(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string
): Promise<void> {

  const currentProject = await getLastSelectedProject(userId)
  if (currentProject === null) {
    return res.status(404).json({ error: "Not found" });
  }

  await prisma.aPIToken.deleteMany({
    where: {
      projectId: currentProject.id,
    },
  });

  const apiToken = await createToken(currentProject.id)
  if (apiToken) {
    return res.status(200).json({ token: apiToken.token });
  } else {
    return res.status(404).json({ error: "Not found" });
  }
}

const tokens = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !token.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  try {
    if (req.method === "GET") await get(req, res, token.userId);
    if (req.method === "POST") await post(req, res, token.userId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default tokens;
