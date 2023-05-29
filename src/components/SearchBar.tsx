interface SearchBarProps {
  setSearchKey: React.Dispatch<React.SetStateAction<string | undefined>>
}

const SearchInput: React.FC<SearchBarProps> = ({ setSearchKey }) => {  
  return (
    <div className="max-w-screen flex items-center dark:bg-gray-900 pl-10">
      <img  className="h-10 w-10" src="tmdb-logo.svg" alt="tmdb logo" />
      <input
        type="text"
        className="dark:bg-gray-900 align-middle text-gray-400 font-bold text-l md:text-2xl lg:text-3xl py-2 px-4 outline-none w-40 md:w-80 lg:w-96"
        placeholder="Search..."
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {setSearchKey(e.target.value.toLowerCase())}}
      />
    </div>
  );
};

export default SearchInput;