import React, { useState, useEffect, useRef, useContext } from "react";
import { useGetRecommendedQuery } from "../../services/tmdbSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  selectGenres,
  resetPage,
  selectName,
} from "../../features/currentGenres ";
import { useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { useGetListQuery } from "../../services/tmdbSlice";
import { FavoriteOrWhatchConext } from "../../context/FavoriteOrWhatchConextProvider";
import { HiChevronLeft } from "react-icons/hi";

import SwiperSmall from "../Swiper/SwiperSmall";
import SwiperMed from "../Swiper/SwiperMed";
import { DrawersContext } from "../../context/DrawersContextProvider";
import { useInView } from "framer-motion";
import FilmMoreInfo from "../module/MovieMoreInfo/FilmMoreInfo";
import MoviePosterInfo from "../module/MoviePosterInfo";
import AddOrRemoveFavorits from "../module/AddOrRemoveFavorits";

const MovieInfoList = ({ movieInfo, media, id }) => {
  const sessionId = localStorage.getItem("session_id");
  const accountId = localStorage.getItem("accountId");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const { data, isLoading: isLoadingRecommended } = useGetRecommendedQuery({
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
    media: "movies",
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
    media: "movies",
    sessionId: sessionId,
    page: 1,
  });

  const navigate = useNavigate();
  const {
    addToFavorites,
    isMovieFavorited,
    setIsMovieFavorited,
    isMovieWatchlisted,
    setIsMovieWatchlisted,
    addToWatchLists,
  } = useContext(FavoriteOrWhatchConext);

  const { darkMode } = useContext(DrawersContext);

  const dispatch = useDispatch();

  // for genres btn Link
  const clickHandler = (item) => {
    dispatch(selectGenres(item.id));
    dispatch(selectName(item.name));
    dispatch(resetPage());
  };

  let pg = movieInfo?.release_dates?.results.find(
    (item, i) => item?.iso_3166_1 === "US"
  );

  const usPG = pg?.release_dates.find(
    (item) => item.certification !== "" || item.certification !== undefined
  );
  const netflix =
    pg?.release_dates?.find((item) =>
      item?.note?.toLowerCase() === "netflix" ? item : null
    ) || [];

  const [recommended, setRecommended] = useState([]);

  const whatchListTrueOrFalse = !!whatchList?.results?.find(
    (movie) => movie.id === movieInfo.id
  );

  const favoriteTrueOrFalse = !!favorites?.results?.find(
    (movie) => movie.id === movieInfo.id
  );

  const profilePathFilter = movieInfo?.credits?.cast.filter(
    (item) => item?.profile_path !== null
  );

  const addToWatchListsHandler = async (e) => {
    setIsMovieWatchlisted(whatchListTrueOrFalse);
    await addToWatchLists(
      sessionId,
      media,
      movieInfo?.id,
      accountId,
      isMovieWatchlisted
    );
    refetchWhatchList();
  };

  const addToFavoritesHandler = async () => {
    setIsMovieFavorited(favoriteTrueOrFalse);
    await addToFavorites(
      sessionId,
      media,
      movieInfo?.id,
      accountId,
      isMovieFavorited
    );
    refetchFavorite();
  };
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    setIsMovieWatchlisted(whatchListTrueOrFalse);
    setIsMovieFavorited(favoriteTrueOrFalse);
    const filterRecommended =
      data?.results?.filter((item) =>
        item?.poster_path === null ? "" : item
      ) || [];
    if (isInView) {
      setTimeout(() => setRecommended(filterRecommended), 1100);
    } else {
      null;
    }
  }, [data, isInView, whatchList, favorites, totalPage]);

  return (
    <div className=" h-full">
      <div className="relative object-cover  w-full cover-img h-full   ">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${movieInfo?.["backdrop_path"]})`,
          }}
          className={` ${
            !darkMode ? "!opacity-0" : "opacity-100"
          } blur-[2.3px] brightness-[0.29] rounded  z-[-1] overflow-hidden absolute  object-cover h-[820px]  w-full bg-cover bg-no-repeat bg-center  `}
        ></motion.div>
        <div className="backdrop-path-mask "></div>
      </div>

      <section className="  xl:p-8 p-[24px] relative    ">
        <button
          className=" sm:mb-3 mb-[20px] active:scale-95 sm:text-[26px] text-[24px] text-secondary transition-all hover:text-info  hover:bg-secondary rounded-full  backdrop-blur-sm  flex items-center self-center"
          onClick={() => navigate(-1)}
        >
          <HiChevronLeft />
        </button>

        <div className="  min-h-[692px]  flex justify-between items-center md:flex-row flex-col-reverse mt-4 md:mb-[85px] mb-7  ">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className=" h-fit  self-baseline mt-8 flex-[1.2] pr-7  "
          >
            <div className="flex flex-col justify-between mb-7">
              <h1 className="md:text-[1.6rem] sm:text-[1.45rem]  text-[1.2rem]  text-primary font-semibold flex">
                {movieInfo?.title}{" "}
                {movieInfo?.["release_date"] &&
                  movieInfo?.["release_date"]?.slice(0, 4)}
              </h1>
              <div className="italic text-[0.94rem] leading-[1.4] title-3 font-semibold ">
                {movieInfo?.tagline}
              </div>
            </div>

            <FilmMoreInfo movieInfo={movieInfo} usPG={usPG}>
              <AddOrRemoveFavorits
                favorites={favorites}
                sessionId={sessionId}
                accountId={accountId}
                addToFavoritesHandler={addToFavoritesHandler}
                isMovieFavorited={isMovieFavorited}
                FavoritesLoading={FavoritesLoading}
                darkMode={darkMode}
              />
            </FilmMoreInfo>

            <div className="  flex mt-4 mb-8 font-semibold flex-wrap gap-y-6">
              {movieInfo?.genres?.map((item) => (
                <div
                  key={item.id}
                  className="hover:text-primary transition-all cursor-pointer  mr-2 text-sm "
                >
                  <Link
                    to={"/movies/genres"}
                    onClick={() => clickHandler(item)}
                    // className=' backdrop-blur backdrop-brightness-[1.4] p-[8px] rounded-md'
                    className={`${
                      darkMode ? "bg-slate-800" : "bg-[#efefefba]"
                    } p-[8px] rounded-md sm:text-sm text-[13px]`}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>

            <div className="sm:text-base text-sm text-primary w-full pr-7  max-w-[828px]  leading-[1.6] mt-12 ">
              <h3>{movieInfo?.overview}</h3>
            </div>
          </motion.div>
          <MoviePosterInfo
            movieInfo={movieInfo}
            netflix={netflix}
            listIsLoading={listIsLoading}
            addToWatchListsHandler={addToWatchListsHandler}
            isMovieWatchlisted={isMovieWatchlisted}
            whatchList={whatchList}
          />
        </div>

        <div className=" items-center block select-none mt-6 movie-info-list ">
          {profilePathFilter?.length !== 0 && (
            <SwiperSmall profilePathFilter={profilePathFilter} />
          )}
          <div className="mt-10" ref={ref}>
            {data?.results?.length === 0 || isLoadingRecommended ? (
              ""
            ) : (
              <SwiperMed movieInfo={recommended} title={"Recommended"} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MovieInfoList;
