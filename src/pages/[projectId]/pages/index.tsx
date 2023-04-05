import { type Page } from "@prisma/client";
import { getCookie } from "cookies-next";
import { type GetServerSideProps } from "next";
import Head from "next/head";
import { PrimaryLink } from "../../../components/Buttons/Links";
import Layout from "../../../components/Layout/Index";
import PageList from "../../../components/Pages/PageList";
import { type NextPageWithLayout } from "../../_app";

const Pages: NextPageWithLayout = ({ pages }: { pages: Page[] }) => {
  const projectId = getCookie("projectId");
  return (
    <>
      <Head>
        <title>Pages</title>
      </Head>
      <div className="">
        <main className="mt-12 p-3">
          <div className="mb-12 flex flex-col justify-around px-36">
            <div className="mb-6 flex justify-between">
              <PrimaryLink
                href={{
                  pathname: "/[projectId]/pages/create",
                  query: { projectId },
                }}
              >
                New Page
              </PrimaryLink>
            </div>
            <PageList pages={pages} />
          </div>
        </main>

        <footer className="flex h-24 w-full items-center justify-center border-t"></footer>
      </div>
    </>
  );
};

Pages.auth = true;
Pages.getLayout = (page) => <Layout>{page}</Layout>;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pagesResponse = await fetch("http://localhost:3000/api/pages", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...context.req.headers,
    },
  });
  if (pagesResponse.status === 200) {
    const pages = await pagesResponse.json();
    return {
      props: { pages },
    };
  }
  return {
    redirect: { destination: "/", permanent: false },
  };
};

export default Pages;
