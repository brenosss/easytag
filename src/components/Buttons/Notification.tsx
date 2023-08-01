import { Fragment, useState, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'

interface NotificationProps {
  modalTheme?: string;
  notificationTheme?: string;
  onClose: () => void;
  title: string;
  description?: string;
}

export default function Notification(props: NotificationProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true);
  }, []);

  const Icon = {
    Success: (
      <div className="relative inline-block">
        <CheckCircleIcon
          className="h-6 w-6 text-green-400 rounded-full"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-75" />
      </div>
    ),
    SomethingWrong: (
      <div className="relative inline-block">
        <XCircleIcon className="h-6 w-6 text-red-500 rounded-full" aria-hidden="true" />
        <div className="absolute inset-0 bg-red-300 rounded-full animate-ping opacity-75" />
      </div>
    ),
  }

  const modalTheme = props.modalTheme || "Success";

  return (
    <>
      <Transition
        show={show}
        as={Fragment}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          aria-live="assertive"
          className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
        >
          <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {Icon[modalTheme]}
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-base font-medium text-gray-900">{props.title}</p>
                    <p className="mt-1 text-base text-gray-500">{props.description}</p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        setShow(false);
                        setTimeout(() => {
                          props.onClose();
                        }, 100);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </>
  )
}
