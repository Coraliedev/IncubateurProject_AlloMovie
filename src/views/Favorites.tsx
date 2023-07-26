import { useMemo } from "react";
import Header from "../components/Header"
import { useFavorite } from "../services/favorite.service";
import { Movie } from "../models/UserData";
import MovieCard from "../components/MovieCard";
import { auth } from "../firebase";
import { useFirebaseAuth } from "../services/firebase.service";

const Favorites: React.FC = () => {
  const { userData } = useFavorite();
  const userIsConnected = auth.currentUser?.email;
  const { setAuthVisibility } = useFirebaseAuth()

  const movieCards = useMemo(() => {
    if (userData) {
      return userData.savedShows.map((movie: Movie) => (
        <MovieCard movie={movie} key={movie.id} />
      ));
    }
    return [];
  }, [userData]);

  const connexionRequired = () => {
    return (
      <div className="dark:bg-gray-900 h-[80%] text-gray-400 font-bold flex flex-col justify-center text-center items-center text-3xl md:text-4xl lg:text-6xl">
        <p>You must be connected to see your favorites</p>
        <button onClick={() => setAuthVisibility("visible")} className="ml-4 text-blue-500 hover:text-blue-700">Connect</button>
      </div>
    )
  }

  return (
    <>
      <Header page="favorites" />
      {userIsConnected ? (<div className="max-w-screen dark:bg-gray-900 py-12 mx-auto md:px-12 px-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-16 gap-y-16">
        {movieCards}
      </div>) :
        connexionRequired()
      }

    </>
  )
}

export default Favorites