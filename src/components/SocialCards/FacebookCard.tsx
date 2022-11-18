import { SocialCardProps } from "./ISocialCard";

export default function FacebookCard({ socialCard } : { socialCard: SocialCardProps } ) {

  return (
    <>
      <h4 className="my-3 social-title relative">
        <span className="text-[#A3B3CA] pr-4 bg-white relative">Facebook</span>
      </h4>
      <div className="mt-5">
        <div
          className="h-[252px] bg-cover bg-center overflow-hidden border cursor-pointer"
          style={{ backgroundImage: `url(${socialCard.image})` }}
        />
        <div className="cursor-pointer border-[#dadde1] border border-t-0 py-[10px] px-[12px] text-card-dark-gray bg-[#f2f3f5]">
          <span className="block text-card-gray overflow-hidden overflow-ellipsis uppercase text-[12px]">
            {socialCard.domain}
          </span>
          <span className="overflow-hidden text-card-dark-gray font-semibold text-[16px] block overflow-ellipsis whitespace-nowrap max-w-full">
            {socialCard.title}
          </span>
          {socialCard.description && (
            <span className="text-card-gray font-light block overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full">
              {socialCard.description}
            </span>
          )}
        </div>
      </div>
    </>
  );
}