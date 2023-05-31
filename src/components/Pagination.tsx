import { useMovies } from "../services/movies.service"

const Pagination: React.FC = () => {

  const { nextPage, previousPage } = useMovies()

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePreviousPage = () => {
    previousPage()
    scrollTop()
  }

  const handleNextPage = () => {
    nextPage()
    scrollTop()
  }

  return (
    <div className="max-w-screen dark:bg-gray-900 text-gray-400 font-bold flex justify-around text-3xl md:text-6xl lg:text-7xl pb-10">
      <button onClick={() =>
        handlePreviousPage()
      }>
        Previous
      </button>
      <button onClick={() => handleNextPage()
      }>
        Next
      </button>
    </div >
  )
}

export default Pagination