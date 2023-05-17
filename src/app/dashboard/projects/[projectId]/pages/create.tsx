import { getCookie } from "cookies-next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

import PageForm from "src/components/Pages/PageForm";
import type { SocialCardProps } from "src/components/Pages/SocialCards/ISocialCard";
import { blobUrlToBase64 } from "src/services/files";

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

  const projectId = getCookie("projectId");

  async function createPage(event: React.FormEvent) {
    event.preventDefault();
    if (!socialCard || !url) return;
    await fetch(`/api/projects/${projectId}/pages`, {
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
        projectId: getCookie("projectId"),
      }),
    });
    await router.push({
      pathname: "/projects/[projectId]/pages",
      query: { projectId },
    });
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
        />
      }
    </>
  );
};

CreatePage.auth = true;
export default CreatePage;
