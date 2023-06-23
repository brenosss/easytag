'use client';

import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState } from "react";

import PageForm from "src/components/Pages/PageForm";
import type { SocialCardProps } from "src/components/Pages/SocialCards/ISocialCard";
import { blobUrlToBase64 } from "src/services/files";
import { getProjectFromCookie } from "src/app/cookies";


const CreatePage = () => {
  const router = useRouter();
  const [socialCard, setSocialCard] = useState<SocialCardProps | undefined>({
    title: "Facebook",
    description:
      "Facebook is a social networking service and website launched in February 2004, operated and privately owned by Facebook, Inc.",
    image: "https://picsum.photos/200/300",
    domain: "facebook.com",
  });
  const [url, setUrl] = useState("https://facebook.com");

  const project = getProjectFromCookie();

  const [isLoading, setIsLoading] = useState("1");

  async function createPage(event: React.FormEvent) {
    event.preventDefault();
    setTimeout(() => {
      setIsLoading("1")
    }, 2000);
    if (!socialCard || !url) return;
    await fetch(`/api/projects/${project.id}/pages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: url,
        title: socialCard.title,
        description: socialCard.description,
        image: socialCard.image,
        newImage: await blobUrlToBase64(socialCard.image),
        projectId: project.id,
      }),

    });
    await router.push("/dashboard/pages");
    setIsLoading("0")
  }

  return (
    <>
      <Head>
        <title>New page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {socialCard &&
        <PageForm
          socialCard={socialCard}
          setSocialCard={setSocialCard}
          url={url}
          setUrl={setUrl}
          submitFunction={createPage}
          isLoading={isLoading}
        />
      }
    </>
  );
};

CreatePage.auth = true;
export default CreatePage;