import React, { useEffect, useState } from "react";
import { useGetSearchQuery } from "../../services/tmdbSlice";
import { motion } from "framer-motion";
import Loading from "../Loading/Loading";
import MovieList from "../MovieList/MovieList";
import { useSelector } from "react-redux";


import { useNavigate } from "react-router-dom";

const Search = () => {
  const { searchQuery, searchIsActive } = useSelector(
    (state) => state.currentGenres
  );

  const { data, isFetching, isLoading, isError } = useGetSearchQuery({
    searchQuery: searchQuery,
  });

  const onlyMovieOrSeries =
    data?.results?.filter((item) =>
      item?.media_type === "tv" ||
      (item?.media_type === "movie" && item?.poster_path !== null)
        ? item
        : ""
    ) || [];
  const [searchData, setSearchData] = useState([]);
  const backNavigate = useNavigate();

  useEffect(() => {
    setSearchData(onlyMovieOrSeries);

    if (!searchIsActive && searchQuery === "") {
      backNavigate(-1);
    }
  }, [data]);

  const person = !!data?.results?.filter(
    (item) => item.media_type === "person"
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="xl:p-10 lg:p-9 md:p-7 p-5 main"
      >
        {person &&
        searchData?.length === 0 &&
        searchIsActive &&
        searchQuery.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <div className="w-full sm:text-lg text-base text-primary">
              No results found for "{searchQuery}" 🙄
            </div>
          </motion.div>
        ) : (
          <>
            <div id="movie" className="h-[20px] top-[-55px] relative "></div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            ></motion.div>

            {isFetching ? (
              <Loading color={"text-base-content"} />
            ) : (
              <MovieList movies={searchData} isFetching={isFetching} />
            )}
          </>
        )}
      </motion.section>
    </motion.div>
  );
};

export default Search;
