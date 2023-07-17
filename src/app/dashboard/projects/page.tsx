'use client';

import { setCookie } from "cookies-next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import projectContext from "src/contexts/projectContext";
import { LoadingButton } from "src/components/Buttons/LoadingButton";
import Notification from "src/components/Buttons/Notification";
interface Project {
  id: string;
  name: string;
  domain: string;
}

const Projects = () => {
  const router = useRouter();
  const session = useSession();

  const [projects, setProjects] = useState<Project[]>([]);
  const [pendingProjects, setPendingProjects] = useState<Project[]>([]);
  const [hasPendingProjects, setHasPendingProjects] = useState(false); // Adicione o estado para verificar se existem projetos pendentes
  const [isLoading, setIsLoading] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("")
  const [notificationDescription, setNotificationDescription] = useState("Reload the page to update your Projects")

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
  async function getPendingProjects() {
    const projectsResponse = await fetch("/api/projects/invitations", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (projectsResponse.status === 200) {
      const projectsData = await projectsResponse.json();
      if (projectsData.length === 0) {
        setPendingProjects([]);
        setHasPendingProjects(false);
      } else {
        setPendingProjects(projectsData);
        setHasPendingProjects(true);
      }
    }
  }

  async function selectProject(project: Project) {
    setCookie("project", JSON.stringify(project));
    setCurrentProject(project);
    await router.replace(`/dashboard/pages`);
  }

  async function leftProject(project: Project) {
    await fetch(`/api/projects/${project.id}/users/${session.data?.user?.id}/`, {
      method: "DELETE",
    });
  }
  async function declineInvitation(project: Project) {
    setIsLoading(true);
    await fetch(`/api/projects/${project.id}/users/update/recused`, {
      method: "PATCH",
    });
    setIsLoading(false);
    setNotificationTitle("Invitation declined")
  }

  async function acceptInvite(project: Project) {
    setIsLoading(true);
    await fetch(`/api/projects/${project.id}/users/update/accepted`, {
      method: "PATCH",
    });
    setIsLoading(false);
    setNotificationTitle("Invite accepted")
  }

  useEffect(() => {
    (async () => {
      await getProjects();
      await getPendingProjects();
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>
      {notificationTitle &&
        <Notification
          onClose={() => { setNotificationTitle("") }}
          title={notificationTitle}
          description={notificationDescription}
        />}
      <div className="flex flex-col items-center">
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
                    Domain
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="w-full divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project.name} onClick={() => selectProject(project)} className="cursor-pointer">
                    <td className="whitespace-nowrap hover:text-emerald-500 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {project.name}
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                      {project.domain}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-center divide-gray-200">
              <div>
                <h1 className="text-base font-semibold  pt-10 text-center leading-6 text-gray-900">
                  Invited Projects
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  Projects you were invited to be a part of.
                </p>
              </div>
            </div>
            {
              hasPendingProjects ?
                <>
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
                            className="py-3.5 px-3 text-center text-sm font-semibold text-gray-900"
                          >
                            Domain
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 px-3 text-center text-sm font-semibold text-gray-900"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="w-full divide-y divide-gray-200">
                        {pendingProjects.map((project) => (
                          <tr key={project.name} className="cursor:auto">
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                              {project.name}
                            </td>
                            <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                              {project.domain}
                            </td>
                            <td className="whitespace-nowrap items-center py-4 px-3 text-sm text-gray-500">
                              <LoadingButton
                                className="rounded-lg m-2.5 bg-emerald-600 p-2.5 text-sm font-medium text-white shadow ring-offset-0 hover:bg-emerald-500 focus:outline-3 disabled:cursor-not-allowed"
                                type="submit"
                                onClick={() => acceptInvite(project)}
                                disabled={isLoading}
                                isLoading={isLoading}
                                text="Accept"
                              />
                              <LoadingButton
                                className="rounded-lg m-2.5 bg-red-600 p-2.5 text-sm font-medium text-white shadow ring-offset-0 hover:bg-red-500 focus:outline-3 disabled:cursor-not-allowed"
                                type="submit"
                                onClick={() => declineInvitation(project)}
                                disabled={isLoading}
                                isLoading={isLoading}
                                text="Decline"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </> :
                <p className="mt-4 text-sm bg-yellow-100 rounded-full py-1 text-yellow-400 text-center">You have not been invited to any projects</p>}
          </div>
        </div>
      </div>
    </>
  );
};

Projects.auth = true;

Projects.auth = true;
export default Projects;