import { useFavorite } from "../services/favorite.service";
import { useMovies } from "../services/movies.service";

const SearchInput = ({ page }: { page: string }) => {

  const { updateSearchKey } = useMovies()
  const { updateSearchKeyFavorites } = useFavorite()

  const updateSearch = (e: string) => {
    if (page == "movies") {
      updateSearchKey(e)
    }
    else {
      updateSearchKeyFavorites(e)
    }
  }
  return (
    <div className="max-w-screen flex items-center dark:bg-gray-900 pl-10">
      <img className="h-10 w-10" src="tmdb-logo.svg" alt="tmdb logo" />
      <input
        type="text"
        className="dark:bg-gray-900 align-middle text-gray-400 font-bold text-l md:text-2xl lg:text-3xl py-2 px-4 outline-none w-40 md:w-80 lg:w-96"
        placeholder="Search..."
        id="search"
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => { updateSearch(e.target.value.toLowerCase()) }}
      />
    </div>
  );
};

export default SearchInput;