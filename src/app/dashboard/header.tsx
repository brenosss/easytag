
import "src/styles/globals.css";
import { getCookie } from "cookies-next";
import Link from "next/link";
import LogoutButton from "src/components/Buttons/LogoutButton";


export default function Header() {
  
    const projectId = getCookie("projectId");
  
    const navigation = [
      { name: "Pages", href: `/dashboard/projects/${projectId}/pages`},
      { name: "Projects", href: "/dashboard/projects" },
      { name: "Users", href: `/dashboard/projects/${projectId}/users`},
      { name: "Settings", href: "/dashboard/settings" },
    ];
  
    return (
      <header className="bg-emerald-600">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="flex w-full items-center justify-between border-b border-emerald-500 py-6 lg:border-none">
            <div className="flex items-center">
              <Link
                href={`/projects/${projectId}/pages`}
              >
                <span className="sr-only">Your Company</span>
              </Link>
              <div className="ml-10 hidden space-x-8 lg:block">
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
              <LogoutButton />
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