'use client';

import { setCookie } from "cookies-next";
import Head from "next/head";
import { useContext, useEffect } from "react";
import projectContext from "src/contexts/projectContext";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const { currentProject, setCurrentProject } = useContext(projectContext);
  const router = useRouter();

  async function getcurrentProject() {
    const response = await fetch("/api/projects/currentProject", {
      method: "GET",
    });
    if (response.status === 200) {
      const projectData = await response.json();
      setCookie("project", JSON.stringify(projectData));
      setCurrentProject(projectData);
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
