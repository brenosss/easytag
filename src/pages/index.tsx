import type { NextPage } from "next";
import Layout from '../components/Layout/Index'
import type { NextPageWithLayout } from './_app'
import Link from 'next/link'
import Head from "next/head";

import React, { useEffect, useState } from "react";

interface PageProps {
  path: string;
  id: string;
}

const Home: NextPageWithLayout = () => {
  const [pages, setPages] = useState<Array<PageProps>>([]);

  function getPages() {
    fetch("/api/pages", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      console.log(res);
      setPages(await res.json());
    });
  }

  useEffect(() => {
    getPages();
  }, []);

  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-3 mt-12">
        <div className="mb-12 px-36 flex justify-around">
        <Link href="/page">New Page</Link>
        <ul role="list" className="divide-y divide-gray-200">
        {pages.map((page) => (
          <li key={page.id}>
            <a href={`/pages/${page.id}`} className="block hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-medium text-emerald-500">{page.path}</p>
                  <div className="ml-2 flex flex-shrink-0">
                    <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t"></footer>
    </div>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;
export default Home;
