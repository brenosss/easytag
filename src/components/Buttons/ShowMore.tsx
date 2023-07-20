import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

interface showMoreProps {
  title: string;
  description: JSX.Element;
}
export function ShowMore({ ...props }: showMoreProps) {
  return (
    <div className="w-full pt-4">
      <div className="mx-auto w-full max-w-md rounded-2xl ">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="w-full justify-between rounded-lg bg-amber-50 px-4 py-2 text-left text-base font-medium text-amber-300 hover:bg-amber-100">
                <span>{props.title}</span>
                <ChevronUpIcon
                  className={`${open ? 'rotate-180 transform' : ''
                    } h-5 w-5`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-gray-500">
                {props.description}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}