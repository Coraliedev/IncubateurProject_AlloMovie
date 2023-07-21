import { useEffect, useState } from "react";
import MovieModel from "../models/Movie.model";
import MovieDetailModel from "../models/MovieDetail.model";
import { auth, db } from "../firebase";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";

type Movie = MovieModel | MovieDetailModel;

export const useFavorite = (movie: Movie) => {
  const [isFavorite, setIsFavorite] = useState(false);

  interface UserData {
    savedShows: Movie[];
  }

  const handleToggleFavorite = async () => {
    const email = auth.currentUser?.email; 

    if (!email) return;
    const docRef = doc(db, 'users', email);

    // Get the existing document data to check if the video is already a favorite
    const docSnapshot = await getDoc(docRef);
    if (!docSnapshot.exists()) return;

    const userData = docSnapshot.data() as UserData; 

    const existingFavorite = userData.savedShows.find((favorite) => movie.id === favorite.id);

    if (existingFavorite) {
      // Remove the video from favorites using arrayRemove
      await updateDoc(docRef, {
        savedShows: userData.savedShows.filter((favorite) => movie.id !== favorite.id),
      });
      setIsFavorite(false);
    } else {
      // Add the video to favorites using arrayUnion
      await updateDoc(docRef, {
        savedShows: arrayUnion(movie),
      });
      setIsFavorite(true);
    }
  };

  useEffect(() => {
    const email = auth.currentUser?.email;
    if (!email) return;
    const docRef = doc(db, 'users', email);

    const checkIfFavorite = async () => {
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data() as UserData;
        const existingFavorite = userData.savedShows.find((favorite) => movie.id === favorite.id);
        setIsFavorite(!!existingFavorite); // Set the state to true if the video is already in favorites
      }
    };

    checkIfFavorite();
  }, [movie.id]);

  return { isFavorite, handleToggleFavorite };
};
