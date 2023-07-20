import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { API_KEY } from "../utils/api"
import NavBar from "../components/NavBar"



const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  console.log(id)

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`).then(({ data }) => {
      console.log(data)
    })
  }  , [id])

  return (
    <>
    <NavBar/>
    </>

  )
}

export default Details