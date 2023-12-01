import Head from "next/head";
import PageList from "src/app/dashboard/pages/pageList";
import { getProject } from "src/app/projects";


async function Pages() {
  const project = await getProject();

  return (
    <>
      <Head>
        <title>Pages</title>
      </Head>
      <PageList project={project}/>
    </>
  );
};

export default Pages;
