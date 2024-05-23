import React, { useEffect, useState, useRef } from "react";

import { useSelector } from "react-redux";
import Search from "../components/Search/Search";

import LoginOrSignUp from "./LoginOrSignUp";
import { useGetListQuery } from "../services/tmdbSlice";
import { useDispatch } from "react-redux";
import { whatchListData } from "../features/currentGenres ";
import { useGetListTvQuery } from "../services/tmdbSlice";

import Loading from "../components/Loading/Loading";
import FavoriteList from "../components/layout/FavoriteList";

const FavoriteLists = () => {
  const sessionId = localStorage.getItem("session_id");
  const accountId = localStorage.getItem("accountId");
  const dispatch = useDispatch();
  const [tv, setTv] = useState([]);

  const { searchIsActive, searchQuery, mediaType } = useSelector(
    (state) => state.currentGenres
  );


  let medias = mediaType === "movie" ? "movies" : "tv";
  const {
    data: favoriteList,
    isFetching: listIsLoading,
    refetch: refetchFavoriteList,
  } = useGetListQuery({
    accountId: accountId,
    listName: "favorite",
    media: "movies",
    sessionId: sessionId,
  });

  const {
    data: favoriteListTv,
    isFetching: listIsLoadingTv,
    refetch: refetchFavoriteListTv,
  } = useGetListTvQuery({
    accountId: accountId,
    listName: "favorite",
    media: "tv",
    sessionId: sessionId,
   
  });

  const [newFavoriteList, setNewFavoriteList] = useState([]);

  const newData = favoriteList?.results?.map((item) => {
    let isMovieOrTv = {
      ...(item.title ? { media_type: "movie" } : { media_type: "tv" }),
    };
    return { ...item, ...isMovieOrTv };
  });

  const newDataTv = favoriteListTv?.results?.map((item) => {
    let isMovieOrTv = {
      ...(item.title ? { media_type: "movie" } : { media_type: "tv" }),
    };
    return { ...item, ...isMovieOrTv };
  });


  useEffect(() => {
   

    refetchFavoriteList();
    refetchFavoriteListTv();
    dispatch(whatchListData(newData));
    setNewFavoriteList(newData);
    setTv(newDataTv);
  }, [favoriteList, favoriteListTv]);


  if (searchQuery?.length > 0 && searchIsActive) return  <Search/>
  return (
    <>
      {sessionId === null || sessionId === "" ? (
        <LoginOrSignUp />
      ) : (
        <>
          {listIsLoadingTv || listIsLoading ? (
            <Loading />
          ) : (
      <FavoriteList tv={tv} newFavoriteList={newFavoriteList} 
      refetchFavoriteList={refetchFavoriteList} 
       refetchFavoriteListTv={refetchFavoriteListTv}/>
          )}
        </>
      )}
    </>
  );
};

export default FavoriteLists;
