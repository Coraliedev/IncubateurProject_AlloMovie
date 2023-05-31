import { useMovies } from "../services/movies.service";

const SearchInput: React.FC = () => {

  const { updateSearchKey } = useMovies()

  return (
    <div className="max-w-screen flex items-center dark:bg-gray-900 pl-10">
      <img className="h-10 w-10" src="tmdb-logo.svg" alt="tmdb logo" />
      <input
        type="text"
        className="dark:bg-gray-900 align-middle text-gray-400 font-bold text-l md:text-2xl lg:text-3xl py-2 px-4 outline-none w-40 md:w-80 lg:w-96"
        placeholder="Search..."
        id="search"
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => { updateSearchKey(e.target.value.toLowerCase()) }}
      />
    </div>
  );
};

export default SearchInput;