import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { prisma } from "../../../server/db/client";
import { type SessionUser } from "../../../types/next-auth";

const get = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user: SessionUser
): Promise<void> => {
  const projects = await prisma.project.findMany({
    where: {
      UsersInProjects: {
        some: {
          userId: user.id,
          projectStatus: "pending"
        },
      },
    },
  });
  res.status(200).json(projects);
};

const invitations = async (req: NextApiRequest, res: NextApiResponse) => {
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

export default invitations;
