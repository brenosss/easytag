import { SocialCardProps } from "./ISocialCard";

export default function TwitterCard({ socialCard }: { socialCard: SocialCardProps }) {

  const isCardLarge = !!socialCard.twitter && socialCard.twitter.card === 'summary_large_image';

  return (
    <>
      <h4 className="my-3 social-title relative">
        <span className="text-[#A3B3CA] pr-4 bg-white relative">Twitter</span>
      </h4>
      {isCardLarge ? (
        <div className="rounded-lg border mt-5">
          <div
            className="h-[252px] rounded-t-lg bg-cover bg-center overflow-hidden bg-[#e1e8ed] border-b-[1px]"
            style={{ backgroundImage: `url(${socialCard.image})` }}
          />
          <div className="py-3 px-3 cursor-pointer">
            <span className="block text-twitter-gray">{socialCard.domain}</span>
            <span className="overflow-hidden inline-block overflow-ellipsis whitespace-nowrap max-w-full">
              {socialCard.title}
            </span>
            {socialCard.description && (
              <span
                className="text-twitter-gray leading-[1.3em] font-light inline-block max-h-[2.6em] overflow-hidden overflow-ellipsis"
                style={{
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  display: '-webkit-box',
                }}
              >
                {socialCard.description}
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="max-h-[129px] h-[129px] max-w-full w-full rounded-lg border flex">
          <div
            className="w-[129px] flex-none h-full rounded-l-lg bg-cover bg-center overflow-hidden bg-[#e1e8ed] border-r"
            style={{ backgroundImage: `url(${socialCard.image})` }}
          />
          <div className="cursor-pointer w-3/4 flex-1 p-3 flex flex-col justify-center">
            <span className="block text-twitter-gray">{socialCard.domain}</span>
            <span className="overflow-hidden inline-block overflow-ellipsis whitespace-nowrap max-w-full">
              {socialCard.title}
            </span>
            {socialCard.description && (
              <span
                className="leading-[1.3em] font-light overflow-hidden text-twitter-gray"
                style={{
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  display: '-webkit-box',
                }}
              >
                {socialCard.description}
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
}