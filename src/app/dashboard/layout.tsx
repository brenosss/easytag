'use client';

import AuthContext from "src/app/dashboard/AuthContext";
import "src/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Header from "src/app/dashboard/header";
import Footer from "src/app/dashboard/footer";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AuthContext >
        <Header />
        <main>
            <div className="-mt-24 bg-white mx-auto w-4/5 rounded-3xl p-8">
              {children}
            </div>
        </main>
        <Footer />
      </AuthContext>
    </SessionProvider>
  );
}