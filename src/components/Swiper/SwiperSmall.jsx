import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FreeMode} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";



const SwiperSmall = ({ profilePathFilter }) => {
  const [more, setMore] = useState(9);

  const limitCasts = profilePathFilter?.slice(0, 40);
  const [casts, setCasts] = useState(profilePathFilter?.slice(0, more));

  useEffect(() => {
    setCasts(profilePathFilter?.slice(0, more));
  }, [more, profilePathFilter]);

  const addMore = () => {
    if (limitCasts?.length <= more) {
      null;
    } else {
      setMore(more + 8);

      // setA(width - offset)
    }
  };

  return (
    <div className="pt-3">
      <h3 className="  sm:text-3xl text-[22px] font-semibold text-primary my-5">
        Top Casts
      </h3>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className=" sm:px-6 px-0  py-6 w-full  flex overflow-hidden flex-col  "
      >
        <Swiper
          slidesPerView={2.5}
          spaceBetween={18}
          freeMode={true}
          breakpoints={{
            1500: {
              slidesPerView: 8.5,
            },
            1300: {
              slidesPerView: 6.5,
            },
            1024: {
              slidesPerView: 7.5,
            },
            900: {
              slidesPerView: 5.5,
            },

            729: {
              slidesPerView: 5.5,
            },
            550: {
              slidesPerView: 4.5,
            },
            470: {
              slidesPerView: 3.5,
            },

            380: {
              slidesPerView: 3.2,
            },
          }}
          modules={[FreeMode]}
          className="mySwiper"
        >
          {casts?.map((item, i) => (
            <SwiperSlide
              key={item?.id}
              className="  select-none flex flex-col bg-base-100   max-h-[350px]  cursor-grab overflow-hidden  text-primary "
            >
              <motion.div className="w-full flex-col flex max-w-[150px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <motion.div className=" skeleton2  aspect-[9/13.5]  rounded-lg overflow-hidden min-h-[94px]  max-h-[179px]">
                  <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.7 }}
                    style={{ objectPosition: "0 0px" }}
                    className="  pointer-events-none object-contain "
                    src={`https://image.tmdb.org/t/p/w500${item?.profile_path}`}
                  />
                </motion.div>
                <div className="sm:min-h-[125px] min-h-[115px] flex">
                  <div className=" my-2 font-semibold md:text-base text-[13.5px] flex flex-col w-full ">
                    <div className=" text-elips-costum text-center ">
                      {item.name}
                    </div>
                    <div className="text-secondary text-elips-costum text-center  !font-normal ">
                      {item?.character}
                    </div>
                  </div>
                </div>

                <div>
                  {
                    <Link
                      to={`/actors/${item?.id}`}
                      className="btn  sm:!h-10 !h-9  sm:min-h-[42px] !min-h-[38px] sm:text-[13.5px] text-[12px] btn-neutral cursor-pointer sm:px-4 px-3   "
                    >
                      Visit Profile
                    </Link>
                  }
                </div>
              </motion.div>
            </SwiperSlide>
          ))}

          {more >= limitCasts?.length ? (
            <SwiperSlide />
          ) : (
            <SwiperSlide className=" flex self-center relative -right-1 bg-transparent !w-[75px] text-secondary hover:text-primary sm:text-lg text-sm p-1 rounded-md overflow-hidden">
              <button onClick={() => addMore()}>Show more</button>
            </SwiperSlide>
          )}
        </Swiper>
      </motion.div>
    </div>
  );
};

export default SwiperSmall;
