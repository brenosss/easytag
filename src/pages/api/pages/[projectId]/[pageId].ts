import { type NextApiRequest, type NextApiResponse } from "next";
import { type SessionUser } from "src/types/next-auth";
import { prisma } from "src/server/db/client";
import { getServerAuthSession } from "src/server/common/get-server-auth-session";

async function deletePage(
  req: NextApiRequest,
  res: NextApiResponse,
  pageId: string
): Promise<void> {
  try {
    await prisma.page.delete({
      where: { id: pageId },
    });
    res.status(200).json({ message: "Page deleted successfully" });
  } catch (error) {
    console.error('This error ocurred:', error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

const amIInProject = async (projectId: string, sessionUser: SessionUser) => {
  return Boolean(
    await prisma.usersInProjects.findUnique({
      where: {
        projectId_userId: {
          projectId,
          userId: sessionUser.id,
        },
      },
    })
  );
};

const Delete = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  const { projectId, pageId } = req.query;

  if (!session || !session.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  if (typeof projectId !== "string" || typeof pageId !== "string") {
    return res.status(400).json({ error: "Invalid/missing project or page" });
  }
  if (!(await amIInProject(projectId, session.user))) {
    return res.status(403).json({ error: "Forbidden" });
  }
  try {
    await deletePage(req, res, pageId);
    res.status(200).json({ message: "Page deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export default Delete;