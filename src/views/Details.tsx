import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { API_KEY } from "../utils/api"
import NavBar from "../components/NavBar"
import MovieDetailModel from "../models/MovieDetail.model"
import MovieDetails from "../components/MovieDetail"



const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  const [movie, setMovie] = useState<MovieDetailModel>()

  useEffect(() => {
    const fetchMovie = async () => {
      const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`, { params: { append_to_response: "videos" }
      })
      setMovie(data)
    }
    fetchMovie()
  }  , [id])

  return (
    <>
    <NavBar/>
    {movie && <MovieDetails movie={movie} />}
    </>

  )
}

export default Details