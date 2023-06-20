'use client';

import "src/styles/globals.css";
import { removeCookies } from "cookies-next";
import { signOut } from "next-auth/react"

export default function LogoutButton() {

  return (
    <button
      onClick={() => {
        signOut({
          callbackUrl: process.env.NEXT_PUBLIC_FRONTEND_URL,
        });
        removeCookies("projectId");
      }}
      className="inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium text-emerald-600 hover:bg-emerald-50"
      >
      Sign out
    </button>
  );
}