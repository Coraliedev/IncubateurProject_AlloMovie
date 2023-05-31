import MovieModel from "../models/Movie.model"
import MovieCard from "../components/MovieCard"
import Pagination from "../components/Pagination"
import Header from "../components/Header"
import { useMovies } from "../services/movies.service"
import { useMemo } from "react"

const Home: React.FC = () => {
  const { isLoading, data } = useMovies();

  /* The `useMemo` hook ensures that this mapping operation is
  only performed when the `data` value changes, preventing unnecessary re-renders */
  const movieCards = useMemo(() => {
    if (data) {
      return data.map((movie: MovieModel) => (
        <MovieCard movie={movie} key={movie.id} />
      ));
    }
    return [];
  }, [data]);

  return (
    <>
      <Header />
      {isLoading ? (
        <p className="dark:bg-gray-900 h-[80%] text-gray-400 font-bold text-gray-100 font-bold flex justify-center items-center text-3xl md:text-4xl lg:text-6xl">Loading...</p>
      ) : data && data.length < 1 ? (
        <h1 className="dark:bg-gray-900 h-[80%] text-gray-400 font-bold flex justify-center items-center text-3xl md:text-4xl lg:text-6xl">No movies found</h1>
      ) : (
        <div className="max-w-screen dark:bg-gray-900 py-12 mx-auto md:px-12 px-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-16 gap-y-16">
          {movieCards}
        </div>
      )}
      <Pagination />
    </>
  );
};

export default Home;