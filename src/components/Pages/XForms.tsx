import { type SocialCardProps } from "./SocialCards/ISocialCard";

type XType = {
  id: 'summary_large_image' | 'summary' | 'app' | 'player';
  title: string;
  disabled: boolean;
}

const XTypes: XType[] = [
  { id: 'summary', title: 'Summary', disabled: false },
  { id: 'summary_large_image', title: 'Large Image', disabled: false },
  { id: 'app', title: 'App Card', disabled: true },
  { id: 'player', title: 'Player Card', disabled: true },
]

export function XTypesSelect({setSocialCard, socialCard}: { setSocialCard: (socialCard: SocialCardProps) => void, socialCard: SocialCardProps }) {
  return (
    <div className="mt-8 pt-4 border-t-2 border-gray-100">
      <label className="text-base font-semibold text-gray-900">Select the X card type</label>
      <p className="text-sm text-gray-500">X have differents types of cards, you can check <a href="https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards" className="text-emerald-500"> here </a></p>
      <fieldset className="mt-4">
        <legend className="sr-only">Notification method</legend>
        <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
          {XTypes.map((XType) => (
            <div key={XType.id} className="flex items-center">
              <input
                id={XType.id}
                name="notification-method"
                type="radio"
                defaultChecked={XType.id === (socialCard.twitter ? socialCard.twitter.card : 'summary')}
                disabled={XType.disabled}
                className="h-4 w-4 border-gray-300 text-emerald-500 focus:ring-emerald-500"
                onChange={() => setSocialCard({ ...socialCard, twitter: { ...socialCard.twitter, card: XType.id } })}
              />
              <label htmlFor={XType.id} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                {XType.title} {XType.disabled && <span className="text-gray-500">(not available yet)</span>}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  )
}
