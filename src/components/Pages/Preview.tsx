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
    <div className="w-[510px] px-[5px] text-[14px]">
      <div className="pb-8">
        <GoogleCard socialCard={socialCard} />
      </div>
      <div className="pb-8">
        <FacebookCard socialCard={socialCard} />
      </div>
      <div className="pb-8">
        <TwitterCard socialCard={socialCard} />
      </div>
      <div className="pb-8">
        <WhatsAppCard socialCard={socialCard} />
      </div>
      <div className="pb-8">
        <LinkedinCard socialCard={socialCard} />
      </div>
    </div>
  );
}
