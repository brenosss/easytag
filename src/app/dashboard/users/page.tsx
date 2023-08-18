import Head from "next/head";
import { cookies } from 'next/headers'
import { PrimaryLink } from "src/components/Buttons/Links";
import { getUsersByProjectId } from "src/domain/projects/users/users-in-projects";
import SelectionMenu from "src/components/Buttons/SelectionMenu";
import { changeUserInProjectRole } from "src/domain/projects/change-role";


async function getUsersInProject() {
  const cookieStore = cookies();
  const projectCookie = cookieStore.get('project')
  if (!projectCookie) throw new Error('No project cookie found')
  const project = JSON.parse(projectCookie.value)
  return await getUsersByProjectId(project.id)
}

async function getProjectFromCookie() {
  const cookieStore = cookies();
  const projectCookie = cookieStore.get('project')
  if (!projectCookie) throw new Error('No project cookie found')
  const project = JSON.parse(projectCookie.value)
  return project;
}
async function UsersInProjectPage() {
  const project = getProjectFromCookie();

  const usersInProject = await getUsersInProject();
  return (
    <>
      <Head>
        <title>Users in project</title>
      </Head>
      <div className="mx-auto max-w-lg p-5">
        <PrimaryLink
          href={`/dashboard/users/invite`}
        >
          Invite a new user
        </PrimaryLink>
        <ul role="list" className="divide-y divide-gray-200 p-10">
          {usersInProject
            .map((up) => (
              <li key={up.user.email} className="py-4">
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="text-base font-medium text-gray-900">
                      {up.user.name}
                    </p>
                    <p className="text-base text-gray-500">{up.user.email}</p>
                  </div>
                  <div className="ml-auto">
                    <SelectionMenu
                      userInProject={up.role}
                      project={project.id}
                    ></SelectionMenu>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

UsersInProjectPage.auth = true;

export default UsersInProjectPage;
