import axios from "axios"
import RequestResultsModel from "../models/RequestResult.model"
import { API_KEY, DISCOVER_API, SEARCH_API } from "../utils/api"
import MovieModel from "../models/Movie.model"
import { useQuery } from "@tanstack/react-query"
import { pageAtom, searchkeyAtom } from "../atoms"
import { useAtom } from "jotai";

export const useMovies = () => {
  const [page, setPage] = useAtom(pageAtom)
  const [searchKey, setSearchKey] = useAtom(searchkeyAtom)

  // fetch movies from api with searchKey and page 
  const fetchMovies = async () => {
    {
      const { data } = await axios.get<RequestResultsModel>(`${searchKey ? SEARCH_API : DISCOVER_API}`, {
        params: {
          api_key: API_KEY,
          query: searchKey,
          page: page
        }
      })
      return data.results as MovieModel[]
    }
  }

  // fetch and cache movies with react-query
  const { isLoading, data } = useQuery<MovieModel[]>({
    queryKey: ['movie-list', page, searchKey],
    queryFn: fetchMovies,
    refetchOnWindowFocus: false
  })

  const nextPage = () => {
    setPage(page + 1)
  }

  const previousPage = () => {
    if (page == 1) return
    setPage(page - 1)
  }

  const updateSearchKey = (key: string) => {
    setSearchKey(key)
    setPage(1)
  }

  return { isLoading, data, nextPage, previousPage, updateSearchKey }
}