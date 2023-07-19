'use client';

import { setCookie } from "cookies-next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import projectContext from "src/contexts/projectContext";

interface Project {
  id: string;
  name: string;
  description: string;
}

const Projects = () => {
  const router = useRouter();
  const session = useSession();


  const [projects, setProjects] = useState<Project[]>([]);
  const { currentProject, setCurrentProject } = useContext(projectContext);

  async function getProjects() {
    const projectsResponse = await fetch("/api/projects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (projectsResponse.status === 200) {
      const projectsData = await projectsResponse.json();
      return projectsData.length === 0 ? await router.push("/dashboard/projects/create") : setProjects(projectsData);
    }
  }

  async function selectProject(project: Project) {
    setCookie("project", JSON.stringify(project));
    setCurrentProject(project);
    await fetch(`/api/projects/${project.id}`, {
      method: "PATCH",
    });
    await router.replace(`/dashboard/pages`);
  }

  async function leftProject(project: Project) {
    await fetch(`/api/projects/${project.id}/users/${session.data?.user?.id}`, {
      method: "DELETE",
    });
  }

  useEffect(() => {
    (async () => {
      await getProjects();
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>
      <div className="flex h-screen flex-col items-center">
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
                href="/dashboard/projects/create"
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
                  <tr key={project.name} onClick={() => selectProject(project)} className="cursor-pointer">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {project.name}
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                      {project.description}
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

Projects.auth = true;

Projects.auth = true;
export default Projects;
