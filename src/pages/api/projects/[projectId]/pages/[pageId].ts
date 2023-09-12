import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "src/server/db/client";
import { CloudFlareImage } from "src/server/integrations/cloud-flare";
import { getToken } from "next-auth/jwt";
import { env } from "src/env/server.mjs";

async function get(
  req: NextApiRequest,
  res: NextApiResponse,
  pageId: string
): Promise<void> {
  const page = await prisma.page.findUnique({
    where: { id: pageId },
  });
  if (!page) return res.status(404).json({ error: "Page not found" });
  res.status(200).json(page);
}

async function patch(
  req: NextApiRequest,
  res: NextApiResponse,
  pageId: string
): Promise<void> {
  let image = req.body.image;
  if (req.body.newImage && typeof req.body.newImage === "string" ) {
    const cloudFlareImage = new CloudFlareImage(req.body.newImage)
    image = (await cloudFlareImage.upload()).result.variants[0];
  }
  const page = await prisma.page.update({
    where: { id: pageId },
    data: {
      path: req.body.path,
      title: req.body.title,
      description: req.body.description,
      image: image,
      twitterCard: req.body.twitterCard,
    },
  });
  res.status(200).json({ message: "Page updated", data: page });
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

const pages = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req, secret: env.NEXTAUTH_SECRET });
  if (!token || !token.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const { projectId, pageId } = req.query;
  if (typeof projectId !== "string" || typeof pageId !== "string") {
    return res.status(400).json({ error: "Invalid/missing project or page" });
  }
  if (!(await amIInProject(projectId, token.userId))) {
    return res.status(403).json({ error: "Forbidden" });
  }
  try {
    if (req.method === "GET") await get(req, res, pageId);
    if (req.method === "PATCH") await patch(req, res, pageId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default pages;
