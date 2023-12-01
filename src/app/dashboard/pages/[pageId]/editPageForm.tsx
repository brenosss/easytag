'use client';

import { type Page } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import PageForm from "src/components/Pages/PageForm";
import type { SocialCardProps, TwitterCardProps } from "src/components/Pages/SocialCards/ISocialCard";
import { blobUrlToBase64 } from "src/services/files";
import type { Project } from "@prisma/client";


export default function EditPageForm({ project, params }: {project: Project, params: any}) {
  const [socialCard, setSocialCard] = useState<SocialCardProps>();
  const [currentImage, setCurrentImage] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { pageId } = params;

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
        domain: project.domain,
        path: pageData.path,
        twitter: {
          card: pageData.twitterCard as TwitterCardProps['card'],
        }
      });
      setUrl(pageData.path);
    }
    else {
      router.push('/projects');
    }
  }
  
  async function deletePage() {
    try {
      await fetch(`/api/pages/${project.id}/${pageId}`, {
        method: "DELETE"
      });
      router.push('/dashboard/pages')
    } catch (error) {
      console.error(error);
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
        twitterCard: socialCard.twitter ? socialCard.twitter.card  : "summary",
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
      {socialCard &&
        <PageForm
          socialCard={socialCard}
          setSocialCard={setSocialCard}
          url={url}
          setUrl={setUrl}
          submitFunction={editPage}
          isLoading={isLoading}
          deleteButton={true}
          deleteFunction={deletePage}
        />
      }
    </>
  );
};
