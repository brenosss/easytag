import Head from "next/head";
import Link from "next/link";
import { cookies } from 'next/headers'
import { PaymentsSummary } from "src/app/dashboard/settings/payments";
import { TokenSection } from "src/app/dashboard/settings/token";
import { getJWTSession } from "src/domain/JWT";
import { env } from "src/env/server.mjs";

async function getProject() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(env.NEXTAUTH_COOKIE)
  if (!sessionCookie) throw new Error('No session cookie found')
  const session = sessionCookie.value
  const jwtData = await getJWTSession(session)
  if (!jwtData.selectedProject) throw new Error('No session cookie found')
  return jwtData.selectedProject;
}

async function Settings() {

  const project = await getProject();

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <div className="mx-auto max-w-2xl space-y-16 lg:mx-0 lg:max-w-none">
        <div>
          <h2 className="text-lg font-semibold leading-7 text-gray-900">Project</h2>
          <p className="mt-1 text-base leading-6 text-gray-500">
            This information will be displayed publicly so be careful what you share.
          </p>

          <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-base leading-6">
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Name</dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">{project && project.name}</div>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Domain</dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">{project && project.domain}</div>
              </dd>
            </div>
            { project && <TokenSection project={project} /> }
          </dl>

          <div className="flex pt-6">
            <button type="button" className="text-base font-semibold leading-6 text-red-600 hover:text-red-500">
              <span aria-hidden="true"></span> Delete project
            </button>
          </div>
        </div>
        <PaymentsSummary />
        <div>
          <h2 className="text-lg font-semibold leading-7 text-gray-900">Language</h2>
          <p className="mt-1 text-base leading-6 text-gray-500">
            Choose what languages you project will support
          </p>
          <p className="mt-1 text-base leading-6 text-gray-500">
            Support for extra languages coming soon, <Link href="/roadmap" className="text-emerald-600 hover:text-emerald-500">check our roadmap</Link>.
          </p>
        </div>
      </div>
    </>
  );
}

Settings.auth = true;
export default Settings;
