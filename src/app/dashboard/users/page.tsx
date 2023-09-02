import Head from "next/head";
import { cookies } from 'next/headers'
import { PrimaryLink } from "src/components/Buttons/Links";
import { getUsersByProjectId, getRoleBySession } from "src/domain/projects/users/users-in-projects";
import SelectionMenuUserRole from "src/app/dashboard/users/RoleSelection"
import type { UsersInProjectsWithUser } from "src/domain/projects/users/users-in-projects";
import type { User, UsersInProjects } from "@prisma/client"

async function getUsersInProject() {
  const cookieStore = cookies();
  const projectCookie = cookieStore.get('project')
  if (!projectCookie) throw new Error('No project cookie found')
  const project = JSON.parse(projectCookie.value)
  return await getUsersByProjectId(project.id)
}

async function getCurrentRoleBySession() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('next-auth.session-token')
  if (!sessionCookie) throw new Error('No session cookie found')
  const session = sessionCookie.value
  return await getRoleBySession(session)
}

async function UsersInProjectPage() {
  const usersInProject = await getUsersInProject();
  const myRole = await getCurrentRoleBySession();

  return (
    <>
      <Head>
        <title>Users in project</title>
      </Head>
      <div className="mx-auto max-w-2xl space-y-16 lg:mx-0 lg:max-w-none">
        <div>
          <h2 className="text-lg font-semibold leading-7 text-gray-900">Users</h2>
          <p className="mt-1 text-base leading-6 text-gray-500 mb-6">
            Manage the users that can access this project.
          </p>
          <div className="space-y-6 divide-y divide-gray-100 border-t mb-12"></div>
          <div className="flex justify-end">
            <PrimaryLink
              href={`/dashboard/users/invite`}
              className=""
            >
              Invite a new user
            </PrimaryLink>
          </div>
          <ul role="list" className="divide-y divide-gray-100 mt-4">
          {usersInProject.map((up: UsersInProjectsWithUser) => {
            const user = up.user;
            return <UserItem user={user} userInProject={up} key={user.email} showSelectionRole={myRole === 'OWNER' || myRole === 'ADMIN'}/>;
          })}
          </ul>
        </div>
      </div>
    </>
  );
}

function UserItem({ user, userInProject, showSelectionRole }: { user: User, userInProject: UsersInProjects, showSelectionRole: boolean }) {
  return (
    <li className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={user.image} alt="" />
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">{user.name}</p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">{user.email}</p>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        {user.lastSeen ? (
          <p className="mt-1 text-xs leading-5 text-gray-500">
            Last seen <time dateTime={user.lastSeenDateTime}>{user.lastSeen}</time>
          </p>
        ) : (
          <div className="mt-1 flex items-center gap-x-1.5">
            <p className="text-xs leading-5 text-gray-500 capitalize">{userInProject.projectStatus.toLowerCase()}</p>
          </div>
        )}
        {
          (showSelectionRole && userInProject.role !== 'OWNER' ) ?
          <SelectionMenuUserRole userInProject={userInProject}/> :
          <p className="text-xs leading-5 text-gray-500 capitalize">{userInProject.role.toLowerCase()}</p>
        }
      </div>
    </li>
  )
}

UsersInProjectPage.auth = true;

export default UsersInProjectPage;
