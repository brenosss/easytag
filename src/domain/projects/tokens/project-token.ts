import { prisma } from "src/server/db/client";
import type { APIToken } from "@prisma/client";


export async function getTokenByProjectId(projectId: string): Promise<APIToken | null> {
  return await prisma.aPIToken.findFirst({
    where: {
      projectId: projectId,
    }
  });
}

export async function createToken(projectId: string): Promise<APIToken> {
  return await prisma.aPIToken.create({
    data: {
      token: (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toLocaleUpperCase(),
      projectId: projectId,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 10)
    }
  });
}
