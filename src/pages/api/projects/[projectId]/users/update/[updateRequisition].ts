import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../../../../../server/db/client";
import { Status } from "@prisma/client"
import { getToken } from "next-auth/jwt";
import { env } from "src/env/server.mjs";


const patch = async (
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string,
  projectId: string,
  update: Status
): Promise<void> => {
  try {
    await prisma.usersInProjects.update({
      where: {
        projectId_userId: {
          projectId: projectId,
          userId: userId,
        },
      },
      data: { projectStatus: update },
    });
    return res.status(200).json({ message: "Update successful." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error updating record." });
  }
};

const updateRelation = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req, secret: env.NEXTAUTH_SECRET });
  const { projectId, updateRequisition } = req.query;

  if (!token || !token.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  if (typeof projectId !== "string") {
    return res.status(400).json({ error: "Invalid project id" });
  }
  if (typeof updateRequisition !== "string") {
    return res.status(400).json({ error: "Invalid update requisition" });
  }
  if (updateRequisition !== Status.ACCEPTED && updateRequisition !== Status.RECUSED && updateRequisition !== Status.PENDING) {
    return res.status(400).json({ error: "Invalid update requisition" });
  }
  if (req.method === "PATCH")
    await patch(req, res, token.userId, projectId, updateRequisition);
};

export default updateRelation;
