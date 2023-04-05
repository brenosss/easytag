import Head from "next/head";
import { type NextPageWithLayout } from "./_app";

import Landing from "../components/Landing/Index";
import { type GetServerSideProps } from "next";
import { getServerAuthSession } from "../server/common/get-server-auth-session";

const LandingPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>EasyTag</title>
      </Head>
      <Landing />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const session = await getServerAuthSession({ req, res });

  if (session) {
    return { redirect: { destination: "/projects" } };
  }

  return {
    props: {},
  };
};

export default LandingPage;
