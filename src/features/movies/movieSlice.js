import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/movieApikey";

export const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: {},
    shows: {},
    selectedMovieOrShow: {},
    episodes: {},
    mode: 1,
  },
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
  // extraReducers: {
  //   [fetchAysnMovies.pending]: () => {
  //     console.log("pending");
  //   },
  //   [fetchAysnMovies.fulfilled]: (state, { payload }) => {
  //     console.log("fetched successfuly");
  //     return { ...state, movies: payload };
  //   },
  //   [fetchAysnMovies.rejected]: () => {
  //     console.log("rejected");
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAysnMovies.pending, () => {
        console.log("pending");
      })
      .addCase(fetchAysnMovies.fulfilled, (state, action) => {
        console.log("fetched successfuly");
        return { ...state, movies: action.payload };
      })
      .addCase(fetchAysnShows.fulfilled, (state, action) => {
        console.log("fetched successfuly");
        return { ...state, shows: action.payload };
      })
      .addCase(fetchAysnMovieOrShowDetail.fulfilled, (state, action) => {
        console.log("fetched successfuly");

        return { ...state, selectedMovieOrShow: action.payload };
      })
      .addCase(fetchAysnEpisodes.fulfilled, (state, action) => {
        console.log("fetched successfuly");
        return { ...state, episodes: action.payload };
      })
      .addCase(fetchAysnMovies.rejected, (state, action) => {
        console.log("Rejected, Check the API URL");
      });
  },
});

export const fetchAysnMovies = createAsyncThunk(
  "movies/fetchAysnMovies",
  async (term) => {
    const response = await movieApi
      .get(`?apikey=${APIKey}&s=${term}&type=movie`)
      .catch((err) => {
        console.error(err);
      });
    return response.data;
  }
);

export const fetchAysnShows = createAsyncThunk(
  "movies/fetchAysnShows",
  async (term) => {
    // const seriesText = "mirzapur";
    const response = await movieApi
      .get(`?apikey=${APIKey}&s=${term}&type=series`)
      .catch((err) => {
        console.error(err);
      });
    return response.data;
  }
);

export const fetchAysnMovieOrShowDetail = createAsyncThunk(
  "movies/fetchAysnMovieOrShowDetail",
  async (id) => {
    const response = await movieApi
      .get(`?apikey=${APIKey}&i=${id}&plot=full`)
      .catch((err) => {
        console.error(err);
      });
    console.log(response.data);

    return response.data;
  }
);

export const fetchAysnEpisodes = createAsyncThunk(
  "movies/fetchAysnEpisodes",
  async ({ imdbID, season }) => {
    console.log(season);
    const response = await movieApi
      .get(
        `https://www.omdbapi.com/?i=${imdbID}&Season=${season}&apikey=${APIKey}`
      )
      .catch((err) => {
        console.error(err);
      });
    // console.log(response.data);

    return response.data;
  }
);

// Action creators are generated for each case reducer function
export const { setMode } = movieSlice.actions;
export const getMode = (state) => state.movies.mode;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getAllEpisodes = (state) => state.movies.episodes;
export const getSelectedMoviesOrShows = (state) =>
  state.movies.selectedMovieOrShow;

export default movieSlice.reducer;
