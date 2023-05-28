import { Dispatch, SetStateAction } from "react";

interface PaginationProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>
}


const Pagination = ({ page, setPage }: PaginationProps) => {

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const nextPage = () => {
    scrollTop()
    setPage(page + 1)
  }

  const previousPage = () => {
    scrollTop()
    if(page == 1) return
    setPage(page - 1)
  }

return (
  <div className="max-w-screen dark:bg-gray-900 text-gray-100 font-bold flex justify-around text-3xl md:text-6xl lg:text-7xl pb-10">
    <button onClick={() => 
      previousPage()
}>
      Previous
    </button>
    <button onClick={() => nextPage()
    }>
      Next
    </button>
  </div >
)
}

export default Pagination