import { SocialCardProps } from "./ISocialCard";

export default function GoogleCard({ socialCard } : { socialCard: SocialCardProps } ) {

  return (
    <>
      <h4 className="my-3 social-title relative">
        <span className="text-[#A3B3CA] pr-4 bg-white relative cursor-pointer whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full">
          Google
        </span>
      </h4>
      <div>
        <span className="block text-[18px] text-[#1a0dab] whitespace-nowrap overflow-ellipsis overflow-hidden max-w-full">
          {socialCard.title}
        </span>
        <span className="block text-[14px] text-[#006621] whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full">
          {socialCard.domain}
        </span>
        <span
          style={{
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            display: '-webkit-box',
          }}
          className="text-[#545454] text-[13px] leading-[1.4] break-words overflow-hidden overflow-ellipsis"
        >
          {socialCard.description}
        </span>
      </div>
    </>
  );
}