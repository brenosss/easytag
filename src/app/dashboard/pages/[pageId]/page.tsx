'use client';

import { type Page } from "@prisma/client";
import { getCookie } from "cookies-next";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import PageForm from "src/components/Pages/PageForm";
import type { SocialCardProps } from "src/components/Pages/SocialCards/ISocialCard";
import { blobUrlToBase64 } from "src/services/files";


const PageDetail = ({ params }) => {
  const [socialCard, setSocialCard] = useState<SocialCardProps>();
  const [currentImage, setCurrentImage] = useState<string>('');
  const [url, setUrl] = useState<string>('');

  const router = useRouter();
  const { pageId } = params;

  const projectId = getCookie("projectId");

  async function getPage() {
    const pageResponse = await fetch(`/api/projects/${projectId}/pages/${pageId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (pageResponse.status === 200) {
      const pageData: Page = await pageResponse.json();
      setCurrentImage(pageData.image);
      setSocialCard({
        title: pageData.title,
        description: pageData.description,
        image: pageData.image,
        domain: "facebook.com",
      });
      setUrl(pageData.path);
    }
    else {
      router.push('/projects');
    }
  }

  async function editPage(event: React.FormEvent) {
    event.preventDefault();
    if (!socialCard || !url) return;
    const newImage = socialCard.image !== currentImage ? await blobUrlToBase64(socialCard.image) : undefined;
    await fetch(`/api/projects/${projectId}/pages/${pageId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: url,
        title: socialCard.title,
        description: socialCard.description,
        image: socialCard.image,
        newImage: newImage,
      }),
    });
  }

  useEffect(() => {
    (async () => {
      await getPage();
    })();
  }, []);


  return (
    <>
      <Head>
        <title>Page detail</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {socialCard && url &&
        <PageForm
          socialCard={socialCard}
          setSocialCard={setSocialCard}
          url={url}
          setUrl={setUrl}
          submitFunction={editPage}
        />
      }
    </>
  );
};

export default PageDetail;
