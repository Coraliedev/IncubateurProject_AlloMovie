import MovieModel from  "../models/Movie.model"
import MovieCard from "../components/MovieCard"
import Pagination from "../components/Pagination"
import Header from "../components/Header"
import { useMovies } from "../services/movies.service"

const Home: React.FC = () => {
  const { isLoading, data } = useMovies()
  return (
    <>
      <Header />
      {isLoading ? <p className="dark:bg-gray-900 h-[80%] text-gray-400 font-bold text-gray-100 font-bold flex justify-center items-center text-3xl md:text-4xl lg:text-6xl">Loading...</p> :
        data && data.length < 1 ?
          <h1 className="dark:bg-gray-900 h-[80%] text-gray-400 font-bold flex justify-center items-center text-3xl md:text-4xl lg:text-6xl">No movies found</h1> :
          <>
            <div className="max-w-screen dark:bg-gray-900 py-12 mx-auto md:px-12 px-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-16 gap-y-16">
              {data?.map((movie: MovieModel) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>

          </>}
      <Pagination />
    </>
  )
}

export default Home