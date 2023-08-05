import Head from "next/head";
import { cookies } from 'next/headers'
import { PrimaryLink } from "src/components/Buttons/Links";
import { getUsersByProjectId } from "src/domain/projects/users/users-in-projects";
import SelectionMenu from "src/components/Buttons/SelectionMenu";
import updateRelation from "src/pages/api/projects/[projectId]/users/update/[updateRequisition]";
import { changeUserInProjectRole } from 'src/domain/projects/change-role'

async function getUsersInProject() {
  const cookieStore = cookies();
  const projectCookie = cookieStore.get('project')
  if (!projectCookie) throw new Error('No project cookie found')
  const project = JSON.parse(projectCookie.value)
  return await getUsersByProjectId(project.id)
}

async function changeRole(index: number, item: number) {
  /* The "item" will be the item that was selected by the user */
  const usersInProject = await getUsersInProject();
  const user = [usersInProject]
  const cookieStore = cookies();
  const projectCookie = cookieStore.get('project')
  if (!projectCookie) throw new Error('No project cookie found')
  const project = JSON.parse(projectCookie.value)
  return await changeUserInProjectRole(project.id, user[index], item)
}

async function UsersInProjectPage() {
  const usersInProject = await getUsersInProject();

  /*
    Invalid is an attribute that tells whether the selection 
    menu item is available to be selected. The Owner is unavailable, 
    so no user will be able to change or select the owner - WIP
  */
  const roles = [
    { id: 1, name: 'Owner', invalid: true },
    { id: 2, name: 'Admin', invalid: false },
    { id: 3, name: 'Member', invalid: false }
  ]

  const initialSelectedIndexes = usersInProject.map((up) => {
    if (up.role === 'OWNER') return 0;
    if (up.role === 'ADMIN') return 1;
    if (up.role === 'MEMBER') return 2;
  });

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
            .map((up) => up.user)
            .map((person, index) => (
              <li key={person.email} className="py-4">
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="text-base font-medium text-gray-900">
                      {person.name}
                    </p>
                    <p className="text-base text-gray-500">{person.email}</p>
                  </div>
                  <div className="ml-auto">
                    <SelectionMenu
                      items={roles}
                      selected={initialSelectedIndexes[index]}
                      onChange={changeRole(index)}
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
