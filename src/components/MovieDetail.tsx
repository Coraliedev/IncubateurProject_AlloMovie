import MovieDetailModel from "../models/MovieDetail.model";
import { StarIcon } from "@heroicons/react/20/solid";

const MovieDetail = ({ movie }: { movie: MovieDetailModel }) => {
  return (
    <div className="flex justify-center min-h-[85vh] bg-gray-900">
      <div className="flex flex-col items-center md:flex-row md:max-w-2xl lg:max-w-3xl xl:max-w-4xl text-white">
        <div className=" lg:w-[30%] h-auto md:h-[400px] w-[70%] ">
          <img
            className="w-[100%] h-full md:h-auto object-cover rounded-md"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt=""
          />
        </div>
        <div className="float-left w-[70%] md:pl-12 ">
          <p className="text-3xl md:text-5xl mb-3 mt-3 md:mt-0">
            {movie.title || movie.original_title}{" "}
          </p>
          <div className="flex flex-row items-center ">
            <div className="flex flex-row justify-center items-center mr-5 pb-2">
              <StarIcon className="text-3xl mr-2" />
              <p className="text-4xl ">
                {movie?.vote_average?.toFixed(1)}{" "}
              </p>
            </div>
            <div className="flex flex-col">
              <div className="grid grid-flow-col auto-cols-max gap-4 ">
                <p className="text-cyan-600 text-sm md:text-base">
                  Released: {movie?.release_date}{" "}
                </p>
                <p className="text-cyan-600 text-sm md:text-base">
                  {movie?.runtime} min
                </p>
              </div>

              <div className="grid grid-flow-col auto-cols-max gap-4 mb-3">
                {movie.genres &&
                  movie.genres.slice(0, 5).map((genre, i) => (
                    <span key={i} className="text-sm  md:text-base">
                      {genre.name}
                    </span>
                  ))}
              </div>
            </div>
          </div>
          <p className="text-gray-300 mb-8">{movie.overview} </p>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default MovieDetail;