import { XCircleIcon } from '@heroicons/react/20/solid'

export default function DangerAlert(props: any) {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0 mt-1">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-medium text-red-800">{props.title}</h3>
          <div className="mt-2 text-base text-red-700">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}