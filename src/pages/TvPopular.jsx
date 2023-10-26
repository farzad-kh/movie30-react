import React, { useEffect, useState } from "react";

import { useGetTvPopularQuery } from "../services/tmdbSlice";
import MovieList from "../components/MovieList/MovieList";
import { AnimatePresence, motion } from "framer-motion";
import Search from "../components/Search/Search";
import { increment, decrement } from "../features/currentGenres ";
import Loading from "../components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";

import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";
const TvPopular = () => {
  const dispatch = useDispatch();
  const {
   
    searchIsActive,
    searchQuery,
  
    page,
  } = useSelector((state) => state.currentGenres);
  const { data, isFetching, isLoading, isError } = useGetTvPopularQuery({
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
  const pervPageHandler = (e) => {
    if (page <= 1) {
      null;
    } else {
      dispatch(decrement());
    }
  };
  const nextPageHandler = () => {
    setTvPopular([]);
    dispatch(increment());
  };



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

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5,duration:0.5 }}
            className="join flex justify-center gap-x-5 items-center mt-14  ">
              <a
                href="#movie"
                onClick={pervPageHandler}
                className={`${
                  page <= 1 &&
                  "pointer-events-none opacity-[0.75] shadow-none bg-[#2d3134a3]"
                } h-[45px] min-h-[45px] pl-[5px]  min-w-[86px] shadow-[#182436c7] shadow-sm btn text-base  btn-neutral normal-case px-[12px]  rounded-[5px]`}
              >
                <MdArrowBackIosNew />
                Prev
              </a>
              <div className="text-lg text-primary font-semibold">{page}</div>
              <a
                href="#movie"
                onClick={nextPageHandler}
                className="  btn text-base pr-[5px]  min-w-[86px] font-semibold  h-[45px] min-h-[45px] btn-neutral normal-case px-[12px] shadow-sm shadow-[#182436c7] rounded-[5px]"
              >
                 Next
                <MdArrowForwardIos />
              </a>
            </motion.div>
          </motion.div>
        )}
      </motion.section>
    </div>
  );
};

export default TvPopular;
