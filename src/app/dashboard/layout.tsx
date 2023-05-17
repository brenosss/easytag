'use client';

import AuthContext from "src/app/dashboard/AuthContext";
import "src/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Header from "src/app/dashboard/header";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AuthContext >
        <Header />
        <main>{children}</main>
      </AuthContext>
    </SessionProvider>
  );
}