import NavBar from "./NavBar"
import SearchBar from "./SearchBar"

interface HeaderProps {
  setSearchKey: React.Dispatch<React.SetStateAction<string | undefined>>
}

const Header: React.FC<HeaderProps> = ({ setSearchKey })=> {

  return (
    <header>
      <NavBar />
      <SearchBar setSearchKey={setSearchKey} />
    </header>
  )
}

export default Header