import React, { useEffect } from "react";
import Movielisting from "../movielisting/movielisting";
import Login from "../Auth/Login/Login";
import { useDispatch } from "react-redux";
import {
  fetchAysnMovies,
  fetchAysnShows,
} from "../../features/movies/movieSlice";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    const movieText = "Superman";
    const showText = "Your";

    dispatch(fetchAysnMovies(movieText));
    dispatch(fetchAysnShows(showText));
  }, [dispatch]);

  return (
    <div>
      <div className="banner-img">
        {" "}
        <Movielisting />
      </div>
    </div>
  );
}

export default Home;
