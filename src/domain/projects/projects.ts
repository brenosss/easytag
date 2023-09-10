import { prisma } from "src/server/db/client";
import type { Project } from "@prisma/client";

export function getProjectById(projectId: string): Promise<Project | null> {
  return prisma.project.findUnique({
    where: {
      id: projectId,
    }
  });
}

export async function getLastSelectedProject(userId: string): Promise<Project | null> {
  const project = await prisma.project.findFirst({
    where: {
      UsersInProjects: {
        some: {
          userId: userId,
          selected: true
        }
      }
    }
  })
  return project
}