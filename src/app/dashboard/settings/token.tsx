'use client';

import { useEffect, useState } from "react";
import type { Project } from "@prisma/client";

export function TokenSection({ project }: { project: Project }) {
  const [showKey, setShowKey] = useState(false);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    (async () => {
      await getAPIToken();
    })();
  }, []);


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

  const shouldShowToken = (key: string): string => {
    return showKey ? key : "*".repeat(key.length);
  };

  return (
    <>
      <div className="pt-6 sm:flex">
        <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">API Key</dt>
        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
          <div className="text-gray-900">{project && shouldShowToken(token)}</div>
          <button type="button" onClick={() => setShowKey(!showKey)} className="font-semibold text-emerald-600 hover:text-emerald-500">
            {showKey ? "Hide" : "Show"}
          </button>
        </dd>
      </div>
      <div className="flex pt-6">
        <button type="button" className="text-base font-semibold leading-6 text-red-600 hover:text-red-500" onClick={() => generateNewAPIToken()}>
          <span aria-hidden="true"></span> Generate a new API Token
        </button>
      </div>
    </>
  )
}
