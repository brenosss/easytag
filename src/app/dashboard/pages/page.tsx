'use client';

import { type Page } from "@prisma/client";
import Head from "next/head";
import { useEffect, useState } from "react";
import { PrimaryLink } from "src/components/Buttons/Links";
import PageList from "src/components/Pages/PageList";
import { getProjectFromCookie } from "src/app/cookies";

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
      <div className="">
          <div className="flex flex-col justify-around">
            <div className="mb-6 flex justify-between">
              <PrimaryLink
                href={"/dashboard/pages/create"}
              >
                New Page
              </PrimaryLink>
            </div>
            {pages.length > 0 && <PageList pages={pages} />}
          </div>
        <footer className="flex h-24 w-full items-center justify-center border-t"></footer>
      </div>
    </>
  );
};

Pages.auth = true;

export default Pages;
