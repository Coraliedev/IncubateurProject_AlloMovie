import NavBar from "./NavBar"
import SearchBar from "./SearchBar"

const Header = ({page} : {page:string} )=> {

  return (
    <header>
      <NavBar />
      <SearchBar page={page} />
    </header>
  )
}

export default Header