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
  const project = getProjectFromCookie();
  const [socialCard, setSocialCard] = useState<SocialCardProps | undefined>({
    title: "Facebook",
    description:
      "Facebook is a social networking service and website launched in February 2004, operated and privately owned by Facebook, Inc.",
    image: "https://picsum.photos/200/300",
    domain: project.domain,
  });
  const [url, setUrl] = useState("my/path/");

  const [isLoading, setIsLoading] = useState(false);

  async function createPage(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true)
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
        twitterCard: socialCard.twitter ? socialCard.twitter.card  : "summary",
      }),

    });
    await router.push("/dashboard/pages");
    setIsLoading(false)
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
          deleteButton={false}
        />
      }
    </>
  );
};

CreatePage.auth = true;
export default CreatePage;