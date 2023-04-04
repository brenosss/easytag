import { SocialCardProps } from "./ISocialCard";

export default function WhatsAppCard({ socialCard } : { socialCard: SocialCardProps } ) {

  return (
    <>
      <h4 className="my-3 social-title relative">
        <span className="text-[#A3B3CA] pr-4 bg-white relative">WhatsApp</span>
      </h4>

      <div className="max-h-[90px] h-[90px] max-w-full w-full rounded-lg border flex">
        {socialCard.image && (
          <div
            className="w-[90px] h-full flex-none rounded-l-lg bg-cover bg-center overflow-hidden bg-[#e1e8ed] border-r"
            style={{ backgroundImage: `url(${socialCard.image})` }}
          />
        )}
        <div className="cursor-pointer h-full flex-1 w-3/4 bg-[#f7f7f7] px-[10px] py-[6px] flex flex-col justify-center">
          <div
            style={{
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              display: '-webkit-box',
            }}
            className="mb-[2px] flex-shrink-0 text-[13.6px] overflow-hidden block overflow-ellipsis whitespace-nowrap max-w-full"
          >
            <span className="opacity-[0.87]">{socialCard.title}</span>
          </div>
          {socialCard.description && (
            <span
              className="font-light opacity-60 text-[12px] overflow-hidden "
              style={{
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                display: '-webkit-box',
              }}
            >
              {socialCard.description}
            </span>
          )}
          <span className="block text-[12px] opacity-30">{socialCard.domain}</span>
        </div>
      </div>
    </>
  );
}