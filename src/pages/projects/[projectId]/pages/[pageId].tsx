import { type Page } from "@prisma/client";
import { getCookie } from "cookies-next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../../components/Layout/Index";
import PageForm from "../../../../components/Pages/PageForm";
import type { SocialCardProps } from "../../../../components/Pages/SocialCards/ISocialCard";

const PageDetail = () => {
  const [socialCard, setSocialCard] = useState<SocialCardProps>();
  const [url, setUrl] = useState<string>('');

  const router = useRouter();
  const { pageId } = router.query;

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

  function editPage(event: React.FormEvent) {
    event.preventDefault();
    if (!socialCard || !url) return;
    fetch(`/api/projects/${projectId}/pages/${pageId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: url,
        title: socialCard.title,
        description: socialCard.description,
        image: socialCard.image,
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

PageDetail.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
PageDetail.auth = true;

export default PageDetail;
