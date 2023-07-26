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
        <div className="flex items-center">
          <div className="bg-gray-500 inline-flex justify-center items-center h-7 w-7 mr-3 align-middle rounded-full">
          </div>
          <div>
            <span className="block text-[14px] text-[#202124] whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full">
              {socialCard.domain}
            </span>
            <span className="flex items-center text-[12px] text-[#4d5156] whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full">
              {'https://' + socialCard.domain + ' > ' + socialCard.path?.replaceAll('/', ' > ')}
              <span className="h-5 w-5 inline-block ml-2">
                <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                </svg>
              </span>
            </span>
          </div>
        </div>
        <span className="block text-[20px] text-[#1a0dab] whitespace-nowrap overflow-ellipsis overflow-hidden max-w-full cursor-pointer hover:underline decoration-1">
          {socialCard.title}
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