import GenreModel from "./GenreModel.model";
import ResultsModel from "./Results.model";

export default interface MovieDetailModel {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: object;
  budget: number;
  genres: GenreModel[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_langage: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: object[];
  production_countries: object[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: object[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  videos: {
    results: ResultsModel[];
  };
  vote_average: number;
  vote_count: number;
}
