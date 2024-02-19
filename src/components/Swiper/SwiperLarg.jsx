import React, { useEffect, useState, useContext } from "react";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { DrawersContext } from "../../context/DrawersContextProvider";
const SwiperLarg = ({ moviesOrseries }) => {
  const { darkMode } = useContext(DrawersContext);
  const [imgLoad, setImgLoad] = useState(false);
  return (
    <>
      <Swiper
        className="  mySwiper w-full rounded-md swiper-md-lg "
        spaceBetween={30}
        centeredSlides={true}
        speed={300}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {moviesOrseries?.map((item, i) => (
          <SwiperSlide key={item.id} className="flex flex-wrap bg-base-100 ">
            <div className={`w-[100%] h-[100%] relative object-cover  `}>
              <img
                onLoad={() => setImgLoad(true)}
                key={item?.["backdrop_path"]}
                className={`${
                  darkMode ? "bga" : ""
                } object-cover  max-h-[640px] rounded relative object-top  ${
                  !imgLoad && "skeleton"
                }`}
                src={`https://image.tmdb.org/t/p/original${item?.["backdrop_path"]}`}
              />
              <div
                className={`${
                  !darkMode &&
                  "bg-[rgba(0,0,0,0.3)] backdrop-blur-[3px] backdrop-brightness-95"
                } max-w-[100%] text-left w-full sm:px-12 px-4 sm:pt-8 pt-3 sm:pb-10 pb-3  overflow-hidden h-fit flex flex-col sm:gap-y-4 gap-y-2  absolute bottom-[0%]  top-auto  `}
              >
                <h3
                  key={item?.title || item?.name}
                  className="sm:text-[26px] text-[14px] leading-normal   text-slate-50  font-semibold  "
                >
                  {item?.title || item?.name} {item?.release_date?.slice(0, 4)}
                </h3>
                <div className="flex justify-between">
                  <div
                    key={item?.overview}
                    className="max-w-[60%] sm:text-base text-[13.5px] w-full text-[#e2e8ef] mr-6  text-elips-costum2  overflow-hidden"
                  >
                    {item?.overview}
                  </div>
                  <Link
                    key={i}
                    to={`/movies/${item?.media_type}/${item?.id}`}
                    className=" btn-ghost bg-[rgba(57,109,154,0.3)] backdrop-blur-md self-end  sm:!w-[109px] !w-[78px] sm:h-[48px] h-[36px]  sm:min-h-[48px] min-h-[36px]  overflow-hidden px-3 btn btn-neutral  sm:text-base text-xs normal-case  text-slate-50"
                  >
                    More
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SwiperLarg;
