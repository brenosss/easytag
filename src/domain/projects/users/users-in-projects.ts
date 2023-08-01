import { prisma } from "src/server/db/client";
import type { UsersInProjects, User } from "@prisma/client";

type UsersInProjectsWithUser = UsersInProjects & {
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