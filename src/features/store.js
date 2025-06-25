import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movies/movieSlice";

export default configureStore({
  reducer: {
    movies: movieReducer,
  },
});
