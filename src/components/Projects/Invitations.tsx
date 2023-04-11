import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { type Project } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";

const Invitations = () => {
  const [invitations, setInvitations] = useState<Project[]>([]);

  const session = useSession();

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/projects/invitations", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setInvitations(data);
    })();
  }, []);

  async function acceptInvite(invitation: Project) {
    await fetch(
      `/api/projects/${invitation.id}/users/${session?.data?.user?.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setInvitations(invitations.filter((i) => i.id !== invitation.id));
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex  items-center rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium text-emerald-600 hover:bg-emerald-50">
          Pending invites
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-emerald-600"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {invitations.length > 0 &&
              invitations.map((invitation) => (
                <Menu.Item key={invitation.id} as="div">
                  <div className="flex justify-between p-4 text-xs">
                    <span>{invitation.name} </span>

                    <button
                      onClick={() => acceptInvite(invitation)}
                      className="text-emerald-600 underline"
                    >
                      Accept invite
                    </button>
                  </div>
                </Menu.Item>
              ))}
            {invitations.length === 0 && (
              <span className="p-4 text-center text-xs">
                No invitations found.
              </span>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Invitations;
