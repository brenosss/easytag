import { signOut } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, type FormEvent } from "react";

const CreateProject = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
      }),
    });
    if (response.status === 201) {
      await router.push("/projects");
    }
  };

  return (
    <>
      <Head>
        <title>Create a new project</title>
      </Head>
      <form className="mx-auto max-w-lg p-5" onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="flex justify-between text-base font-semibold leading-7 text-gray-900">
              New project
              <button
                type="button"
                onClick={() =>
                  signOut({ callbackUrl: process.env.NEXT_PUBLIC_FRONTEND_URL })
                }
                className="rounded bg-emerald-600 py-1.5 px-2 text-sm font-bold text-white"
              >
                Sign out
              </button>
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="projectName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-600 sm:max-w-md">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      name="projectName"
                      id="projectName"
                      autoComplete="projectName"
                      className="block flex-1 rounded-md border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="My Project"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    placeholder="Write a few sentences about your project."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    name="about"
                    className="block w-full resize-none rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:py-1.5 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link
            className="text-sm font-semibold leading-6 text-gray-900"
            href="/projects"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="rounded-md bg-emerald-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

CreateProject.auth = true;
export default CreateProject;
