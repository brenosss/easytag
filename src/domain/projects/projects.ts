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

export async function getProjectBySessionToken(sessionToken: string): Promise<Project> {
  const user = await prisma.user.findFirst({
    where: {
      sessions: {
        some: {
          sessionToken: sessionToken
        }
      }
    },
    include: {
      UsersInProjects: {
        where: {
          selected: true
        },
        include: {
          project: true
        }
      }
    }
  })
  if(!user) throw new Error('No user cookie found')
  const userInProjects = user.UsersInProjects[0]
  if(!userInProjects) throw new Error('No UsersInProjects found')
  return userInProjects.project
}