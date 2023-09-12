'use client'
import clsx from 'clsx';
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import type { Role, } from '@prisma/client';
import { Modal } from 'src/components/Modals/Modal'
import type { UsersInProjectsWithUser } from "src/domain/projects/users/users-in-projects";


export default function SelectionMenuUserRole({ userInProject }: { userInProject: UsersInProjectsWithUser }) {

  const [selected, setSelected] = useState<Role>(userInProject.role);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const roles = [
    // { name: 'OWNER', invalid: false }, You can not change the owner role
    { name: 'ADMIN', invalid: false },
    { name: 'MEMBER', invalid: false }
  ]

  const onClose = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      // waiting until the animation ends
      setSelected(userInProject.role)
    }, 395);
  }

  const handleChange = (role: Role) => {
    setSelected(role);
    setIsModalOpen(true)
  };
  
  const updateRole = async () => {
    try {
      await fetch(`/api/projects/users/roles`, {
        method: "PATCH",
        body: JSON.stringify({
          userInProjectId: userInProject.id,
          role: selected
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error(error);
    }
    setIsModalOpen(false);
  }

  return (
    <>
    <Listbox value={selected} onChange={handleChange}>
      {({ open }) => (
        <>
          <div className="relative mt-2 w-32">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:text-sm sm:leading-6">
              <span className="block truncate">{selected}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {roles.map((Item) => (
                  <Listbox.Option
                    key={Item.name}
                    className={({ active }) =>
                      clsx(
                        active ? 'bg-emerald-500 text-white' : 'text-gray-900',
                        Item.invalid ? 'bg-gray-200 cursor-not-allowed' : 'cursor-default',
                        'relative select-none py-2 pl-8 pr-4'
                      )
                    }
                    value={Item.name}
                    disabled={Item.invalid}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={clsx(selected ? 'font-semibold' : 'font-normal', 'block truncate capitalize')}>
                          {Item.name}
                        </span>
                        {selected ? (
                          <span
                            className={clsx(
                              active ? 'text-white' : 'text-emerald-500',
                              'absolute inset-y-0 left-0 flex items-center pl-1.5'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
    <Modal isOpen={isModalOpen} onAccept={() => updateRole()} onClose={onClose} title='Are you sure?' acceptButtonMessage='Confirm'>
      Do you want to change  {userInProject.user.name} role from {userInProject.role} to {selected}
    </Modal>
    </>
  )
}