import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const navigation = [
  { name: "Pages", href: "/" },
  { name: "Settings", href: "#" },
];

export default function Header() {
  const session = useSession();

  return (
    <header className="bg-emerald-600">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-emerald-500 py-6 lg:border-none">
          <div className="flex items-center">
            <a href="#">
              <span className="sr-only">Your Company</span>
              <img
                className="h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=white"
                alt=""
              />
            </a>
            <div className="ml-10 hidden space-x-8 lg:block">
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
          </div>
          <div className="ml-10 space-x-4">
            {session.status === "authenticated" ? (
              <button
                onClick={() => {
                  signOut({
                    callbackUrl: "http://localhost:3000",
                  });
                }}
                className="inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium text-emerald-600 hover:bg-emerald-50"
              >
                Sign out
              </button>
            ) : (
              <Link
                href="/api/auth/signin"
                className="inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium text-emerald-600 hover:bg-emerald-50"
              >
                Sign in
              </Link>
            )}
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
