import { prisma } from "src/server/db/client";
import type { UsersInProjects, User, Role } from "@prisma/client";

export type UsersInProjectsWithUser = UsersInProjects & {
	user: User;
};

export async function getUsersByProjectId(projectId: string): Promise<UsersInProjectsWithUser[]> {
	return await prisma.usersInProjects.findMany({
		where: {
			projectId,
			projectStatus: "ACCEPTED",
		},
		include: {
			user: true,
		},
	});
}

export async function changeUserInProjectRole(userInprojectId: string, role: Role) {
  return await prisma.usersInProjects.update({
    where: {
      id: userInprojectId
    },
    data: {
      role: role,
    },
  });
}

export async function canUserEditRole(userId: string, userInProjectId: string) {
  const project = await prisma.usersInProjects.findUnique({
    where: {
      id: userInProjectId
    },
    select: {
      projectId: true
    }
  })
  if (!project) {
    return false
  }
  const role = await prisma.usersInProjects.findFirst({
    where: {
      userId: userId,
      projectId: project.projectId
    },
    select: {
      role: true
    }
  })
  if (!role) {
    return false
  }
  return role.role === 'ADMIN' || role.role === 'OWNER'
}

export async function getRoleBySession(sessionId: string): Promise<Role | null> {
  console.log(sessionId)
  const user = await prisma.user.findFirst({
    where: {
      sessions: {
        some: {
          sessionToken: sessionId
        }
      }
    },
    select: {
      UsersInProjects: {
        select: {
          role: true
        }
      }
    }
  })
  if (!user) {
    return null
  }
  const userInProject = user.UsersInProjects[0]
  if (!userInProject) {
    return null
  }
  return userInProject.role
}