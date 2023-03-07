import { CheckCircleIcon, ChevronRightIcon, MegaphoneIcon } from '@heroicons/react/20/solid';
import type { NextPageWithLayout } from './_app';
import Head from "next/head";

import Layout from '../components/Layout/Index';
import { TextInput } from "../components/Inputs/Text";
import { LabelInput } from "../components/Inputs/Label";
import { PrimaryLink } from "../components/Buttons/Links";

import React, { useEffect, useState } from "react";

interface PageProps {
  path: string;
  id: string;
  description?: string;
}


const PageList = ({ pages }: {pages: PageProps[]} ) => {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {pages.map((page) => (
          <li key={page.id}>
            <a href={`page/${page.id}`} className="block hover:bg-gray-50">
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="flex min-w-0 flex-1 items-center">
                  <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                    <div>
                      <p className="truncate text-sm font-medium text-emerald-500">{page.path}</p>
                      {!!page.description && 
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          <MegaphoneIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                          <span className="truncate">{page.description}</span>
                        </p>
                      }
                      {!page.description && <div className="mr-1.5 h-5 w-5" />}
                    </div>
                    <div className="hidden md:block">
                      <div>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          <CheckCircleIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400" aria-hidden="true" />
                          { "This page is complete"/*application.stage*/ }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Home: NextPageWithLayout = () => {
  const [pages, setPages] = useState<Array<PageProps>>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

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
        <div className="mb-12 px-36 flex flex-col justify-around">
          <div className="flex justify-between mb-6">
            <div className="flex w-50">
              <LabelInput label="Search" className="mb-2" />
              <TextInput
                className="ml-2 w-11/12"
                name="search"
                onChange={(event) => setSearchKeyword(event.target.value) }
                value={searchKeyword}
              />
            </div>
            <PrimaryLink href="/page">New Page</PrimaryLink>
          </div>
        <PageList pages={pages} />
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t"></footer>
    </div>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;
export default Home;
