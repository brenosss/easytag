import {
  MegaphoneIcon,
  CheckCircleIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import { type Page } from "@prisma/client";
import Link from "next/link";

const PageList = ({ pages }: { pages: Page[] }) => {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {pages.map((page) => (
          <Link
            key={page.id}
            href={{
              pathname: "/projects/[projectId]/pages/[pageId]",
              query: { projectId: page.projectId, pageId: page.id },
            }}
            className="block hover:bg-gray-50"
          >
            <div className="flex items-center px-4 py-4 sm:px-6">
              <div className="flex min-w-0 flex-1 items-center">
                <div className="flex min-w-0 flex-1 items-center px-4 md:grid md:grid-cols-2 md:gap-4">
                  <div>
                    <p className="truncate text-sm font-medium text-emerald-500">
                      {page.path}
                    </p>
                    {!!page.description && (
                      <p className="mt-2 flex items-center text-sm text-gray-500">
                        <MegaphoneIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="truncate">{page.description}</span>
                      </p>
                    )}
                    {!page.description && <div className="mr-1.5 h-5 w-5" />}
                  </div>
                  <div className="hidden md:block">
                    <div>
                      <p className="mt-2 flex items-center text-sm text-gray-500">
                        <CheckCircleIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                          aria-hidden="true"
                        />
                        {"This page is complete" /*application.stage*/}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <ChevronRightIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default PageList;
