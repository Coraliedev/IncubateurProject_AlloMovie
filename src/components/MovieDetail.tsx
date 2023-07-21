import { useEffect, useState } from "react";
import MovieDetailModel from "../models/MovieDetail.model";
import { StarIcon, PlayIcon, HeartIcon, ArrowUturnLeftIcon } from "@heroicons/react/20/solid";
import Youtube from "react-youtube";
import ResultsModel from "../models/Results.model";
import { useFavorite } from "../services/favorite.service";


const MovieDetail = ({ movie }: { movie: MovieDetailModel }) => {
  const [showModal, setShowModal] = useState(false);
  const [trailer, setTrailer] = useState<ResultsModel>({} as ResultsModel);
  const { handleToggleFavorite, userData } = useFavorite(movie);

  const isFavorite = userData?.savedShows.find((favorite) => movie.id === favorite.id);

  useEffect(() => {
    const trailerid = movie.videos.results.find(
      (vid) => vid.name === "Official Trailer"
    );
    setTrailer(trailerid ? trailerid : movie.videos.results[0]);
  }, [movie]);

  return (
    <div className="flex justify-center min-h-[85vh] bg-gray-900">
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-transparent outline-none focus:outline-none">
                <div className="flex items-start justify-between border-b p-2 ">
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-white opacity-100  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-white opacity-100  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <>
                  <Youtube
                    videoId={trailer.key}
                    className="w-[50vh] h-[50vh] md:w-[100vh] md:h-[60vh]"
                    opts={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <div className="flex flex-col items-center md:flex-row md:max-w-2xl lg:max-w-3xl xl:max-w-4xl text-white relative">
      <button onClick={() => window.history.back()} className="mt-6 ml-6 absolute top-0 right-0 p-3">
        <ArrowUturnLeftIcon className="h-8 w-8 text-white" />
      </button>
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
              <StarIcon className="h-10 w-10" />
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
          <div className="flex flex-row items-center ">
            <button
              onClick={() => setShowModal(true)}
              className="border text-[#FFFDE3] text-base border-gray-300 py-2 px-5 flex flex-row items-center hover:bg-cyan-600 hover:border-cyan-600 mb-8 md:mb-0"
            >
              <PlayIcon className="h-6 w-6" />
              Watch Trailer
            </button>
            <button onClick={handleToggleFavorite} className="cursor-ponter ml-10">
              {isFavorite ? <HeartIcon className="h-8 w-8 text-red-500" /> : <HeartIcon className="h-8 w-8" />}
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default MovieDetail;