import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

interface SearchBarProps {
  setSearchKey: React.Dispatch<React.SetStateAction<string | undefined>>
}

const SearchInput: React.FC<SearchBarProps> = ({ setSearchKey }) => {  
  return (
    <div className="max-w-screen flex items-center dark:bg-gray-900 pl-10">
      <MagnifyingGlassIcon color="rgb(156 163 175)" width="40px"/>
      <input
        type="text"
        className="dark:bg-gray-900 text-gray-400 font-bold text-xl md:text-3xl lg:text-5xl py-2 px-4 outline-none"
        placeholder="Search..."
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {setSearchKey(e.target.value.toLowerCase())}}
      />
    </div>
  );
};

export default SearchInput;