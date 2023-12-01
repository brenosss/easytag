import Head from "next/head";

import CreatePageForm from "src/app/dashboard/pages/create/createPageForm";
import { getProject } from "src/app/projects";


async function CreatePage() {
  const project = await getProject();

  return (
    <>
      <Head>
        <title>New page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CreatePageForm project={project}/>
    </>
  );
};

export default CreatePage;