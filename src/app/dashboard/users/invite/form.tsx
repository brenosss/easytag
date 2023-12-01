'use client'
import { useState } from "react";
import type { Project } from "@prisma/client";

export default function InviteUserForm({ project }: { project: Project }) {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState({ success: false, message: "" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult({ success: false, message: "" });
    const response = await fetch(`/api/projects/${project.id}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
    if (response.status === 201) {
      setResult({ success: true, message: "User invited successfully!" });
    } else {
      const { error } = await response.json();
      setResult({ success: false, message: error });
    }
  }
  return (
    <form className="mx-auto max-w-lg p-5" onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-lg font-semibold leading-7 text-gray-900">
            Invite user
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="userEmail"
                className="block text-base font-medium leading-6 text-gray-900"
              >
                User e-mail
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-600 sm:max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="userEmail"
                    id="userEmail"
                    autoComplete="userEmail"
                    className="block flex-1 rounded-md border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-base sm:leading-6"
                    placeholder="user@email.com"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-emerald-600 py-2 px-3 text-base font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          Invite
        </button>
      </div>
      {result.message && (
        <span>
          {result.success ? "Success!" : "Error!"} {result.message}
        </span>
      )}
    </form>
  )
}