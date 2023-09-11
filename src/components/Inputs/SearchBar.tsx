import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

interface SearchBarProps {
  labelText: string,
  placeholderText?: string,
  setSearchValue: React.Dispatch<React.SetStateAction<string>>,
  onSearch: () => void
}

export default function SearchBar({ labelText, placeholderText, setSearchValue, onSearch }: SearchBarProps) {
  return (
    <div className="flex flex-row w-full">
      <label className="select-none ml-px pt-2 px-4 text-base font-medium leading-6 text-gray-400">
        {labelText}
      </label>
      <div className="relative w-full ">
        <input
          type="text"
          className="rounded-full w-full mb-4 border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6"
          placeholder={placeholderText}
          onChange={(e) => setSearchValue(e.target.value)}
          onSubmit={() => { onSearch() }}
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-2 top-1 flex items-center pl-1 hover:bg-slate-100 rounded-full h-7 w-7"
          onClick={() => { onSearch() }}
        >
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true"></MagnifyingGlassIcon>
        </button>
      </div>
    </div>
  )
}
