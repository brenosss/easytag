import { type Dispatch, type SetStateAction, useState, useEffect } from "react"

interface paginationProps {
  totalItemsNumber: number,
  setActualPage: Dispatch<SetStateAction<number>>,
  actualPage: number,
  totalOnThisPage: number
}

export default function Pagination({ totalItemsNumber, setActualPage, actualPage, totalOnThisPage }: paginationProps) {
  const ITEMS_PER_PAGE = 15
  const [firstOfPage, setFirstOfPage] = useState(0)
  const [lastOfPage, setLastOfPage] = useState(actualPage * ITEMS_PER_PAGE >= totalItemsNumber ? totalOnThisPage : totalItemsNumber - (totalItemsNumber % (actualPage * ITEMS_PER_PAGE)))
  const hasNextPage = totalItemsNumber > (actualPage * ITEMS_PER_PAGE)

  function handleNextPage() {
    if (hasNextPage) {
      scrollToTop()
      setActualPage(actualPage + 1);
      setFirstOfPage((actualPage * ITEMS_PER_PAGE) + 1)
      setLastOfPage(((actualPage + 1) * ITEMS_PER_PAGE) < totalItemsNumber ? totalItemsNumber - (totalItemsNumber % (actualPage * ITEMS_PER_PAGE)) : totalItemsNumber);
    }
  }
  function handlePreviousPage() {
    if (actualPage > 1) {
      setActualPage(actualPage - 1);
      setFirstOfPage(((actualPage - 1) * ITEMS_PER_PAGE) - 14)
      setLastOfPage((actualPage - 1) * ITEMS_PER_PAGE);
    }
  }
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  useEffect(() => {
    setLastOfPage(totalOnThisPage)
    totalOnThisPage >= 1 ? setFirstOfPage(1) : setFirstOfPage(0)
  }, [totalItemsNumber])
  return (
    <nav
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{firstOfPage}</span> to <span className="font-medium">{lastOfPage}</span> of {' '}
          <span className="font-medium">{totalItemsNumber}</span> pages
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <button
          className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
          onClick={handlePreviousPage}
        >
          Previous
        </button>
        <button
          className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </nav>
  )
}
