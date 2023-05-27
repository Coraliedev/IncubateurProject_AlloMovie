import { Link } from "react-router-dom"
import MovieModel from "../models/movie.model"
import { HeartIcon, EyeIcon } from "@heroicons/react/20/solid"


const MovieCard = ({ movie }: { movie: MovieModel }) => {


  return (
      <div className={`rounded-xl relative text-gray-400 font-bold hover:scale-110`} >
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title + ' poster'}
          className="rounded-xl h-full"
        />
        <p className="flex justify-center items-center rounded-tl-xl rounded-br-lg absolute top-0 left-0 w-10 h-10">{movie.vote_average}</p>
         <HeartIcon className="absolute top-0 right-1 w-10 h-10 text-gray-400 hover:text-red-500"/>
         <Link to={`/details/${movie.id}`}  >
          <EyeIcon className="absolute bottom-1 right-1 w-10 h-10 text-gray-400"/>
         </Link>
      </div>
  )
}



export default MovieCard