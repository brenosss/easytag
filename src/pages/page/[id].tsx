import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Head from "next/head";
import { Tab } from "@headlessui/react";
import type { NextPageWithLayout } from '../_app'

import FacebookCard from "../../components/SocialCards/FacebookCard";
import GoogleCard from "../../components/SocialCards/GoogleCard";
import TwitterCard from "../../components/SocialCards/TwitterCard";
import WhatsAppCard from "../../components/SocialCards/WhatsAppCard";
import LinkedinCard from "../../components/SocialCards/LinkedinCard";
import type { SocialCardProps } from "../../components/SocialCards/ISocialCard";
import Layout from '../../components/Layout/Index'
import { TextAreaInput, TextInput } from "../../components/Inputs/Text";
import { LabelInput } from "../../components/Inputs/Label";
import { ImageInput } from "../../components/Inputs/Image";

import clsx from "clsx";


function Preview({ socialCard }: { socialCard: SocialCardProps }) {

  return (
    <div>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-x p-1">
        {["Cards", "Tags"].map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                clsx(
                  'w-full rounded-lg py-2.5 text-sm font-medium ring-offset-0 focus:outline-none',
                  selected
                    ? 'bg-white shadow text-emerald-500'
                    : 'text-gray-500 hover:bg-white/[0.12] hover:text-emerald-500'
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
  const [socialCard, setSocialCard] = useState<SocialCardProps>({
    title: "",
    description: "",
    image: "",
    domain: "facebook.com",
  });
  const [url, setUrl] = useState<string>();
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (!id) return;
    fetch(`/api/pages/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json()
    ).then((data) => {
      setSocialCard(data)
    })
  }, [id]);

  function editPage(url: string) {
    fetch(`/api/pages/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path: url, title: socialCard.title, description: socialCard.description, image: socialCard.image }),
    })
  }

  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-3 mt-12">
        <div className="mb-12 px-36 flex justify-around">
          <LabelInput label="URL" className="mb-2" />
          <TextInput
            className="ml-2 w-11/12"
            name="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
          <button 
            className='rounded-lg py-2.5 text-sm font-medium ring-offset-0 focus:outline-none bg-emerald-500 shadow text-white hover:bg-emerald-700 w-20 ml-12'
            onClick={() => {createPage(url)}}
          >
            Save
          </button>
        </div>
        <div className="flex justify-center">

          <div className="px-8 w-full max-w-2xl">
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
export default PageDetail;
