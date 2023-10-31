import React, { useEffect, useState } from "react";
import { useGetAllGenresQuery } from "../../services/tmdbSlice";
import MovieList from "../MovieList/MovieList";
import { motion } from "framer-motion";

import Loading from "../Loading/Loading";
import { useSelector } from "react-redux";

import Search from "../Search/Search";


import Pagination from "../module/Pagination";
const MoviesGenres = () => {
 
  

  const {
    genresIdOrCategoryName,
    searchIsActive,
    searchQuery,
    genresName,
    page,
  } = useSelector((state) => state.currentGenres);

  const { data, isFetching} =
    useGetAllGenresQuery({
      page: page,
      genresIdOrCategoryName: genresIdOrCategoryName,
    });

  const [popularData, setPopularData] = useState([]);

  const newData = data?.results?.map((item) => {
    let isMovieOrTv = {
      ...(item.title ? { media_type: "movie" } : { media_type: "tv" }),
    };
    return { ...item, ...isMovieOrTv };
  });

  const newDataFilter = newData?.filter((item) =>
    item?.poster_path === null ? "" : item
  );

  useEffect(() => {
    setPopularData(newDataFilter);
  }, [data]);




  if (searchQuery.length > 0 && searchIsActive) return <Search />;
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
          <h1 className="block text-primary sm:text-3xl text-[22px]   pb-10 ">
            {genresName}
          </h1>
        
        </motion.div>

        {isFetching || popularData?.length === 0 ? (
          <Loading color={"text-error"} />
        ) : (
          <motion.div exit={{ opacity: 0 }}>
           

            <MovieList movies={popularData} isFetching={isFetching} />

            <Pagination page={page} DataMovies={setPopularData} />
          </motion.div>
        )}
      </motion.section>
    </div>
  );
};

export default MoviesGenres;

