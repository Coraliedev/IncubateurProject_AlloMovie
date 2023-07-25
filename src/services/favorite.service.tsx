import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import MovieModel from "../models/Movie.model";
import MovieDetailModel from "../models/MovieDetail.model";
import { auth, db } from "../firebase";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import UserData from "../models/UserData";
import { useFirebaseAuth } from "./firebase.service";

type Movie = MovieModel | MovieDetailModel;

export const useFavorite = (movie?: Movie) => {
  const queryClient = useQueryClient();
  const email = auth.currentUser?.email;
  const { setAuthVisibility } = useFirebaseAuth()

  // Create a query key for the user's favorites data
  const userFavoritesQueryKey = ['favorites', email];

  const FetchUserData = async () => {
    if (email) {
      const docRef = doc(db, 'users', email);
      const docSnapshot = await getDoc(docRef);
      console.log(docSnapshot.data())
      return docSnapshot.data() as UserData;
    }
    return null;
  }

  const { data: userData } = useQuery<UserData | null>(userFavoritesQueryKey, FetchUserData, {
    // Provide initialData as null to handle loading state
    initialData: null,
  });


  // Define a mutation function for adding/removing favorites
  const addRemoveFavoriteMutation = useMutation(
    async (movie: Movie) => {
      console.log(email)
      if (email) {
        const docRef = doc(db, 'users', email);
        const docSnapshot = await getDoc(docRef);
        const userData = docSnapshot.data() as UserData;

        const existingFavorite = userData.savedShows.find((favorite) => movie.id === favorite.id);

        if (existingFavorite) {
          await updateDoc(docRef, {
            savedShows: userData.savedShows.filter((favorite) => movie.id !== favorite.id),
          });
        } else {
          await updateDoc(docRef, {
            savedShows: arrayUnion(movie),
          });
        }

        // After modifying favorites, add the new data to the cache of deleted data to update the UI
        queryClient.setQueryData(userFavoritesQueryKey, {
          savedShows: existingFavorite
            ? userData.savedShows.filter((favorite) => movie.id !== favorite.id)
            : [...userData.savedShows, movie],
        });
      }
      else {
        setAuthVisibility("")
      }
    }
  );

  const handleToggleFavorite = () => {
    if (movie) {
      addRemoveFavoriteMutation.mutate(movie);
    }
  };

  return {
    userData,
    handleToggleFavorite,
  };
};