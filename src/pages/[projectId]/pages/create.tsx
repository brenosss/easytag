import { getCookie } from "cookies-next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../../../components/Layout/Index";
import PageForm from "../../../components/Pages/PageForm";
import type { SocialCardProps } from "../../../components/Pages/SocialCards/ISocialCard";
import type { NextPageWithLayout } from "../../_app";

const CreatePage: NextPageWithLayout = () => {
  const router = useRouter();
  const [socialCard, setSocialCard] = useState<SocialCardProps>({
    title: "Facebook",
    description:
      "Facebook is a social networking service and website launched in February 2004, operated and privately owned by Facebook, Inc.",
    image: "https://picsum.photos/200/300",
    domain: "facebook.com",
  });
  const [url, setUrl] = useState("https://facebook.com");

  async function createPage(event: React.FormEvent) {
    event.preventDefault();
    await fetch("/api/pages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: url,
        title: socialCard.title,
        description: socialCard.description,
        image: socialCard.image,
        projectId: getCookie("projectId"),
      }),
    });
    await router.push({
      pathname: "/[projectId]/pages",
      query: { projectId: getCookie("projectId") },
    });
  }

  return (
    <>
      <Head>
        <title>New page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageForm
        socialCard={socialCard}
        setSocialCard={setSocialCard}
        url={url}
        setUrl={setUrl}
        submitFunction={createPage}
      />
    </>
  );
};

CreatePage.getLayout = (page) => <Layout>{page}</Layout>;
CreatePage.auth = true;
export default CreatePage;
