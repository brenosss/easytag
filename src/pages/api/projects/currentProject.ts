import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";

import { prisma } from "../../../server/db/client";
import { type SessionUser } from "../../../types/next-auth";

async function get(
  req: NextApiRequest,
  res: NextApiResponse,
  user: SessionUser
): Promise<void> {
  const project = await prisma.usersInProjects.findFirst({
    where: {
      userId: user.id,
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
  res.status(200).json(project.project);
}

const currentProject = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  if (!session || !session.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  try {
    if (req.method === "GET") await get(req, res, session.user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default currentProject;
