import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import MovieModel from "../models/Movie.model";
import MovieDetailModel from "../models/MovieDetail.model";
import { auth, db } from "../firebase";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import UserData from "../models/UserData";
import { useFirebaseAuth } from "./firebase.service";
import { useAtom } from "jotai";
import { searchkeyAtom } from "../atoms";

type Movie = MovieModel | MovieDetailModel;

export const useFavorite = (movie?: Movie) => {
  const queryClient = useQueryClient();
  const email = auth.currentUser?.email;

  const { setAuthVisibility } = useFirebaseAuth();
  const [searchKey, setSearchKey] = useAtom(searchkeyAtom);

  // Create a query key for the user's favorites data
  const userFavoritesQueryKey = ['favorites', email, searchKey];

  const FetchUserData = async () => {
    if (email) {
      const docRef = doc(db, 'users', email);
      const docSnapshot = await getDoc(docRef);
      const userData = docSnapshot.data() as UserData;

      // Effectuer la recherche partielle par nom de film dans les favoris de l'utilisateur
      const favoritesWithPartialFilmName = userData.savedShows.filter(
        favorite => favorite.title.toLowerCase().includes(searchKey.toLowerCase())
      );

      return { ...userData, savedShows: favoritesWithPartialFilmName };
    }
    return null;
  }

  const { data: userData } = useQuery<UserData | null>(userFavoritesQueryKey, FetchUserData, {
    // Provide initialData as null to handle loading state
    initialData: null,
  });

  const updateSearchKeyFavorites = (key: string) => {
    setSearchKey(key);
  }

  // Define a mutation function for adding/removing favorites
  const addRemoveFavoriteMutation = useMutation(
    async (movie: Movie) => {
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
      } else {
        setAuthVisibility("");
      }
    }
  );

  const handleToggleFavorite = () => {
    if (movie) {
      // Ajoutez le nom du film à l'objet movie avant de le passer à la mutation
      const movieWithFilmName = { ...movie, filmName: movie.title };
      addRemoveFavoriteMutation.mutate(movieWithFilmName);
    }
  };

  return {
    userData,
    handleToggleFavorite,
    updateSearchKeyFavorites
  };
};