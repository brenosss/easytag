import "src/styles/globals.css";
import Link from "next/link";
import LogoutButton from "src/components/Buttons/LogoutButton";

import { cookies } from 'next/headers'
import { getProjectBySessionToken } from "src/domain/projects/projects";
import { NavigationProject, NavigationUser, ProjectHeader } from "src/app/dashboard/HeaderComponents";


async function getCurrentProject() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('next-auth.session-token')
  if (!sessionCookie) throw new Error('No session cookie found')
  const session = sessionCookie.value
  return await getProjectBySessionToken(session)
}

export default async function Header() {

  const currentProject = await getCurrentProject()

  return (
    <header className="rounded-b-3xl pb-36">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-b border-white border-opacity-20" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-emerald-500 py-6 lg:border-none">
          <div className="flex items-center">
            {currentProject && (
              <Link
                href={`/projects/${currentProject.id}/pages`}
              >
                <span className="sr-only">Your Company</span>
              </Link>
            )}
            <div className="ml-10 hidden space-x-8  ">
              <NavigationUser />
            </div>
          </div>
          <div className="ml-10 space-x-4">
            <LogoutButton />
          </div>
        </div>
        <div className="flex flex-wrap justify-center space-x-6 py-4 hidden">
          <NavigationUser />
        </div>
      </nav>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 " aria-label="Top">
        <div className="flex w-full items-center border-b border-emerald-500 py-6 lg:border-none hidden lg:flex justify-between px-20">
          <ProjectHeader project={currentProject}/>
          <div className="flex items-center justify-between gap-x-4">
            <NavigationProject />
          </div>
        </div>
        <div className="flex flex-wrap justify-center space-x-6 py-4 lg:hidden">
          <NavigationProject />
        </div>
      </nav>
    </header>
  );
}