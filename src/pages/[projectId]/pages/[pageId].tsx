import { type Page } from "@prisma/client";
import { type GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../../../components/Layout/Index";
import PageForm from "../../../components/Pages/PageForm";
import type { SocialCardProps } from "../../../components/Pages/SocialCards/ISocialCard";

const PageDetail = ({ page }: { page: Page }) => {
  const [socialCard, setSocialCard] = useState<SocialCardProps>({
    title: page.title,
    description: page.description,
    image: page.image,
    domain: "facebook.com",
  });
  const [url, setUrl] = useState<string>(page.path);

  const router = useRouter();
  const { pageId } = router.query;

  function editPage(event: React.FormEvent) {
    event.preventDefault();
    fetch(`/api/pages/${pageId}`, {
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

  return (
    <>
      <Head>
        <title>Page detail</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageForm
        socialCard={socialCard}
        setSocialCard={setSocialCard}
        url={url}
        setUrl={setUrl}
        submitFunction={editPage}
      />
    </>
  );
};

PageDetail.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;
PageDetail.auth = true;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pageResponse = await fetch(
    `http://localhost:3000/api/pages/${context?.params?.pageId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...context.req.headers,
      },
    }
  );
  if (pageResponse.status === 200) {
    const page = await pageResponse.json();
    return {
      props: { page },
    };
  }
  return {
    redirect: {
      destination: "/projects",
      permanent: false,
    },
  };
};

export default PageDetail;
