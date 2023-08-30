import { type NextApiRequest, type NextApiResponse } from "next";

import { getServerAuthSession } from "../../../../../server/common/get-server-auth-session";

import { prisma } from "src/server/db/client";
import { type SessionUser } from "../../../../../types/next-auth";
import { CloudFlareImage } from "src/server/integrations/cloud-flare";

async function post(
  req: NextApiRequest,
  res: NextApiResponse,
  projectId: string
): Promise<void> {
  let image = req.body.image;
  if (req.body.newImage && typeof req.body.newImage === "string") {
    const cloudFlareImage = new CloudFlareImage(req.body.newImage)
    image = (await cloudFlareImage.upload()).result.variants[0];
  }
  const page = await prisma.page.create({
    data: {
      path: req.body.path,
      title: req.body.title,
      description: req.body.description,
      image: image,
      projectId,
      twitterCard: req.body.twitterCard,
    },
  });
  res.status(200).json(page);
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

const pages = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  if (!session || !session.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const { projectId } = req.query;
  if (typeof projectId !== "string") {
    return res.status(400).json({ error: "Invalid/missing projectId" });
  }
  if (!(await amIInProject(projectId, session.user))) {
    return res.status(403).json({ error: "Forbidden." });
  }
  try {
    if (req.method === "POST") await post(req, res, projectId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default pages;
