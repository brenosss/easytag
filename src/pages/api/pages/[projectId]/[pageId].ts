import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "src/server/db/client";
import { getToken } from "next-auth/jwt";
import { env } from "src/env/server.mjs";


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

const amIInProject = async (projectId: string, userId: string) => {
  return Boolean(
    await prisma.usersInProjects.findUnique({
      where: {
        projectId_userId: {
          projectId,
          userId: userId,
        },
      },
    })
  );
};

const Delete = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req, secret: env.NEXTAUTH_SECRET });
  const { projectId, pageId } = req.query;

  if (!token || !token.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  if (typeof projectId !== "string" || typeof pageId !== "string") {
    return res.status(400).json({ error: "Invalid/missing project or page" });
  }
  if (!(await amIInProject(projectId, token.userId))) {
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