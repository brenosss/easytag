import type { UsersInProjects, User } from "@prisma/client";
import { getCookie } from "cookies-next";
import { type GetServerSideProps } from "next";
import Head from "next/head";
import { PrimaryLink } from "../../../components/Buttons/Links";
import Layout from "../../../components/Layout/Index";
import { type NextPageWithLayout } from "../../_app";

const UsersInProjectPage: NextPageWithLayout = ({
  usersInProject,
}: {
  usersInProject: UsersInProjects & { user: User }[];
}) => {
  const projectId = getCookie("projectId");
  return (
    <>
      <Head>
        <title>Users in project</title>
      </Head>
      <div className="mx-auto max-w-lg p-5">
        <PrimaryLink
          href={{ pathname: "/[projectId]/users/invite", query: { projectId } }}
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
UsersInProjectPage.getLayout = (page) => <Layout>{page}</Layout>;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const { projectId } = req.cookies;

  const usersInProjectsResponse = await fetch(
    `http://localhost:3000/api/projects/${projectId}/users`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...req.headers,
      },
    }
  );

  const usersInProject = await usersInProjectsResponse.json();
  return {
    props: { usersInProject },
  };
};

export default UsersInProjectPage;
