'use client';

import { type Page } from "@prisma/client";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import PageForm from "src/components/Pages/PageForm";
import type { SocialCardProps } from "src/components/Pages/SocialCards/ISocialCard";
import { blobUrlToBase64 } from "src/services/files";
import { getProjectFromCookie } from "src/app/cookies";


const PageDetail = ({ params }) => {
  const [socialCard, setSocialCard] = useState<SocialCardProps>();
  const [currentImage, setCurrentImage] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { pageId } = params;

  const project = getProjectFromCookie();

  async function getPage() {
    const pageResponse = await fetch(`/api/projects/${project.id}/pages/${pageId}`, {
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
    setIsLoading(true)
    if (!socialCard || !url) return;
    const newImage = socialCard.image !== currentImage ? await blobUrlToBase64(socialCard.image) : undefined;
    await fetch(`/api/projects/${project.id}/pages/${pageId}`, {
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
    setIsLoading(false)
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
          isLoading={isLoading}
        />
      }
    </>
  );
};

export default PageDetail;
