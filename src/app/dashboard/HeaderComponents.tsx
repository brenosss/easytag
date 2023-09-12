'use client';

import "src/styles/globals.css";
import Link from "next/link";
import { clsx } from "clsx";
import { Suspense } from 'react'
import { ArrowSmallLeftIcon } from "@heroicons/react/20/solid";
import type { Project } from "@prisma/client";


import { useState } from "react";
import { usePathname } from 'next/navigation';

export function ProjectHeader({ project }: { project: Project | null }) {
  const [currentProject, ] = useState<Project | null>(project);

  const pathname = usePathname();

  function isCurrentRouter(href: string): boolean {
    return pathname ? pathname.includes(href) : false;
  }

  return (
    <>
      <Link className="flex items-center" href="/dashboard/projects">
        <ArrowSmallLeftIcon className="text-white p-2 w-20" />
        <Suspense fallback={<p>Loading project...</p>}>
          <div>
            <p
              className={clsx(
                "font-semibold text-3xl text-white hover:underline decoration-yellow-400 decoration-4",
                isCurrentRouter("/dashboard/projects") && "underline"
              )}
            >
              {currentProject && currentProject.name}
            </p>
            <p className="flex-none text-xs text-white">
              {currentProject && currentProject.domain}
            </p>
          </div>
        </Suspense>
      </Link>
    </>
  )
}

export function NavigationUser() {
  const navigation_user = [
    { name: "Account", href: `/dashboard/pages` },
  ];
  return (
    <>
      {navigation_user.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="text-lg font-medium text-white hover:text-emerald-50"
        >
          {link.name}
        </Link>
      ))}
    </>
  )
}

export function NavigationProject() {

  const pathname = usePathname();

  function isCurrentRouter(href: string): boolean {
    return pathname ? pathname.includes(href) : false;
  }

  const navigationProject = [
    { name: "Pages", href: `/dashboard/pages` },
    { name: "Users", href: `/dashboard/users` },
    { name: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <>
      {navigationProject.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={clsx(
            "items-center font-medium text-white hover:text-emerald-50 text-xl px-4 hover:underline decoration-yellow-400 decoration-4",
            isCurrentRouter(link.href) && "underline font-bold"
          )}
        >
          {link.name}
        </Link>
      ))}
    </>
  )
}