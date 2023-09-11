'use client';

import { type Page } from "@prisma/client";
import Head from "next/head";
import { useEffect, useState } from "react";
import { PrimaryLink } from "src/components/Buttons/Links";
import PageList from "src/components/Pages/PageList";
import { getProjectFromCookie } from "src/app/cookies";
import Pagination from "src/components/Buttons/Pagination";
import SearchBar from "src/components/Inputs/SearchBar";

const Pages = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const project = getProjectFromCookie();
  const [totalItems, setTotalItems] = useState();
  const [actualPage, setActualPage] = useState(1)
  const [totalOnThisPage, setTotalOnThisPage] = useState();
  const [searchValue, setSearchValue] = useState<string>('')

  async function getPages() {
    const pagesResponse = await fetch(`/api/projects/${project.id}/pages?skip=${15 * (actualPage - 1)}&path=${searchValue}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (pagesResponse.status === 200) {
      const pages = await pagesResponse.json();
      setPages(pages.pages);
      setTotalOnThisPage(pages.pages.length)
      setTotalItems(pages.totalPages)
    }
  }

  useEffect(() => {
    (async () => {
      await getPages();
    })();
  }, [actualPage])

  return (
    <>
      <Head>
        <title>Pages</title>
      </Head>
      <div>
        <div className="flex flex-col justify-around">
          <SearchBar
            labelText="Path"
            placeholderText="/my/path"
            setSearchValue={setSearchValue}
            onSearch={() => { getPages() }}
          />
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
      <Pagination
        totalItemsNumber={totalItems}
        setActualPage={setActualPage}
        actualPage={actualPage}
        totalOnThisPage={totalOnThisPage}
      ></Pagination>
    </>
  );
};

Pages.auth = true;

export default Pages;
