'use client';

import type { User, UsersInProjects } from "@prisma/client";
import Head from "next/head";
import { useEffect, useState } from "react";
import { PrimaryLink } from "src/components/Buttons/Links";
import { getProjectFromCookie } from "src/app/cookies";

const UsersInProjectPage = () => {
  const project = getProjectFromCookie();
  const [usersInProject, setUsersInProject] = useState<UsersInProjects & { user: User }[]>([]);

  async function getUsersInProject() {
    const usersInProjectsResponse = await fetch(
      `/api/projects/${project.id}/users`,
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
          href={`/dashboard/users/invite` }
        >
          Invite a new user
        </PrimaryLink>
        <ul role="list" className="divide-y divide-gray-200 p-10">
          {usersInProject
            .map((up) => up.user)
            .map((person) => (
              <li key={person.email} className="flex py-4">
                <div className="ml-3">
                  <p className="text-base font-medium text-gray-900">
                    {person.name}
                  </p>
                  <p className="text-base text-gray-500">{person.email}</p>
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
