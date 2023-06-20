'use client';

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getProjectFromCookie } from "src/app/cookies";

interface Project {
  id: string;
  name: string;
  description: string;
}

const Settings = () => {
  const router = useRouter();

  const [project, setProject] = useState<Project>();
  const [showKey, setShowKey] = useState(false);
  const [token, setToken] = useState<string>("");
  const [_, setCreatingPaymentLink] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<string>("");
  const session = useSession();

  async function getProject(projectId: string) {
    const projectResponse = await fetch(`/api/projects/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (projectResponse.status === 200) {
      const projectJson = await projectResponse.json();
      setProject(projectJson);
    }
  }

  async function getSubscriptionStatus() {
    const projectResponse = await fetch("/api/settings/payments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (projectResponse.status === 200) {
      const subscriptionJson = await projectResponse.json();
      setSubscriptionStatus(subscriptionJson.status);
    }
  }

  async function createCheckoutSession() {
    setCreatingPaymentLink(true);
    const projectResponse = await fetch("/api/settings/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (projectResponse.status === 200) {
      const subscriptionJson = await projectResponse.json();
      if(subscriptionJson != null && typeof subscriptionJson.url === "string"){
        window.open(subscriptionJson.url, '_blank').focus();
        setCreatingPaymentLink(false);
      }
    }
  }

  async function getAPIToken() {
    const projectResponse = await fetch("/api/settings/tokens", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (projectResponse.status === 200) {
      const projectJson = await projectResponse.json();
      setToken(projectJson.token);
    }
  }

  async function generateNewAPIToken() {
    const projectResponse = await fetch("/api/settings/tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (projectResponse.status === 200) {
      const projectJson = await projectResponse.json();
      setToken(projectJson.token);
    }
  }

  const shouldShowToken = (key: string) : string => {
    return showKey ? key : "*".repeat(key.length);
  };

  async function leftProject() {
    if (!project) return;
    await fetch(`/api/projects/${project.id}/users/${session.data?.user?.id}`, {
      method: "DELETE",
    });
    router.reload();
  }

  useEffect(() => {
    (async () => {
      const project = getProjectFromCookie();
      await getProject(typeof project === Object ? project.id : "");
      await getAPIToken();
      await getSubscriptionStatus();
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <div className="flex h-screen flex-col items-center">
        <div className="flex flex-col items-center justify-center w-3/5">
        <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20 w-full">
          <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">Project</h2>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                This information will be displayed publicly so be careful what you share.
              </p>

              <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                <div className="pt-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Name</dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">{project && project.name}</div>
                  </dd>
                </div>
                <div className="pt-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Description</dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">{project && project.description}</div>
                  </dd>
                </div>
                <div className="pt-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">API Key</dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">{project && shouldShowToken(token)}</div>
                    <button type="button" onClick={() => setShowKey(!showKey)} className="font-semibold text-emerald-600 hover:text-emerald-500">
                      { showKey ? "Hide" : "Show" }
                    </button>
                  </dd>
                </div>
              </dl>
              <div className="flex pt-6">
                <button type="button" className="text-sm font-semibold leading-6 text-red-600 hover:text-red-500" onClick={() => generateNewAPIToken()}>
                  <span aria-hidden="true"></span> Generate a new API Token
                </button>
              </div>
              <div className="flex pt-6">
                <button type="button" className="text-sm font-semibold leading-6 text-red-600 hover:text-red-500">
                  <span aria-hidden="true"></span> Delete project
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">Payments information</h2>
              <p className="mt-1 text-sm leading-6 text-gray-500">Put your payment information and change your plan.</p>

              <ul role="list" className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                <li className="flex justify-between gap-x-6 py-6">
                  <div className="font-medium text-gray-900">Your subscription is { subscriptionStatus }</div>
                  { subscriptionStatus === "incomplete" ? (
                    <button type="button" className="text-emerald-600 hover:text-emerald-500" onClick={ () => createCheckoutSession()}>
                      Complete
                    </button>
                  ) : (
                    <button type="button" className="font-semibold text-red-600 hover:text-red-500">
                      Cancel
                    </button>
                  )}
                </li>
              </ul>
              
            </div>

            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">Language</h2>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                Choose what languages you project will support
              </p>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                Support for extra languages coming soon, <Link href="/roadmap" className="text-emerald-600 hover:text-emerald-500">check our roadmap</Link>.
              </p>
            </div>
          </div>
        </main>

        </div>
      </div>
    </>
  );
};

Settings.auth = true;
export default Settings;
