'use client';

import Head from "next/head";
import Landing from "src/components/Landing/Index";

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>EasyTag</title>
      </Head>
      <Landing />
    </>
  );
}