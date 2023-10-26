 ///this components for search ui

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Movie from "../Movie/Movie";
import { useSelector, useDispatch } from "react-redux";

const MovieList = ({ movies, isFetching, refetch }) => {
  const { searchQuery, searchIsActive } = useSelector(
    (state) => state.currentGenres
  );

  const dispatch = useDispatch();
  const { genresIdOrCategoryName } = useSelector(
    (state) => state.currentGenres
  );

  useEffect(() => {}, []);

  const onlyMovieOrSeries =
    movies?.filter((item) =>
      item?.media_type === "tv" ||
      (item?.media_type === "movie" && item?.poster_path !== null)
        ? item
        : ""
    ) || [];

  return (
    <motion.div
      className="  flex justify-center items-center  flex-col sm-movie-card"
 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.55, duration: 0.55 }}
   
    >
      <AnimatePresence>
        <motion.div
  
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        
          className={`${
            searchIsActive
              ? "dd grid gap-x-8 md:gap-y-12 gap-y-4 w-full justify-center self-center !cursor-default"
              : "!cursor-default self-center dd grid gap-x-8 gap-y-12   "
          }`}
        >
          {onlyMovieOrSeries?.map((item, i) => (
            <Movie key={i} movie={item} index={i} isFetching={isFetching} />
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default MovieList;
