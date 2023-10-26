import React, { useEffect, useState, useRef } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { cc, media } from "../../features/currentGenres ";
import { BsStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import { clearSelectMovieInfo } from "../../features/currentGenres ";
//icons
import { BsThreeDotsVertical } from "react-icons/bs";

import MovieAddList from "./MovieAddList";
//
const Movie = ({ movie, index, isFetching, clearMovie }) => {
  const dispatch = useDispatch();
 
  const [pointerNone, setPointerNone] = useState(true);
  const [loadImg, setLoadImg] = useState(false);
  const ref = useRef(null);

  const accountId = localStorage.getItem("accountId");
  const sessionId = localStorage.getItem("session_id");


  // Define animation properties
  const cardMotion = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,

      transition: {
        delay: 0.1,
        duration: 0.5,
      },
    },
  };

  const movieRate = () => {
    if (movie?.["vote_average"] <= 4) {
      return "text-red-800";
    } else if (movie?.["vote_average"] <= 7) {
      return "text-orange-500 ";
    } else {
      return "  text-yellow-400";
    }
  };

  const setMovieHandler = () => {
    dispatch(media(movie?.media_type));
    dispatch(cc());

    dispatch(clearSelectMovieInfo());
  };

  const [dropClose, setDropClose] = useState(false);


  useEffect(() => {
    // Close dropdown when clicking outside
    let handler = (e) => {
      if (!ref?.current?.contains(e.target)) {
        setDropClose(false);
      }
    };

    document.addEventListener("mousedown", handler);
   
    setTimeout(() => setPointerNone(false), 920);
  }, [loadImg]);

  return (
    <AnimatePresence exit={{ opacity: 0 }}>
      <motion.div
        className={` w-full ${!movie?.title && !movie?.name && "hidden"} `}
        variants={cardMotion}
        initial={cardMotion.hidden}
        whileInView={cardMotion.show}
        viewport={{ once: true }}
        exit={cardMotion.hidden}
      >
        <div
          className={`${
            !dropClose && "movie-card "
          } card duration-200 transition-all relative  overflow-hidden h-full `}
        >
          <Link
            role="link"
            onClick={setMovieHandler}
            style={{pointerEvents: !pointerNone ? '' : 'none'}}
            to={`/movies/${movie?.media_type}/${movie?.id}`}
            className={`overflow-hidden max-h-[372.2px] z-50 active active:opacity-[0.6] w-full skeleton rounded-[4px]  `}
          >
            <motion.img
              onLoad={() => setLoadImg(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.92, duration: 0.9 }}
              className={` ${!loadImg && "skeleton "} ${
                dropClose &&
                "blur-[6px] !opacity-[0.9] transition-all duration-200 "
              } !cursor-pointer  z-[60] w-full object-cover h-full  text-transparent  rounded-[4px]  `}
              alt={`${movie?.["poster_path"]}`}
              src={`https://image.tmdb.org/t/p/w500${movie?.["poster_path"]}`}
            />
          </Link>
          {dropClose && (
            <div className="absolute transition-all h-full  !cursor-pointer rounded-[4px] overflow-hidden z-[61] top-[0] w-full object-cover  text-transparent  bg-transparent  "></div>
          )}

          <div ref={ref} className="flex w-full">
            {sessionId === null && accountId === null ? (
              ""
            ) : (
              <>
                <button
                  onClick={() => setDropClose(!dropClose)}
                  className=" transition-all duration-200 flex justify-center items-center  text-slate-100 absolute z-[62] sm:w-7 w-6 sm:h-7 h-6 top-0 text-lg rounded-full right-0 bg-[rgba(44,44,44,0.63)] hover:bg-[rgba(48,47,47,0.84)] active:scale-90  mt-1 mr-1"
                >
                  <BsThreeDotsVertical className="sm:text-[18px] text-[16px]" />
                </button>

                {dropClose && (
               <MovieAddList movie={movie}/>
                )}
              </>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="  text-card flex flex-col relative top-auto bottom-0 p-2 max-h-[114px] h-[114px] w-full   sm:text-base text-sm  shadow-sm "
          >
            <h3 className=" text-elips-costum text-primary mb-[6px] text-left font-semibold">
              {movie?.title || movie?.name}
            </h3>
            <div className="flex justify-between items-center mt-2">
              {movie?.["release_date"]?.slice(0, 4) ||
                movie?.["first_air_date"]?.slice(0, 4)}

              <div className="absolute right-[10px] flex items-center gap-[6px] ">
                {movie?.["vote_average"] === 0 ||
                movie?.["vote_average"] === undefined ? (
                  "No info"
                ) : (
                  <>
                    <p className="">
                      {movie?.["vote_average"].toFixed(1) || ""}
                    </p>
                    <BsStarFill className={`w-[14px] ${movieRate() || ""}`} />
                  </>
                )}

                {/* <h3>{movie?.media_type}</h3> */}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Movie;
