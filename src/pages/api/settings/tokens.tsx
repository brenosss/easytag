import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";

import { prisma } from "../../../server/db/client";
import { type SessionUser } from "../../../types/next-auth";
import { getTokenByProjectId, createToken } from "src/domain/projects/tokens/project-token"
import { getLastSelectedProject } from "src/domain/projects/projects";

async function get(
  req: NextApiRequest,
  res: NextApiResponse,
  sessionUser: SessionUser
): Promise<void> {
  const currentProject = await getLastSelectedProject(sessionUser.id)
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
  sessionUser: SessionUser
): Promise<void> {

  const currentProject = await getLastSelectedProject(sessionUser.id)
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

export default tokens;
