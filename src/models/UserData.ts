import MovieModel from "./Movie.model";
import MovieDetailModel from "./MovieDetail.model";

export type Movie = MovieModel | MovieDetailModel;

export default interface UserData {
  savedShows: Movie[];
}
