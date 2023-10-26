import React,{useState} from "react";

import { motion } from "framer-motion";
import { useGetListQuery } from "../../services/tmdbSlice";
import { FaBookmark } from "react-icons/fa";
import { MdAdd, MdCheck } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AiOutlineInfoCircle } from "react-icons/ai";

const MoviePosterInfo = ({ movieInfo, netflix, addToWatchListsHandler,isMovieWatchlisted ,listIsLoading,whatchList  }) => {
  const sessionId = localStorage.getItem("session_id");
  const accountId = localStorage.getItem("accountId");

 

  const [titleHover, setTitleHover] = useState(false);

  const hoverEfects = {
    hidden: {
      opacity: 0,
      transition: {
        opacity: {
          duration: 0.3,
        },
      },

      y: -10,
    },

    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const navigateLogin = useNavigate();

  return (
    <motion.div className="w-full aspect-[9/13.5]  relative  img-cover  sm:max-w-[440px] z-[0] max-w-[400px] mb-8  self-center max-h-[660px]  md:self-start overflow-hidden rounded-md   custom-shadow-img flex-[1] ">
    <motion.img
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 1.2, duration: 1 }}
      className="object-cover w-full"
      src={`https://image.tmdb.org/t/p/original${movieInfo?.["poster_path"]}`}
    />

    {
      <>
        {whatchList?.results?.length >= 20 && !isMovieWatchlisted ? (
          <div
            onMouseEnter={() => setTitleHover(true)}
            onMouseLeave={() => setTitleHover(false)}
            className=" group absolute top-0 cursor-pointer w-[34px]  backdrop-blur-[1.5px] hover:backdrop-blur-[1.7px]"
          >
            <>
              <FaBookmark className="  pointer-events-none relative top-[-1px] right-auto left-[-7px] text-[3rem] fill-[rgba(54,54,54,0.8)] group-hover:brightness-[1.3] "></FaBookmark>
              {listIsLoading ? (
                <span
                  className={`absolute top-[15px] right-auto left-[15px] loader `}
                ></span>
              ) : (
                <AiOutlineInfoCircle className="absolute text-[1.5rem] text-slate-200 top-[5px] right-auto left-[5px] pointer-events-none" />
              )}
              <motion.div
                variants={hoverEfects}
                animate={titleHover ? hoverEfects.show : hoverEfects.hidden}
                className="sm:[14.5px] text-[14px] text-gray-200 w-max  h-auto absolute left-[42px] p-[6px]  rounded-[5px] top-[4px] bg-[rgba(197,67,67,0.91)] backdrop-blur-[1.5px] pointer-events-none "
              >
                Can't add more than 20 movie
              </motion.div>
            </>
          </div>
        ) : isMovieWatchlisted ? (
          <div
            onMouseEnter={() => setTitleHover(true)}
            onMouseLeave={() => setTitleHover(false)}
            onClick={addToWatchListsHandler}
            className=" group absolute top-0 cursor-pointer w-[34px]    backdrop-blur-[1.5px] hover:backdrop-blur-[1.7px]"
          >
            <>
              <FaBookmark className=" pointer-events-none relative top-[-1px] right-auto left-[-7px] text-[3rem] fill-[#cd5065] group-hover:brightness-[1.1]"></FaBookmark>
              {listIsLoading ? (
                <span
                  className={`absolute top-[15px] right-auto left-[15px] loader `}
                ></span>
              ) : (
                <MdCheck className="absolute text-[1.7rem] text-slate-50 top-[5px] right-auto left-[4px] pointer-events-none" />
              )}

              <motion.div
                variants={hoverEfects}
                animate={titleHover ? hoverEfects.show : hoverEfects.hidden}
                className="text-gray-300 rounded-[5px] w-max sm:[14.5px] text-[14px] sm:text-base text-sm h-auto absolute left-[42px] p-[6px]  top-[4px] bg-[rgba(46,46,46,0.9)] backdrop-blur-[1.5px] pointer-events-none "
              >
                In Whatchlist
              </motion.div>
            </>
          </div>
        ) : (
          <div
            onMouseEnter={() => setTitleHover(true)}
            onMouseLeave={() => setTitleHover(false)}
            onClick={
              sessionId === null && accountId === null
                ? () => navigateLogin("/login-or-signup")
                : addToWatchListsHandler
            }
            className=" sm:text-base text-sm group absolute top-0 cursor-pointer w-[34px]  backdrop-blur-[1.5px] hover:backdrop-blur-[1.7px]"
          >
            <>
              <FaBookmark className="  pointer-events-none relative top-[-1px] right-auto left-[-7px] text-[3rem] fill-[rgba(54,54,54,0.8)] group-hover:brightness-[1.3] "></FaBookmark>
              {listIsLoading ? (
                <span
                  className={`absolute top-[15px] right-auto left-[15px] loader `}
                ></span>
              ) : (
                <MdAdd className="absolute text-[1.7rem] text-slate-50 top-[5px] right-auto left-[4px] pointer-events-none" />
              )}
              <motion.div
                variants={hoverEfects}
                animate={titleHover ? hoverEfects.show : hoverEfects.hidden}
                className="sm:[14.5px] text-[14px] text-gray-300 w-max  h-auto absolute left-[42px] p-[6px]  rounded-[5px] top-[4px] bg-[rgba(46,46,46,0.9)] backdrop-blur-[1.5px] pointer-events-none "
              >
                Add to Whatchlist
              </motion.div>
            </>
          </div>
        )}
      </>
    }

    {netflix?.note && (
      <div className="absolute w-full top-auto bottom-0 flex justify-center backdrop-blur-[4px] bg-[rgba(255,255,255,.22)] h-[38px] items-center">
        <div className=" w-[68px] h-[100%] object-contain">
          <svg
            viewBox="0 0 111 30"
            data-uia="netflix-logo"
            className="svg-icon svg-icon-netflix-logo relative fill-[#e50914] w-[68px] h-full object-contain"
            aria-hidden="true"
            focusable="false"
          >
            <g id="netflix-logo">
              <path
                d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"
                id="Fill-14"
              ></path>
            </g>
          </svg>
        </div>
      </div>
    )}
  </motion.div>
  );
};

export default MoviePosterInfo;
