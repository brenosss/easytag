import { CheckCircleIcon } from '@heroicons/react/20/solid'

export default function SuccessAlert(props: any) {
  return (
    <div className="rounded-md bg-green-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0 mt-1">
          <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-medium text-green-800">{props.title}</h3>
          <div className="mt-2 text-base text-green-700">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}