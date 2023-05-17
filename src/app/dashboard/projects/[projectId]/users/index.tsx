import type { User, UsersInProjects } from "@prisma/client";
import { getCookie } from "cookies-next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { PrimaryLink } from "src/components/Buttons/Links";

const UsersInProjectPage = () => {
  const projectId = getCookie("projectId");
  const [usersInProject, setUsersInProject] = useState<UsersInProjects & { user: User }[]>([]);

  async function getUsersInProject() {
    const usersInProjectsResponse = await fetch(
      `/api/projects/${projectId}/users`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const usersInProject = await usersInProjectsResponse.json();
    setUsersInProject(usersInProject)
  }

  useEffect(() => {
    (async () => {
      await getUsersInProject();
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Users in project</title>
      </Head>
      <div className="mx-auto max-w-lg p-5">
        <PrimaryLink
          href={{ pathname: "/projects/[projectId]/users/invite", query: { projectId } }}
        >
          Invite a new user
        </PrimaryLink>
        <ul role="list" className="divide-y divide-gray-200 p-10">
          {usersInProject
            .map((up) => up.user)
            .map((person) => (
              <li key={person.email} className="flex py-4">
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {person.name}
                  </p>
                  <p className="text-sm text-gray-500">{person.email}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

UsersInProjectPage.auth = true;

export default UsersInProjectPage;
