import Head from "next/head";
import type { NextPageWithLayout } from "./_app";

import { useSession } from "next-auth/react";
import Landing from "../components/Landing/Index";
import Home from "../components/Home/Index";

const StartPage: NextPageWithLayout = () => {
  const session = useSession();
  return (
    <>
      <Head>
        <title>EasyTag</title>
      </Head>
      {session.status === "authenticated" ? (
        <Home />
      ) : session.status === "loading" ? (
        <>Loading...</>
      ) : (
        <Landing />
      )}
    </>
  );
};

export default StartPage;
