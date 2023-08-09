import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

interface showMoreProps {
  title: string;
  description: JSX.Element;
}
export function ShowMore({ ...props }: showMoreProps) {
  return (
    <div className="w-full pt-4">
      <div className="w-full rounded-2xl ">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="w-full justify-between rounded-lg bg-yellow-50 px-4 py-2 text-left text-base font-medium text-yellow-800 flex">
                <span>{props.title}</span>
                <ChevronUpIcon
                  className={`${!open ? 'rotate-180 transform' : ''
                    } h-7 w-7`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-1 pb-2 text-base bg-yellow-50   text-yellow-700">
                {props.description}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}