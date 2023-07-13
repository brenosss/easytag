import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import clsx from "clsx"
import {
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";

interface modalProps {
  onClose: () => void;
  onAccept: () => void;
  modalTheme?: string;
  title: string;
  message: string;
  acceptButtonMessage: string;
  children: React.ReactNode;
}

export default function MyModal(props: modalProps) {
  const [isOpen, setIsOpen] = useState(true);
  const baseStyles = {
    danger: { button: "bg-red-600 hover:bg-red-500", icon: "text-red-600 bg-red-100" },
    alert: { button: "bg-yellow-500 hover:bg-yellow-400", icon: "text-yellow-400 bg-yellow-100" }
  }
  const modalTheme = props.modalTheme || "danger";
  function closeModal() {
    setIsOpen(false)
    setTimeout(() => {
      // waiting until the animation ends
      props.onClose();
    }, 395);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="sm:flex sm:items-start">
                    <div className={clsx('mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10', baseStyles[modalTheme]['icon'])}>
                      <ExclamationTriangleIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        {props.title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {props.children}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className={clsx('inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto', baseStyles[modalTheme]['button'])}
                      onClick={() => {
                        props.onAccept?.();
                        closeModal;
                      }}
                    >
                      {props.acceptButtonMessage}
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
