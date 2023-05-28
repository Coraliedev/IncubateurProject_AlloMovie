import MovieModel from "./movie.model";

export default interface RequestResultsModel {
  page: number;
  results: MovieModel[];
  total_pages: number;
  total_results: number;
}