'use client';

import Head from "next/head";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { useState, useContext, type FormEvent } from "react";
import { TextInput } from "src/components/Inputs/Text"
import projectContext from "src/contexts/projectContext";

type ProjectData = {
  domain: string;
  name: string;
}

const CreateProject = () => {
  const [errors, setErrors] = useState<ProjectData>({ domain: "", name: "" });
  const [data, setData] = useState<ProjectData>({ domain: "", name: "" });
  const { currentProject, setCurrentProject } = useContext(projectContext);

  const router = useRouter();

  const regexDomain = /^([a-zA-Z0-9\-{1,63}]+(\.[a-zA-Z]{2,})+)$/;

  const handleChange = (e: FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    console.log(name, value)
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errors = { domain: "", name: "" };
    if (data.name === "") {
      errors.name = "Name is required"
    }
    if (data.domain === "") {
      errors.domain = "Domain is required"
    }
    else if (!regexDomain.test(data.domain)) {
      errors.domain = "Invalid domain!"
    }
    if (errors.name !== "" || errors.domain !== "") {
      setErrors(errors);
      return;
    }
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 201) {
      const project = await response.json();
      setCookie("project", JSON.stringify(project));
      setCurrentProject(project);
      await router.replace(`/dashboard/pages`);
    }
  };

  return (
    <>
      <Head>
        <title>Setup your site</title>
      </Head>
      <form className="mx-auto max-w-lg p-5" onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="flex justify-between text-lg font-semibold leading-7 text-gray-900">
              Setup your site
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="name"
                  className="block text-base font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-400 sm:max-w-md">
                    <input
                      type="text"
                      value={data.name}
                      onChange={(e) => handleChange(e)}
                      name="name"
                      autoComplete="name"
                      className="block flex-1 rounded-md border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-base sm:leading-6"
                      placeholder="My Project"
                    />
                  </div>
                  <p className="text-red-500 text-xs italic pt-2">{errors.name && errors.name}</p>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="domain"
                  className="block text-base font-medium leading-6 text-gray-900"
                >
                  Domain
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-400 sm:max-w-md">
                    <TextInput
                      displayText="https://"
                      value={data.domain}
                      onChange={(e) => handleChange(e)}
                      className="ml-2 w-full sm:text-base sm:leading-6"
                      name="domain"
                      autoComplete="domain"
                      placeholder="myproject.com"
                    />
                  </div>
                  <p className="text-red-500 text-xs italic pt-2">{errors.domain && errors.domain}</p>
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
            Save
          </button>
        </div>
      </form>
    </>
  );
};

CreateProject.auth = true;
export default CreateProject;
