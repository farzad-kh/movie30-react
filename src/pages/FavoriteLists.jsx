import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import Search from "../components/Search/Search";
import { useNavigate } from "react-router-dom";
import LoginOrSignUp from "./LoginOrSignUp";
import { useGetListQuery } from "../services/tmdbSlice";
import { useDispatch } from "react-redux";
import { whatchListData } from "../features/currentGenres ";
import { useGetListTvQuery } from "../services/tmdbSlice";
import Movie from "../components/Movie/Movie";
import Loading from "../components/Loading/Loading";

const FavoriteLists = () => {
  const sessionId = localStorage.getItem("session_id");
  const accountId = localStorage.getItem("accountId");
  const dispatch = useDispatch();
  const [tv, setTv] = useState([]);
  const [activeFilterBar, setActiveFilterBar] = useState("");
  const [whatchlistOrFavorite, setWhatchlistOrFavorite] = useState("all");

  
  const { searchIsActive, searchQuery, mediaType } = useSelector(
    (state) => state.currentGenres
  );

  const ref = useRef();
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
    page: 1,
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

  const filterHandler = (e, value) => {

    setActiveFilterBar({
      offsetWidth: e.target.offsetWidth,
      offsetLeft: e.target.offsetLeft,
    });
    setWhatchlistOrFavorite(value);
  };

  useEffect(() => {
   

    refetchFavoriteList();
    refetchFavoriteListTv();
    dispatch(whatchListData(newData));
    setNewFavoriteList(newData);
    setTv(newDataTv);
  }, [favoriteList, favoriteListTv]);

  const moviesLength = newFavoriteList?.length;
  const tvsLength = tv?.length;
  const moviesAndTvs = newFavoriteList?.length + tv?.length;

  const favoriteListFillter = [
    {
      value: "all",
      label: "All",
      length: moviesAndTvs,
    },
    {
      value: "movies",
      label: "Movies",
      length: moviesLength,
    },
    {
      value: "tv series",
      label: "Tv series",
      length: tvsLength,
    },
  ];
 
  const refreshFavorite=()=>{
    refetchFavoriteList();
    refetchFavoriteListTv();
  }
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="w-full h-full  flex justify-center items-center "
            >
              <div className="xl:p-10 lg:p-9 md:p-7 p-5 main w-full text-left">
                <h3 className="block text-primary sm:text-3xl text-[22px]   pb-10 ">
                  Favorites
                </h3>

                {tv?.length === 0 && newFavoriteList?.length === 0 ? (
                  <div>
                    <div className="font-semibold text-xl">
                      You haven't added any movies or tv series to your
                      favoritlist
                    </div>
                  </div>
                ) : (
                  <>
                    <div
                      ref={ref}
                      className="flex w-full justify-start items-center  relative  sm:gap-x-4 gap-x-3 text-[20px] font-semibold "
                    >
                      {favoriteListFillter.map((item) => (
                        <button
                          onClick={(e) => filterHandler(e, item.value)}
                          value={item.value}
                          key={item.label}
                          className={`${
                            item.value === whatchlistOrFavorite
                              ? "text-primary brightness-[0.95]"
                              : ""
                          }  p-1 flex cursor-pointer items-center sm:min-w-[83px] min-w-[70px] justify-center sm:text-lg text-base `}
                        >
                          {" "}
                          {item.label}
                          <p className="pointer-events-none ml-[4px] sm:text-lg text-sm mt-[2px]">
                            ( {item.length} )
                          </p>
                        </button>
                      ))}

                      <div
                        style={{
                          left: activeFilterBar.offsetLeft,
                          width: activeFilterBar.offsetWidth,
                        }}
                        className={`sm:min-w-[83px] min-w-[70px]  absolute  transition-all duration-300 left-[0] h-[2px] bg-[#de3c3c] bottom-0 `}
                      ></div>
                    </div>
                    <div className="w-full justify-end flex h-6 my-4">
                    <button className=" w-fit mb-7 link sm:text-base text-sm  link-hover text-error" onClick={refreshFavorite}>Refresh</button>

                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center sm-movie-card"
                    >
                      <div className="dd  grid gap-x-8 gap-y-12 w-full ">
                        {whatchlistOrFavorite === "all" && (
                          <>
                            {newFavoriteList?.map((item) => (
                              <Movie movie={item} key={item?.id} />
                            ))}

                            {tv?.map((item) => (
                              <Movie movie={item}  key={item?.id} />
                            ))}
                          </>
                        )}

                        {whatchlistOrFavorite === "tv series" && (
                          <>
                            {tv?.length === 0 ? (
                              <div className="font-semibold text-xl">
                                You haven't added any tv series to your
                                favoritlist{" "}
                              </div>
                            ) : (
                              tv?.map((item) => <Movie movie={item}  key={item?.id} />)
                            )}
                          </>
                        )}
                        {whatchlistOrFavorite === "movies" && (
                          <>
                            {newFavoriteList?.length === 0 ? (
                              <div className="font-semibold text-xl">
                                You haven't added any movies to your favoritlist{" "}
                              </div>
                            ) : (
                              newFavoriteList?.map((item) => (
                                <Movie movie={item}  key={item?.id} />
                              ))
                            )}
                          </>
                        )}
                      </div>
                    </motion.div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </>
      )}
    </>
  );
};

export default FavoriteLists;
