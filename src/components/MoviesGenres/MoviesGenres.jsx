import React, { useEffect, useState } from "react";
import { useGetAllGenresQuery } from "../../services/tmdbSlice";
import MovieList from "../MovieList/MovieList";
import { motion } from "framer-motion";
import "react-loading-skeleton/dist/skeleton.css";
import Loading from "../Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../../features/currentGenres ";
import { decrement } from "../../features/currentGenres ";
import Search from "../Search/Search";
//icons
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";
const MoviesGenres = () => {
 
  const dispatch = useDispatch();

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

  const pervPageHandler = (e) => {
    if (page <= 1) {
     return;
    } else {
      dispatch(decrement());
    }
  };
  const nextPageHandler = () => {
    setPopularData([]);
    dispatch(increment());
  };



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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="join flex justify-center gap-x-5 items-center mt-14  "
            >
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

export default MoviesGenres;

