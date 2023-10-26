import React,{useState} from 'react';
import { motion } from 'framer-motion';
import { FaBookmark } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { MdAdd, MdCheck } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const SeriePosterInfo = ({  movieInfo,addToWatchListsHandler,isMovieWatchlisted,whatchList,listIsLoading}) => {
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
  const sessionId = localStorage.getItem("session_id");
  const accountId = localStorage.getItem("accountId");

  const navigateLogin = useNavigate();

  const [titleHover, setTitleHover] = useState(false);


    return (
        <motion.div className="w-full aspect-[9/13.5]  relative  img-cover  sm:max-w-[440px] z-[0] max-w-[400px] mb-8  self-center max-h-[660px]  md:self-start overflow-hidden rounded-md   custom-shadow-img flex-[1] ">
        <motion.img
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 1 }}
          className="object-cover w-full  "
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
                    animate={
                      titleHover ? hoverEfects.show : hoverEfects.hidden
                    }
                    className="text-gray-200 w-max text-[14.5px] h-auto absolute left-[42px] p-[6px]  rounded-[5px] top-[4px] bg-[rgba(197,67,67,0.91)] backdrop-blur-[1.5px] pointer-events-none "
                  >
                    Can't add more than 20 Tv series
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
                    animate={
                      titleHover ? hoverEfects.show : hoverEfects.hidden
                    }
                    className="text-gray-300 rounded-[5px] w-max text-[14.5px] h-auto absolute left-[42px] p-[6px]  top-[4px] bg-[rgba(46,46,46,0.9)] backdrop-blur-[1.5px] pointer-events-none "
                  >
                    In whatchlist
                  </motion.div>
                </>
              </div>
            ) : (
              <div
                onMouseEnter={() => setTitleHover(true)}
                onMouseLeave={() => setTitleHover(false)}
                onClick={
                  sessionId === null && accountId === null
                    ? () => navigateLogin("/login-or-signUp")
                    : addToWatchListsHandler
                }
                className=" group absolute top-0 cursor-pointer w-[34px]  backdrop-blur-[1.5px] hover:backdrop-blur-[1.7px]"
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
                    animate={
                      titleHover ? hoverEfects.show : hoverEfects.hidden
                    }
                    className="text-gray-300 w-max text-[14.5px] h-auto absolute left-[42px] p-[6px]  rounded-[5px] top-[4px] bg-[rgba(46,46,46,0.9)] backdrop-blur-[1.5px] pointer-events-none "
                  >
                    Add to whatchlist
                  </motion.div>
                </>
              </div>
            )}
          </>
        }

        {movieInfo?.networks?.[0]?.logo_path && (
          <div className="absolute w-full top-auto bottom-0 flex justify-center backdrop-blur-[3px] bg-[rgba(255,255,255,.22)] h-[42px] items-center">
            <div className=" w-[68px] h-[96.5%] object-contain flex justify-center items-center">
              <img
                className="h-[100%] object-contain"
                src={`https://image.tmdb.org/t/p/w500/${movieInfo?.networks[0]?.logo_path}`}
              />
            </div>
          </div>
        )}
      </motion.div>
    );
};

export default SeriePosterInfo;