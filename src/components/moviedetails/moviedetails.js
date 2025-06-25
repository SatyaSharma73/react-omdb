import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchAysnMovieOrShowDetail,
  getSelectedMoviesOrShows,
  fetchAysnEpisodes,
  getAllEpisodes,
} from "../../features/movies/movieSlice";
import "./movie.scss";
function Moviedetails() {
  const { imdbID } = useParams();
  const dispatch = useDispatch();
  const data = useSelector(getSelectedMoviesOrShows);
  const episodes = useSelector(getAllEpisodes);

  const [selectedSeason, setSelectedSeason] = useState(1);

  console.log("Episodes", episodes);

  useEffect(() => {
    dispatch(fetchAysnMovieOrShowDetail(imdbID));
    dispatch(fetchAysnEpisodes({ imdbID, season: selectedSeason }));
  }, [dispatch, imdbID, selectedSeason]);

  // console.log(selectedSeason);
  return (
    <div className="movie-section">
      {Object.keys(data).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <>
          <div className="section-left">
            <div className="movie-title">{data.Title}</div>
            <div className="movie-rating">
              <span>
                IMDB Rating <i className="fa fa-star"></i> : {data.imdbRating}
              </span>
              <span>
                IMDB Votes <i className="fa fa-thumbs-up"></i> :{" "}
                {data.imdbVotes}
              </span>
              <span>
                Runtime <i className="fa fa-film"></i> : {data.Runtime}
              </span>
              <span>
                Year <i className="fa fa-calendar"></i> : {data.Year}
              </span>
              <span>
                No. of Seasons <i className="fa fa-calendar"></i> :{" "}
                {!data.totalSeasons ? "N/A" : data.totalSeasons}
              </span>
            </div>
            <div className="movie-plot">{data.Plot}</div>
            <div className="movie-info">
              <div>
                <span>Director</span>
                <span>{data.Director}</span>
              </div>
              <div>
                <span>Writer</span>
                <span>{data.Writer}</span>
              </div>
              <div>
                <span>Stars</span>
                <span>{data.Actors}</span>
              </div>
              <div>
                <span>Generes</span>
                <span>{data.Genre}</span>
              </div>
              <div>
                <span>Languages</span>
                <span>{data.Language}</span>
              </div>
              <div>
                <span>Awards</span>
                <span>{data.Awards}</span>
              </div>
            </div>
            {episodes && episodes.Episodes && episodes.Episodes.length > 0 && (
              <div className="episode-list">
                <h3>Episodes</h3>
                <ul>
                  {episodes.Episodes.map((ep) => (
                    <li key={ep.imdbID}>
                      <strong>
                        {ep.Episode}. {ep.Title}
                      </strong>{" "}
                      ({ep.Released})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* <div className="section-right">
            <img src={data.Poster} alt={data.Title} />
          </div> */}

          <div className="section-right">
            <img src={data.Poster} alt={data.Title} />

            {data.totalSeasons && (
              <div className="season-selector">
                <h3>Seasons</h3>
                {[...Array(Number(data.totalSeasons)).keys()].map((season) => (
                  <button
                    key={season + 1}
                    onClick={() => {
                      setSelectedSeason(season + 1);
                      dispatch(
                        fetchAysnEpisodes({
                          imdbID: data.imdbID,
                          season: season + 1,
                        })
                      );
                    }}
                    className={selectedSeason === season + 1 ? "active" : ""}
                  >
                      Season {season + 1}
                  </button>
                ))}
              </div>
            )}

            {/* {episodes && episodes.Episodes && episodes.Episodes.length > 0 && (
              <div className="episode-list">
                <h3>Episodes</h3>
                <ul>
                  {episodes.Episodes.map((ep) => (
                    <li key={ep.imdbID}>
                      <strong>
                        {ep.Episode}. {ep.Title}
                      </strong>{" "}
                      ({ep.Released})
                    </li>
                  ))}
                </ul>
              </div>
            )} */}
          </div>
        </>
      )}
    </div>
  );
}

export default Moviedetails;
