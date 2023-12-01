import Head from "next/head";
import { getProject } from "src/app/projects";
import EditPageForm from "src/app/dashboard/pages/[pageId]/editPageForm";

async function PageDetail ({ params }: any) {
  const project = await getProject();
  return (
    <>
      <Head>
        <title>Page detail</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EditPageForm project={project} params={params}/>
    </>
  );
};

export default PageDetail;
