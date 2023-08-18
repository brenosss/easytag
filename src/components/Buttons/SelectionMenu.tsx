'use client'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx';
import { UsersInProjectsWithUser } from 'src/domain/projects/users/users-in-projects';
import { Role, UsersInProjects } from '@prisma/client';
import { changeUserInProjectRole } from 'src/domain/projects/change-role';

interface MenuItem {
  id: number;
  name: string;
  invalid: boolean;
}

interface SelectionMenuProps {
  userInProject: Role[],
}

export default function SelectionMenuUserRole({ userInProject }: SelectionMenuProps) {

  const [selected, setSelected] = useState(userInProject);
  async function changeRole(user: string, role: string, project: string) {
    return await changeUserInProjectRole(project, user, role)
  }
  const roles = [
    { name: 'OWNER', invalid: false },
    { name: 'ADMIN', invalid: false },
    { name: 'MEMBER', invalid: false }
  ]
  const handleChange = (item: MenuItem) => {
    setSelected(item);
  };

  return (
    <Listbox value={selected} onChange={handleChange}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Role</Listbox.Label>
          <div className="relative mt-2">
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
  )
}
