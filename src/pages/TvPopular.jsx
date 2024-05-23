import React, { useEffect, useState } from "react";

import { useGetTvPopularQuery } from "../services/tmdbSlice";
import MovieList from "../components/MovieList/MovieList";
import { motion } from "framer-motion";
import Search from "../components/Search/Search";
 
import Loading from "../components/Loading/Loading";
import { useSelector } from "react-redux";


import Pagination from "../components/module/Pagination";
const TvPopular = () => {

  const {
   
    searchIsActive,
    searchQuery,
  
    page,
  } = useSelector((state) => state.currentGenres);
  const { data, isFetching } = useGetTvPopularQuery({
    page: page,
    media_type: "tv",
  });

  const newData = data?.results?.map((item) => {
    let isMovieOrTv = {
      ...(item.title ? { media_type: "movie" } : { media_type: "tv" }),
    };
    return { ...item, ...isMovieOrTv };
  });

  const [tvPopular, setTvPopular] = useState([]);

  useEffect(() => {
    setTvPopular(newData);
  }, [data]);


  if (searchQuery?.length > 0 && searchIsActive) return <Search />;

  return (

    <div>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="xl:px-10  lg:px-9 md:px-7 px-5 py-6 main"
      >
        <div id="movie" className="h-[20px] top-[-55px] relative"></div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="block text-primary sm:text-3xl text-[22px]    pb-10 ">Tv series</h1>
        </motion.div>

        {isFetching || tvPopular?.length === 0 ? (
          <Loading color={"text-error"} />
        ) : (
          <motion.div
          
            exit={{ opacity: 0 }}
          >
         

            <MovieList  movies={tvPopular} isFetching={isFetching} />

            <Pagination page={page} DataMovies={setTvPopular} />
          </motion.div>
        )}
      </motion.section>
    </div>
  );
};

export default TvPopular;
