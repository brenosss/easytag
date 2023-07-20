'use client';

import AuthContext from "src/app/dashboard/AuthContext";
import "src/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import Header from "src/app/dashboard/header";
import Footer from "src/app/dashboard/footer";
import hero_bg from 'src/images/hero/hero_bg.svg'

import ProjectProvider from "src/contexts/projectProvider";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AuthContext >
        <ProjectProvider>
          <div className="hero-section relative bg-no-repeat bg-top z-0 min-h-screen"  style={{ backgroundImage: `url(${hero_bg.src})`}}>
            <Header />
            <div className="-mt-24 bg-white mx-auto w-5/6 rounded-3xl p-8">
              <div className="flex min-h-screen flex-col items-center">
                <div className="flex flex-col items-center justify-center w-5/6">
                  <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20 w-full">
                   {children}
                  </main>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </ProjectProvider>
      </AuthContext>
    </SessionProvider>
  );
}