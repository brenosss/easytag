import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import { getToken } from "next-auth/jwt";
import { env } from "src/env/server.mjs";

const get = async (
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string
): Promise<void> => {
  const projects = await prisma.project.findMany({
    where: {
      UsersInProjects: {
        some: {
          userId: userId,
          projectStatus: "PENDING",
        },
      },
    },
  });
  res.status(200).json(projects);
};

const invitations = async (req: NextApiRequest, res: NextApiResponse) => {
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

export default invitations;
