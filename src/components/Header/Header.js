import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import user from "../../images/user.png";
import "./header.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAysnMovies,
  fetchAysnShows,
  getMode,
  setMode,
} from "../../features/movies/movieSlice";
import { useUserAuth } from "../Context/UserAuthContext";
function Header() {
  let { user, logout } = useUserAuth();
  const [term, setTerm] = useState("");

  const location = useLocation();
  console.log("Location object:", location.pathname);

  const Currentmode = useSelector(getMode);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (term === "") {
      window.alert("The search box was empty");
    } else {
      dispatch(fetchAysnMovies(term));
      dispatch(fetchAysnShows(term));
    }
  };

  const toggleMode = () => {
    const newMode = Currentmode === 1 ? 0 : 1;
    dispatch(setMode(newMode));
    console.log("Mode switched to:", newMode === 1 ? "Series" : "Movies");
  };

  const back = () => {
    console.log("goback");

    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/"; // fallback to home or another safe page
    }
  };

  const signout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="header">
      {location.pathname.includes("/movie/") ? (
        <button class="back-button" onClick={back}>
               ← Back{" "}
        </button>
      ) : (
        ""
      )}

      <div className="logo">
        {" "}
        <Link to="/">FilmoraX </Link>
      </div>

      {user && !location.pathname.includes("/movie/") ? (
        <div className="search-bar">
               {" "}
          <form onSubmit={submitHandler}>
                   {" "}
            <input
              type="text"
              value={term}
              placeholder={`Search your favorite ${
                Currentmode === 1 ? "Movie" : "Show"
              }. . .`}
              onChange={(e) => setTerm(e.target.value)}
            />
                    <button type="submit">Search</button>
                 {" "}
          </form>
             {" "}
        </div>
      ) : (
        <div className="search-bar">
               {" "}
          <form onSubmit={submitHandler}>
                   {" "}
            <input
              type="text"
              value={term}
              disabled
              placeholder={`Go back to homepage to search your ${
                Currentmode === 1 ? "Movie" : "Show"
              }. . .`}
              onChange={(e) => setTerm(e.target.value)}
            />
                    <button type="submit">Search</button>
                 {" "}
          </form>
             {" "}
        </div>
      )}

      {user && location.pathname.includes("/movie/") ? (
        <div className="toggle-mode">
                       {" "}
          {user?.email && (
            <span className="user-email">Logged in as: {user.displayName}</span>
          )}
        </div>
      ) : (
        <div className="toggle-mode">
                 {" "}
          <button onClick={toggleMode}>
                      Switch to {Currentmode === 1 ? "Series" : "Movies"} Mode
                   {" "}
          </button>
               {" "}
          {user?.email && (
            <span className="user-email">Logged in as: {user.displayName}</span>
          )}
        </div>
      )}

      <div className="user-image">
        {/* <img src={user} alt="user"></img> */}

        {user && user.email ? (
          <button onClick={signout}>          Log out         </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Header;
