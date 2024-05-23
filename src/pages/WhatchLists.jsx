import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import Search from "../components/Search/Search";
 
import LoginOrSignUp from "./LoginOrSignUp";
import { useGetListQuery } from "../services/tmdbSlice";
 
import { useGetListTvQuery } from "../services/tmdbSlice";
 
import Loading from "../components/Loading/Loading";
import WhatchList from "../components/layout/WhatchList";

const WhatchLists = () => {
  const sessionId = localStorage.getItem("session_id");
  const accountId = localStorage.getItem("accountId");

  const [tv, setTv] = useState([]);

  const { searchIsActive, searchQuery, mediaType } = useSelector(
    (state) => state.currentGenres
  );

  const {
    data: whatchList,
    isFetching: listIsLoading,
    refetch: refetchWhatchList,
  } = useGetListQuery({
    accountId: accountId,
    listName: "watchlist",
    media: "movies",
    sessionId: sessionId,
  });

  const {
    data: whatchListTv,
    isFetching: listIsLoadingTv,
    refetch: refetchWhatchListTv,
  } = useGetListTvQuery({
    accountId: accountId,
    listName: "watchlist",
    media: "tv",
    sessionId: sessionId,
    
  });

  const [newWhatchList, setNewWhatchList] = useState([]);

  const newData = whatchList?.results?.map((item) => {
    let isMovieOrTv = {
      ...(item.title ? { media_type: "movie" } : { media_type: "tv" }),
    };
    return { ...item, ...isMovieOrTv };
  });

  const newDataTv = whatchListTv?.results?.map((item) => {
    let isMovieOrTv = {
      ...(item.title ? { media_type: "movie" } : { media_type: "tv" }),
    };
    return { ...item, ...isMovieOrTv };
  });

  useEffect(() => {
    refetchWhatchList();
    refetchWhatchListTv();
    // dispatch(whatchListData(newData));
    setNewWhatchList(newData);
    setTv(newDataTv);
  }, [whatchList, whatchListTv]);

  if (searchQuery?.length > 0 && searchIsActive) return <Search />;
  return (
    <>
      {sessionId === null || sessionId === "" ? (
        <LoginOrSignUp />
      ) : (
        <>
          {listIsLoadingTv || listIsLoading ? (
            <Loading />
          ) : (
            <WhatchList
              tv={tv}
              newWhatchList={newWhatchList}
              refetchWhatchList={refetchWhatchList}
              refetchWhatchListTv={refetchWhatchListTv}
              mediaType={mediaType}
            />
          )}
        </>
      )}
    </>
  );
};

export default WhatchLists;
