import { Tab } from "@headlessui/react";
import clsx from "clsx";
import FacebookCard from "./SocialCards/FacebookCard";
import GoogleCard from "./SocialCards/GoogleCard";
import { type SocialCardProps } from "./SocialCards/ISocialCard";
import LinkedinCard from "./SocialCards/LinkedinCard";
import TwitterCard from "./SocialCards/TwitterCard";
import WhatsAppCard from "./SocialCards/WhatsAppCard";

export default function Preview({
  socialCard,
}: {
  socialCard: SocialCardProps;
}) {
  return (
    <div>
      <Tab.Group>
        <Tab.List className="rounded-x flex space-x-1 p-1">
          {["Cards", "Tags"].map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                clsx(
                  "w-full rounded-lg py-2.5 text-base font-medium ring-offset-0 focus:outline-none",
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
