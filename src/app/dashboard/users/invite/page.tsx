import Head from "next/head";
import { getProject } from "src/app/projects";
import InviteUserForm from "src/app/dashboard/users/invite/form";


const InviteUser = async () => {

  const project = await getProject();
  return (
    <>
      <Head>
        <title>Invite a new user</title>
      </Head>
      <InviteUserForm project={project} />
    </>
  );
};


export default InviteUser;
