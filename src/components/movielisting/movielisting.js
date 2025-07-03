import React from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import {
  getAllMovies,
  getAllShows,
  getMode,
} from "../../features/movies/movieSlice";
import MovieCard from "../moviecard/moviecard";
import "../movielisting/movielisting.scss";
import { settings } from "../../common/settings";

function Movielisting() {
  const movies = useSelector(getAllMovies);
  const shows = useSelector(getAllShows);
  const mode = useSelector(getMode);
  console.log(movies);
  console.log("Current mode in store", mode);

  let renderMovies = "";
  let renderShows = "";

  renderMovies =
    movies.Response === "True" ? (
      movies.Search.map((movie, index) => {
        return <MovieCard key={index} data={movie}></MovieCard>;
      })
    ) : (
      <div className="movies-error">
        <h3>{movies.error}</h3>
      </div>
    );

  renderShows =
    shows.Response === "True" ? (
      shows.Search.map((movie, index) => {
        return <MovieCard key={index} data={movie}></MovieCard>;
      })
    ) : (
      <div className="shows-error">
        <h3>{shows.error}</h3>
      </div>
    );

  return (
    <div className="movie-wrapper">
      {mode === 1 ? (
        <div className="movie-list">
          <h2>
            🎬 Your Gateway to Cinematic Worlds – Stream, Discover, Repeat!
          </h2>
          {shows.Response === "False" ? (
            <div className="no-results">
              <p>
                We couldn't find anything matching your search. Please try a
                different keyword.
              </p>
            </div>
          ) : (
            <div className="">
              <Slider {...settings}>{renderMovies}</Slider>
            </div>
          )}
        </div>
      ) : (
        <div className="show-list">
          <h2>One More Episode? Always!</h2>
          {shows.Response === "False" ? (
            <div className="no-results">
              <p>
                We couldn't find anything matching your search. Please try a
                different keyword.
              </p>
            </div>
          ) : (
            <div className="">
              <Slider {...settings}>{renderShows}</Slider>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Movielisting;
