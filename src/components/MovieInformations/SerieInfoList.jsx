import React, { useState, useEffect, useRef, useContext } from "react";

import { useGetRecommendedQuery } from "../../services/tmdbSlice";

import { Link, useNavigate } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";
import { useGetListQuery } from "../../services/tmdbSlice";
import { FavoriteOrWhatchConext } from "../../context/FavoriteOrWhatchConextProvider";
// import {stylesss} from "../../styles/miniLoader.module.css"
//icons

import { HiChevronLeft } from "react-icons/hi";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SwiperSmall from "../Swiper/SwiperSmall";
import SwiperMed from "../Swiper/SwiperMed";
import LoadingRow from "../Loading/LoadingRow";
import { DrawersContext } from "../../context/DrawersContextProvider";
import { useInView } from "framer-motion";
import SeriesMoreInfo from "../module/MovieMoreInfo/SeriesMoreInfo";
import SeriePosterInfo from "../module/SeriePosterInfo";
import AddOrRemoveFavorits from "../module/AddOrRemoveFavorits";

const MovieInfoList = ({ serieInfo, media, id }) => {
  const sessionId = localStorage.getItem("session_id");
  const accountId = localStorage.getItem("accountId");
  const [showErr, setShowErr] = useState(false);
  if (showErr) setTimeout(() => setShowErr(false), 4000);

  const {
    data,
    isLoading: isLoadingRecommended,
    isError,
  } = useGetRecommendedQuery({
    id: id,
    media: media,
  });

  const {
    data: whatchList,
    isFetching: listIsLoading,
    refetch: refetchWhatchList,
  } = useGetListQuery({
    accountId: accountId,
    listName: "watchlist",
    media: "tv",
    sessionId: sessionId,
    page: 1,
  });

  const {
    data: favorites,
    isFetching: FavoritesLoading,
    refetch: refetchFavorite,
  } = useGetListQuery({
    accountId: accountId,
    listName: "favorite",
    media: "tv",
    sessionId: sessionId,
    page: 1,
  });

  const navigate = useNavigate();
  const navigateLogin = useNavigate();

  const {
    addToFavorites,
    isMovieFavorited,
    setIsMovieFavorited,
    isMovieWatchlisted,
    setIsMovieWatchlisted,
    addToWatchLists,
  } = useContext(FavoriteOrWhatchConext);

  const { darkMode } = useContext(DrawersContext);
  let seriesPG =
    serieInfo?.content_ratings?.results.find((item) =>
      item?.iso_3166_1 === "US" ? item : ""
    ) || {};

  const [recommended, setRecommended] = useState([]);

  const whatchListTrueOrFalse = !!whatchList?.results?.find(
    (movie) => movie.id === serieInfo.id
  );

  const favoriteTrueOrFalse = !!favorites?.results?.find(
    (movie) => movie.id === serieInfo.id
  );

  const profilePathFilter =
    serieInfo?.credits?.cast.filter((item) =>
      item?.profile_path === null || item?.profile_path === undefined
        ? ""
        : item
    ) || [];

  const refSeries = useRef(null);
  const isInViewSeries = useInView(refSeries, { once: false });

  const addToWatchListsHandler = async (e) => {
    setIsMovieWatchlisted(whatchListTrueOrFalse);
    await addToWatchLists(sessionId, media, id, accountId, isMovieWatchlisted);
    refetchWhatchList();
  };

  const addToFavoritesHandler = async () => {
    setIsMovieFavorited(favoriteTrueOrFalse);
    await addToFavorites(sessionId, media, id, accountId, isMovieFavorited);
    refetchFavorite();
  };
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    setIsMovieWatchlisted(whatchListTrueOrFalse);
    setIsMovieFavorited(favoriteTrueOrFalse);
    const filterRecommended = data?.results?.filter((item) =>
      item?.poster_path === null ? "" : item
    );
    if (isInViewSeries === true) {
      setTimeout(() => setRecommended(filterRecommended), 1000);
    } else {
      null;
    }
  }, [data, isInViewSeries, whatchList, favorites, , totalPage]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className=" h-full"
    >
      <div className="relative object-cover  w-full cover-img h-full backdrop-path-mask   ">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${serieInfo?.["backdrop_path"]})`,
          }}
          className={` ${
            !darkMode && "!opacity-0"
          } blur-[2.3px] brightness-[0.29] rounded  z-[-1] overflow-hidden absolute  object-cover h-[820px]  w-full bg-cover bg-no-repeat bg-center  `}
        ></motion.div>
      </div>
      <section className="relative    xl:p-8 p-[24px] main    ">
        <button
          className=" sm:mb-3 mb-[20px] active:scale-95 sm:text-[26px] text-[24px] text-secondary transition-all hover:text-info  hover:bg-secondary rounded-full  backdrop-blur-sm  flex items-center self-center"
          onClick={() => navigate(-1)}
        >
          <HiChevronLeft />
        </button>
        <div className=" min-h-[692px] flex justify-between items-center md:flex-row flex-col-reverse mt-4 md:mb-[85px] mb-7  ">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className=" h-fit  self-baseline mt-8 flex-[1.2] pr-7  "
          >
            <div className="flex flex-col justify-between mb-7">
              <h1 className="md:text-[1.6rem] sm:text-[1.45rem]  text-[1.2rem]  text-primary font-semibold flex">
                {serieInfo?.name}{" "}
                {serieInfo?.["first_air_date"] &&
                  serieInfo?.["first_air_date"] !== null &&
                  serieInfo?.["first_air_date"]?.slice(0, 4)}
              </h1>
              <div className="italic text-[0.94rem] leading-[1.4] title-3 font-semibold ">
                {serieInfo?.tagline}
              </div>
            </div>

            <SeriesMoreInfo
              seriesPG={seriesPG}
              movieInfo={serieInfo}
              type={"series"}
            >
              <AddOrRemoveFavorits
                favorites={favorites}
                sessionId={sessionId}
                accountId={accountId}
                addToFavoritesHandler={addToFavoritesHandler}
                isMovieFavorited={isMovieFavorited}
                FavoritesLoading={FavoritesLoading}
                darkMode={darkMode}
              />
            </SeriesMoreInfo>

            <div className="flex mt-4 mb-8 font-semibold flex-wrap gap-y-6">
              {serieInfo?.genres?.map((item) => (
                <div
                  key={item.id}
                  className="hover:text-primary transition-all !cursor-default  mr-2 text-sm "
                >
                  <Link
                    className={`${
                      darkMode ? "bg-slate-800" : "bg-[#efefefba]"
                    } p-[8px] rounded-md sm:text-sm text-[13px]`}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
            <div className="text-primary w-full pr-7  max-w-[828px] text-base leading-[1.6] mt-12 ">
              <h3>{serieInfo?.overview}</h3>
            </div>
          </motion.div>
          <SeriePosterInfo
            movieInfo={serieInfo}
            whatchList={whatchList}
            listIsLoading={listIsLoading}
            addToWatchListsHandler={addToWatchListsHandler}
            isMovieWatchlisted={isMovieWatchlisted}
          />
        </div>
        <div className=" items-center block select-none mt-6 movie-info-list ">
          {profilePathFilter?.length !== 0 && (
            <SwiperSmall profilePathFilter={profilePathFilter} />
          )}
          <div className="mt-8" ref={refSeries}>
            {data?.results?.length === 0 || isLoadingRecommended ? (
              ""
            ) : recommended?.length === 0 ? (
              <LoadingRow />
            ) : (
              <SwiperMed movieInfo={recommended} />
            )}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default MovieInfoList;
