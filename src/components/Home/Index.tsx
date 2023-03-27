import { useEffect, useState } from "react";
import { type NextPageWithLayout } from "../../pages/_app";
import { PrimaryLink } from "../Buttons/Links";
import { LabelInput } from "../Inputs/Label";
import { TextInput } from "../Inputs/Text";
import Layout from "../Layout/Index";
import PageList from "./PageList";

interface PageProps {
  path: string;
  id: string;
  description?: string;
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
    <Layout>
      <div className="">
        <main className="mt-12 p-3">
          <div className="mb-12 flex flex-col justify-around px-36">
            <div className="mb-6 flex justify-between">
              <div className="w-50 flex">
                <LabelInput label="Search" className="mb-2" />
                <TextInput
                  className="ml-2 w-11/12"
                  name="search"
                  onChange={(event) => setSearchKeyword(event.target.value)}
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
    </Layout>
  );
};
export default Home;
