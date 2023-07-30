import { prisma } from "src/server/db/client";


export async function changeUserInProjectRole(projectId: string, userId: string, role: string) {
  return await prisma.usersInProjects.update({
    where: {
      projectId_userId: {
        projectId: projectId,
        userId: userId,
      },
    },
    data: {
      role: role,
    },
  });
}
