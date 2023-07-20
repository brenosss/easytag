
import "src/styles/globals.css";
import Link from "next/link";
import { Suspense, useContext } from 'react'
import LogoutButton from "src/components/Buttons/LogoutButton";
import { ArrowSmallLeftIcon } from "@heroicons/react/20/solid";


import projectContext from "src/contexts/projectContext";

export default function Header() {
  
    const { currentProject, setCurrentProject } = useContext(projectContext);

    const navigation_user = [
      { name: "Account", href: `/dashboard/pages`},
    ];

    const navigation_project = [
      { name: "Pages", href: `/dashboard/pages`},
      { name: "Users", href: `/dashboard/users`},
      { name: "Settings", href: "/dashboard/settings" },
    ];
  
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
              <div className="ml-10 hidden space-x-8 lg:block">
                {navigation_user.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-base font-medium text-white hover:text-emerald-50"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="ml-10 space-x-4">
              <LogoutButton />
            </div>
          </div>
          <div className="flex flex-wrap justify-center space-x-6 py-4 lg:hidden">
            {navigation_user.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-base font-medium text-white hover:text-emerald-50"
              >
                {link.name}
              </a>
            ))}
          </div>
        </nav>
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 " aria-label="Top">
          <div className="flex w-full items-center border-b border-emerald-500 py-6 lg:border-none hidden lg:flex justify-between px-20">
                <Link className="flex items-center" href="/dashboard/projects">
                  <ArrowSmallLeftIcon className="text-white p-2 w-20" />
                  <Suspense fallback={<p>Loading project...</p>}>
                  <div>
                    <p className="font-semibold text-3xl text-white">
                      {currentProject && currentProject.name}
                    </p>
                    <p className="flex-none text-xs text-white">
                      {currentProject && currentProject.domain}
                    </p>
                  </div>
                  </Suspense>
                </Link>
                <div className="flex items-center justify-between gap-x-4">
                  {navigation_project.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="items-center font-medium text-white hover:text-emerald-50 text-xl px-4"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
          </div>
          <div className="flex flex-wrap justify-center space-x-6 py-4 lg:hidden">
            {navigation_project.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="items-center font-medium text-white hover:text-emerald-50"
              >
                {link.name}
              </a>
            ))}
          </div>
        </nav>
      </header>
    );
  }