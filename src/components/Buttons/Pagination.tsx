import { type Dispatch, type SetStateAction, useState, useEffect } from "react"

interface paginationProps {
  totalItemsNumber: number,
  setActualPage: Dispatch<SetStateAction<number>>,
  actualPage: number,
  totalOnThisPage: number
}

export default function Pagination({ totalItemsNumber, setActualPage, actualPage, totalOnThisPage }: paginationProps) {
  const [firstOfPage, setFirstOfPage] = useState(0)
  const [lastOfPage, setLastOfPage] = useState(actualPage * 15 >= totalItemsNumber ? totalOnThisPage : totalItemsNumber - (totalItemsNumber % (actualPage * 15)))

  function handleNextPage() {
    if (totalItemsNumber > (actualPage * 15)) {
      scrollToTop()
      setActualPage(actualPage + 1);
      setFirstOfPage((actualPage * 15) + 1)
      setLastOfPage(((actualPage + 1) * 15) < totalItemsNumber ? totalItemsNumber - (totalItemsNumber % (actualPage * 15)) : totalItemsNumber);
    }
  }
  function handlePreviousPage() {
    if (actualPage > 1) {
      setActualPage(actualPage - 1);
      setFirstOfPage(((actualPage - 1) * 15) - 14)
      setLastOfPage((actualPage - 1) * 15);
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







/*
total de items
quantos items em cada Pagina
pagina atual

ultimo item da pagina = totaldeitems - (totalDeItems % (paginaatual * 15))



31 - 16

15
*/
