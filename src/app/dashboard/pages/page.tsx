'use client';

import { type Page } from "@prisma/client";
import Head from "next/head";
import { useEffect, useState } from "react";
import { PrimaryLink } from "src/components/Buttons/Links";
import PageList from "src/components/Pages/PageList";
import { getProjectFromCookie } from "src/app/cookies";


function EmptyState() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-3 py-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          You don't have any pages yet.
        </h2>
        <h4>
          Start by creating one then check the documentation to see how to integrate it.
        </h4>
        <div className="mt-10 flex items-center gap-x-6">
          <PrimaryLink
              href={"/dashboard/pages/create"}
            >
              Create your first page
          </PrimaryLink>
        </div>
      </div>
    </div>
  )
}

const Pages = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const project = getProjectFromCookie();

  async function getPages() {
    const pagesResponse = await fetch(`/api/projects/${project.id}/pages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (pagesResponse.status === 200) {
      const pages = await pagesResponse.json();
      setPages(pages);
    }
  }

  useEffect(() => {
    (async () => {
      await getPages();
    })();
  }, [])

  return (
    <>
      <Head>
        <title>Pages</title>
      </Head>
      <div className="mx-auto max-w-2xl space-y-16 lg:mx-0 lg:max-w-none">
        {pages.length > 0 ?
        <div>
          <h2 className="text-lg font-semibold leading-7 text-gray-900">Pages</h2>
          <p className="mt-1 text-base leading-6 text-gray-500 mb-6">
            List of all your current pages
          </p>
          <div className="space-y-6 divide-y divide-gray-100 border-t mb-12"></div>
          <div className="flex flex-col justify-around">
            <div className="mb-6 flex justify-between">
              <PrimaryLink
                href={"/dashboard/pages/create"}
              >
                New Page
              </PrimaryLink>
            </div>
             <PageList pages={pages} />
          </div>
        </div>
        : <EmptyState />}
      </div>
    </>
  );
};

Pages.auth = true;

export default Pages;
