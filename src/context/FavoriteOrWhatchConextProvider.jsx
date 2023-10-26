import React, { useState, createContext } from "react";
import axios from "axios";
export const FavoriteOrWhatchConext = createContext();
const FavoriteOrWhatchConextProvider = ({ children }) => {
  const [a, setA] = useState("hi");
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  const addToWatchLists = async (
    session_id,
    media_type,
    media_id,
    account_id,
    isMovieWatchlisted
  ) => {
    const options = {
      method: "POST",
      url: `https://api.themoviedb.org/3/account/${account_id}/watchlist`,
      params: { session_id: session_id },
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Njk5MTQ5NWYwMWExODRmMTg4ZGYzNmZiYTAwNjJmYSIsInN1YiI6IjYzMTY0MTlhYTg0YTQ3MDA3ZGMxNzJlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F_29ghSyysigFSM_qj9LfJAuaiHwyIhcsnB2Iv7uL6Q",
      },
      data: {
        media_type: media_type,
        media_id: media_id,
        watchlist: !isMovieWatchlisted,
      },
    };

    try {
      const response = await axios.request(options);
    } catch (error) {
      console.error(error);
    }
  };

  const addToFavorites = async (
    session_id,
    media_type,
    media_id,
    account_id,
    isMovieFavorited
  ) => {
    const options = {
      method: "POST",
      url: `https://api.themoviedb.org/3/account/${account_id}/favorite`,
      params: { session_id: session_id },
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Njk5MTQ5NWYwMWExODRmMTg4ZGYzNmZiYTAwNjJmYSIsInN1YiI6IjYzMTY0MTlhYTg0YTQ3MDA3ZGMxNzJlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F_29ghSyysigFSM_qj9LfJAuaiHwyIhcsnB2Iv7uL6Q",
      },
      data: {
        media_type: media_type,
        media_id: media_id,
        favorite: !isMovieFavorited,
      },
    };

    try {
      const response = await axios.request(options);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FavoriteOrWhatchConext.Provider
      value={{
        addToFavorites,
        isMovieFavorited,
        setIsMovieFavorited,
        addToWatchLists,
        isMovieWatchlisted,
        setIsMovieWatchlisted,
      }}
    >
      {children}
    </FavoriteOrWhatchConext.Provider>
  );
};

export default FavoriteOrWhatchConextProvider;
