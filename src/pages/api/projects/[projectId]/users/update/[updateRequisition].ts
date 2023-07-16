import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerAuthSession } from "../../../../../../server/common/get-server-auth-session";
import { prisma } from "../../../../../../server/db/client";
import { type SessionUser } from "../../../../../../types/next-auth";

const patch = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user: SessionUser,
  projectId: string,
  update: string
): Promise<void> => {
  try {
    await prisma.usersInProjects.update({
      where: {
        projectId_userId: {
          projectId: projectId,
          userId: user.id,
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
  const session = await getServerAuthSession({ req, res });
  const { projectId, updateRequisition } = req.query;

  if (!session || !session.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  if (typeof projectId !== "string") {
    return res.status(400).json({ error: "Invalid project id" });
  }
  if (req.method === "PATCH")
    await patch(req, res, session.user, projectId, updateRequisition);
};

export default updateRelation;
