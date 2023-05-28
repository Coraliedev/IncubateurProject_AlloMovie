import { useState } from "react"
import MovieModel from "../models/movie.model"
import { API_KEY, DISCOVER_API, SEARCH_API } from "../utils/api"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import MovieCard from "../components/MovieCard"
import Pagination from "../components/Pagination"

const Home: React.FC = () => {
  const [searchKey, setSearchKey] = useState<string | undefined>()
  const [page, setPage] = useState<number>(1)
  const [movies, setMovies] = useState<MovieModel[]>([] as MovieModel[])


  // fetch movies from api with searchKey and page 
  const fetchMovies = async () => {
    {
      const { data } = await axios.get(`${searchKey ? SEARCH_API : DISCOVER_API}`, {
        params: {
          api_key: API_KEY,
          query: searchKey,
          page: page
        }
      })
      return data.results
    }
  }

  // fetch and cache movies with react-query
  useQuery<MovieModel[]>({
    queryKey: ['movie-list', page],
    queryFn: fetchMovies,
    refetchOnWindowFocus: false,
    onSuccess: (res) => {
      setMovies(res)
    },
  })


  return (
    <>
        <div className="dark:bg-gray-900 py-12 mx-auto md:px-12 px-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-16 gap-y-16">
          {movies.map((movie: MovieModel) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      <Pagination page={page} setPage={setPage} />
    </>
  )
}

export default Home