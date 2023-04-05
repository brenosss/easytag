import { getCookie, removeCookies } from "cookies-next";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Invitations from "../Projects/Invitations";

const navigation = [
  { name: "Settings", href: "#" },
  { name: "Projects", href: "/projects" },
];

export default function Header() {
  const session = useSession();

  const projectId = getCookie("projectId");

  return (
    <header className="bg-emerald-600">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-emerald-500 py-6 lg:border-none">
          <div className="flex items-center">
            <Link
              href={{
                pathname: "/[projectId]/pages",
                query: { projectId },
              }}
            >
              <span className="sr-only">Your Company</span>
              <img
                className="h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=white"
                alt=""
              />
            </Link>
            <div className="ml-10 hidden space-x-8 lg:block">
              <Link
                className="text-base font-medium text-white hover:text-emerald-50"
                href={{
                  pathname: "/[projectId]/pages",
                  query: { projectId },
                }}
              >
                Pages
              </Link>
              {navigation.map((link) => (
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
            {session.status === "authenticated" ? (
              <button
                onClick={() => {
                  signOut({
                    callbackUrl: "http://localhost:3000",
                  });
                  removeCookies("projectId");
                }}
                className="inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium text-emerald-600 hover:bg-emerald-50"
              >
                Sign out
              </button>
            ) : (
              <Link
                href="/api/auth/api/auth/signin"
                className="inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium text-emerald-600 hover:bg-emerald-50"
              >
                Sign in
              </Link>
            )}
            <Link
              href={{ pathname: "/[projectId]/users", query: { projectId } }}
              className="inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium text-emerald-600 hover:bg-emerald-50"
            >
              Users on project
            </Link>
            <Invitations />
          </div>
        </div>
        <div className="flex flex-wrap justify-center space-x-6 py-4 lg:hidden">
          {navigation.map((link) => (
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
    </header>
  );
}
