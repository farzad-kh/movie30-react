import React, { useEffect, useState, useRef } from "react";
import {
  useGetPopularQuery,
  useGetTvPopularQuery,
  useGetTopRatedQuery,
} from "../services/tmdbSlice";
import MovieList from "./MovieList/MovieList";
import Search from "./Search/Search";
import { motion, useInView } from "framer-motion";
import { useSelector } from "react-redux";

import Loading from "./Loading/Loading";
import SwiperMed from "../components/Swiper/SwiperMed";
// Import Swiper React components

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import logo from "../asset/images/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg";
console.log(logo);

import SwiperLarg from "./Swiper/SwiperLarg";
import LoadingRow from "./Loading/LoadingRow";
const Home = () => {
  const { data, isFetching, isLoading, isError } = useGetPopularQuery(1);
  const { data: topRatedData, isFetching: topRatedIsFetch } =
    useGetTopRatedQuery(1);
  const { data: tvSeriesData, isFetching: tvSeriesIsFetch } =
    useGetTvPopularQuery({
      page: 1,
      media_type: "tv",
    });

  const { searchIsActive, searchQuery } = useSelector(
    (state) => state.currentGenres
  );


  const [topRated, setTopRated] = useState([]);

  const newData = data?.results?.map((item) => {
    let isMovieOrTv = {
      ...(item.title ? { media_type: "movie" } : { media_type: "tv" }),
    };
    return { ...item, ...isMovieOrTv };
  });
  const newDataTv = tvSeriesData?.results?.map((item) => {
    let isMovieOrTv = {
      ...(item.title ? { media_type: "movie" } : { media_type: "tv" }),
    };
    return { ...item, ...isMovieOrTv };
  });
  const newDataTopRated = topRatedData?.results?.map((item) => {
    let isMovieOrTv = {
      ...(item.title ? { media_type: "movie" } : { media_type: "tv" }),
    };
    return { ...item, ...isMovieOrTv };
  });

  const tvSeriesRef = useRef(null);
  const topRatedRef = useRef(null);
  const isInViewTvSeries = useInView(tvSeriesRef, { once: true });
  const isInViewTopRated = useInView(topRatedRef, { once: true });

  useEffect(() => {
  

  

    if (isInViewTopRated) {
      setTimeout(() => setTopRated(newDataTopRated), 500);
    }
  }, [data, tvSeriesData, topRatedData, isInViewTopRated]);

  if (searchQuery.length > 0 && searchIsActive) return <Search />;
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="xl:px-10  lg:px-9 md:px-7 px-5 py-6 main w-full justify-center  md:min-h-[260vh] sm:min-h-[192vh]  "
    >
      {isFetching || topRatedIsFetch || tvSeriesIsFetch ? (
        <Loading />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.55 }}
          className=" items-center flex-col w-full gap-y-4 flex"
        >
          <div className="w-full xl:max-w-[1280px]  lex justify-center mb-8">
            <SwiperLarg moviesOrseries={newData?.slice(0, 10)} />
          </div>

          <div className="w-full  justify-center mb-4">
            <SwiperMed
              title={"Popular"}
              showMore={"/movies/genres"}
              movieInfo={newData?.slice(10, 20)}
            />
          </div>
          <div className="w-full  justify-center mb-4   ">
            {newDataTv?.length === 0 ? (
              <LoadingRow />
            ) : (
              <SwiperMed
                title={"Tv series"}
                showMore={"/tvseries"}
                movieInfo={newDataTv?.slice(0, 10)}
              />
            )}
          </div>
          <div className="w-full  justify-center mb-4 ">
            {topRated?.length === 0 ? (
              <LoadingRow />
            ) : (
              <SwiperMed
                title={"Top rated"}
                showMore={"/toprated"}
                movieInfo={topRated?.slice(0, 10)}
              />
            )}
          </div>
        </motion.div>
      )}

      <div ref={topRatedRef} className="mt-4"></div>
    </motion.section>
  );
};

export default Home;
