import Head from "next/head";
import { Tab } from "@headlessui/react";
import Layout from "../../components/Layout/Index";
import type { NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";

import FacebookCard from "../../components/SocialCards/FacebookCard";
import GoogleCard from "../../components/SocialCards/GoogleCard";
import TwitterCard from "../../components/SocialCards/TwitterCard";
import WhatsAppCard from "../../components/SocialCards/WhatsAppCard";
import LinkedinCard from "../../components/SocialCards/LinkedinCard";
import type { SocialCardProps } from "../../components/SocialCards/ISocialCard";

import { TextAreaInput, TextInput } from "../../components/Inputs/Text";
import { LabelInput } from "../../components/Inputs/Label";
import { ImageInput } from "../../components/Inputs/Image";
import React, { useState } from "react";

import clsx from "clsx";

function Preview({ socialCard }: { socialCard: SocialCardProps }) {
  return (
    <div>
      <Tab.Group>
        <Tab.List className="rounded-x flex space-x-1 p-1">
          {["Cards", "Tags"].map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                clsx(
                  "w-full rounded-lg py-2.5 text-sm font-medium ring-offset-0 focus:outline-none",
                  selected
                    ? "bg-white text-emerald-500 shadow"
                    : "text-gray-500 hover:bg-white/[0.12] hover:text-emerald-500"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="w-[510px] px-[5px] text-[14px]">
          <Tab.Panel>
            <GoogleCard socialCard={socialCard} />
            <FacebookCard socialCard={socialCard} />
            <TwitterCard socialCard={socialCard} />
            <WhatsAppCard socialCard={socialCard} />
            <LinkedinCard socialCard={socialCard} />
          </Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

const PageDetail: NextPageWithLayout = () => {
  const router = useRouter();
  const [socialCard, setSocialCard] = useState<SocialCardProps>({
    title: "Facebook",
    description:
      "Facebook is a social networking service and website launched in February 2004, operated and privately owned by Facebook, Inc.",
    image: "https://picsum.photos/200/300",
    domain: "facebook.com",
  });
  const [url, setUrl] = useState<string>();

  function createPage(url: string) {
    fetch("/api/pages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: url,
        title: socialCard.title,
        description: socialCard.description,
        image: socialCard.image,
      }),
    }).finally(() => {
      router.push("/");
    });
  }

  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mt-12 p-3">
        <div className="mb-12 flex justify-around px-36">
          <LabelInput label="URL" className="mb-2" />
          <TextInput
            className="ml-2 w-11/12"
            name="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
          <button
            className="ml-12 w-20 rounded-lg bg-emerald-500 py-2.5 text-sm font-medium text-white shadow ring-offset-0 hover:bg-emerald-700 focus:outline-none"
            onClick={() => {
              createPage(url);
            }}
          >
            Save
          </button>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-2xl px-8">
            <div className="mb-4">
              <LabelInput label="Title" className="mb-2" />
              <TextInput
                className="ml-2 w-11/12"
                name="title"
                onChange={(event) =>
                  setSocialCard({ ...socialCard, title: event.target.value })
                }
                value={socialCard.title}
              />
            </div>
            <div className="mb-4">
              <LabelInput label="Description" className="mb-2" />
              <TextAreaInput
                name="description"
                className="ml-2 w-11/12"
                onChange={(event) =>
                  setSocialCard({
                    ...socialCard,
                    description: event.target.value,
                  })
                }
                value={socialCard.description}
              />
            </div>
            <div className="mb-4">
              <LabelInput label="Image" className="mb-2" />
              <ImageInput
                image={socialCard.image}
                className="ml-2 w-11/12"
                onChange={(e) => {
                  if (e.target.files !== null && e.target.files.length > 0) {
                    const file = e.target.files[0];
                    setSocialCard({
                      ...socialCard,
                      image: URL.createObjectURL(file),
                    });
                  }
                }}
              />
            </div>
          </div>
          <Preview socialCard={socialCard} />
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t"></footer>
    </div>
  );
};

PageDetail.getLayout = (page) => <Layout>{page}</Layout>;
PageDetail.auth = true;
export default PageDetail;
