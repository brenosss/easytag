'use client';

import { setCookie } from "cookies-next";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LandingPage() {
  const router = useRouter();

  async function getcurrentProject() {
    const response = await fetch("/api/projects/currentProject", {
      method: "GET",
    });
    if (response.status === 200) {
      const projectData = await response.json();
      setCookie("project", JSON.stringify(projectData));
      router.push("/dashboard/pages")
    }
  }

  useEffect(() => {
    getcurrentProject();
  }, []);

  return (
    <>
      <Head>
        <title>EasyTag</title>
      </Head>
    </>
  );
}
