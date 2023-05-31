import { Bars3Icon, FilmIcon, HeartIcon, UserIcon, ArrowRightOnRectangleIcon, XMarkIcon } from "@heroicons/react/20/solid"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useFirebaseAuth } from "../services/firebase.service"


const NavBar = () => {

  const [isBurgerOpen, setIsBurgerOpen] = useState(false)

  const { logout, isConnected, setAuthVisibility } = useFirebaseAuth()

  const handleBurgerClick = () => {
    setIsBurgerOpen(!isBurgerOpen)
  }

  return (
    <nav className="flex justify-between bg-gray-900 text-gray-400 max-w-screen">
      <div className="px-5 xl:px-12 py-6 flex w-full items-center navbar-menu">
        <h1 className="text-xl md:text-4xl lg:text-5xl">ALLOMOVIE</h1>
        <ul className="hidden md:flex px-10 mx-auto space-x-12">
          <li><Link to="/"><FilmIcon className="h-12 w-12 hover:text-blue-400" /></Link></li>
          <li><Link to="/favorites"><HeartIcon className="h-12 w-12 hover:text-blue-400" /></Link></li>
        </ul>
        <div className="hidden md:flex items-center space-x-5">
          {isConnected ?
            <ArrowRightOnRectangleIcon onClick={() => logout()} className="h-12 w-12 hover:text-blue-400" /> :
            <UserIcon onClick={() => { setAuthVisibility("") }} className="h-12 w-12 hover:text-blue-400" />
          }
        </div>
      </div>
      <div className="relative flex">   <button onClick={() =>
        handleBurgerClick()
      } className="navbar-burger self-center mr-12 md:hidden">
        {isBurgerOpen ? <XMarkIcon className="h-10 w-10" /> : <Bars3Icon className="h-10 w-10" />}
      </button>
        {isBurgerOpen ? <div className="absolute w-10 flex justify-center top-14 z-10 mt-1">
          <ul>
            <li className="mb-2 "><Link to="/"><FilmIcon className="h-6 w-6 hover:text-blue-400" /></Link></li>
            <li className="mb-2"><Link to="/favorites"><HeartIcon className="h-6 w-6 hover:text-blue-400" /></Link></li>
            <li>
              {isConnected ?
                <ArrowRightOnRectangleIcon onClick={() => logout()} className="h-6 w-6 hover:text-blue-400" /> :
                <UserIcon onClick={() => { setAuthVisibility("") }} className="h-6 w-6 hover:text-blue-400" />}</li>
          </ul>
        </div> : null}
      </div>

    </nav>
  )
}

export default NavBar