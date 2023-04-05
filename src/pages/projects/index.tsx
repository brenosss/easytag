import { getCookie, setCookie } from "cookies-next";
import { type GetServerSideProps } from "next";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

interface Project {
  id: string;
  name: string;
  description: string;
}

const Projects = ({ projects }: { projects: Project[] }) => {
  const router = useRouter();
  const session = useSession();

  async function selectProject(project: Project) {
    setCookie("projectId", project.id);
    await router.push({
      pathname: "/[projectId]/pages",
      query: { projectId: project.id },
    });
  }

  async function leftProject(project: Project) {
    await fetch(`/api/projects/${project.id}/users/${session.data?.user?.id}`, {
      method: "DELETE",
    });
    router.reload();
  }

  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>
      <div className="flex h-screen flex-col items-center p-8">
        <div className="flex gap-x-2">
          {getCookie("projectId") && (
            <Link
              className="rounded bg-emerald-600 py-1.5 px-2 text-sm font-bold text-white"
              href={{
                pathname: "/[projectId]/pages",
                query: { projectId: getCookie("projectId") },
              }}
            >
              Homepage
            </Link>
          )}
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}
            className="rounded bg-emerald-600 py-1.5 px-2 text-sm font-bold text-white"
          >
            Sign out
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div>
              <h1 className="text-base font-semibold leading-6 text-gray-900">
                Your projects
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all projects that you are currently working on.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <Link
                href="/projects/create"
                type="button"
                className="block rounded-md bg-emerald-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                Create a new project
              </Link>
            </div>
          </div>
          <div className="inline-block min-w-full p-6">
            <table className="w-full min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Description
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="w-full divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project.name}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {project.name}
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                      {project.description}
                    </td>
                    <td className="relative flex gap-x-2 whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      {project.id !== getCookie("projectId") && (
                        <button
                          onClick={() => selectProject(project)}
                          className="text-emerald-600 hover:text-emerald-900"
                        >
                          Select
                        </button>
                      )}
                      <button
                        onClick={() => leftProject(project)}
                        className="text-red-600 hover:text-emerald-900"
                      >
                        Left
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const projectsResponse = await fetch("http://localhost:3000/api/projects", {
    method: "GET",
    headers: { "Content-Type": "application/json", ...context.req.headers },
  });
  const projects = await projectsResponse.json();
  if (projects.length === 0) {
    return {
      redirect: { destination: "/projects/create", permanent: false },
    };
  }
  return {
    props: { projects },
  };
};

Projects.auth = true;
export default Projects;
