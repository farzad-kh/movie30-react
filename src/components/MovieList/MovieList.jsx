import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Movie from "../Movie/Movie";
import { useSelector, useDispatch } from "react-redux";
import MovieCardContainer from "../layout/MovieCardContainer";

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
      className="flex items-center justify-center sm-movie-card"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.55, duration: 0.55 }}
    >
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full"
        >
          <MovieCardContainer  searchIsActive={searchIsActive}>

          {onlyMovieOrSeries?.map((item, i) => (
            <Movie key={i} movie={item} index={i} isFetching={isFetching} />
            ))}
            </MovieCardContainer>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default MovieList;
