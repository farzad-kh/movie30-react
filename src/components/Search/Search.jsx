import React, { useEffect, useState } from "react";
import { useGetSearchQuery } from "../../services/tmdbSlice";
import { motion } from "framer-motion";
import Loading from "../Loading/LoadingInfo";
import MovieList from "../MovieList/MovieList";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

const Search = () => {
  const { searchQuery, searchIsActive } = useSelector(
    (state) => state.currentGenres
  );

  const { data, isFetching, isLoading } = useGetSearchQuery({
    searchQuery: searchQuery,
  });

  const onlyMovieOrSeries =
    data?.results?.filter(
      (item) =>
        (item?.media_type === "tv" || item?.media_type === "movie") &&
        item?.poster_path !== null &&
        item.media_type !== "person"
    ) || [];

  const [searchData, setSearchData] = useState([]);
  const backNavigate = useNavigate();

  useEffect(() => {
    setSearchData(onlyMovieOrSeries);

    if (!searchIsActive && searchQuery === "") {
      backNavigate(-1);
    }
    // const timeout = setTimeout(() => {
    //   if (searchData.length === 0 && searchIsActive && searchQuery.length > 0) {
    //     setNotFound(true);
    //   }
    // }, 2000);

    // return () => clearTimeout(timeout);
  }, [data]);
  console.log(isLoading, isFetching, searchData.length);


 



  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="xl:p-10 lg:p-9 md:p-7 p-5 main"
      >
        {searchData?.length === 0 &&
        searchIsActive &&
        !isFetching &&
        searchQuery.length > 0 ? (
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          >
            <div className="w-full sm:text-lg text-base text-primary">
              {` No results found for ${searchQuery} 🙄`}
            </div>
          </motion.div>
        ) : (
          <>
            <div id="movie" className="h-[20px] top-[-55px] relative "></div>

            {isFetching || isLoading ? (
              <Loading color={"text-base-content"} label={"Searching..."} />
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
