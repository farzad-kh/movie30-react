// import React from 'react';
// import Movie from '../Movie/Movie';
// import { motion } from 'framer-motion';

// import 'swiper/css';
// import 'swiper/css/free-mode';
// import 'swiper/css/pagination';
// import { FreeMode, Pagination, Navigation } from 'swiper/modules';

// import { Swiper, SwiperSlide } from 'swiper/react';
// const SwiperMed = ({ movieInfo,title}) => {
//   return (
//     <motion.div

//       initial={{ opacity: 0 }}
//      whileInView={{ opacity: 1 }}
//      viewport={{once:true}}
//       transition={{ delay: 0.5, duration: 0.5 }}
//       className='flex flex-col '>

//       <div className='flex   md:pr-6 pr-3  py-6  w-full   flex-col  overflow-hidden  '>
//         <h3 className='sm:text-3xl text-[26px] font-semibold text-primary my-5 '>{title}</h3>

//         <Swiper
//           slidesPerView={1.4}
//           spaceBetween={20}
//           freeMode={true}

//           modules={[Pagination, FreeMode]}
//           className="mySwiper "
//           breakpoints={{

//             1500: {
//               slidesPerView: 5.3,
//           },
//           1300: {
//               slidesPerView: 4.3,
//           },
//           1024: {
//               slidesPerView: 4.3,
//           },
//           900: {
//               slidesPerView: 3.3,
//           },

//           680: {
//               slidesPerView: 3.3,
//           },
//           500: {
//               slidesPerView: 2.3,
//           },

//           440: {
//               slidesPerView: 1.5,
//           }

//           }}
//         >

//           {movieInfo?.map(item =>

//             <SwiperSlide className='bg-base-100  '>

//               <Movie movie={item}  >

//               </Movie>
//             </SwiperSlide>

//           )}

//         </Swiper>

//       </div>
//     </motion.div>
//   );
// };

// export default SwiperMed;

import React from "react";
import Movie from "../Movie/Movie";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination, Navigation } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import LoadingRow from "../Loading/LoadingRow";
const SwiperMed = ({ movieInfo, title, showMore }) => {
  // if (movieInfo.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="flex flex-col "
    >
      <div className=" sm:px-6 px-0  sm:py-6 py-3 w-full  flex overflow-hidden flex-col  ">
        <div className="flex flex-row items-center justify-between sm:my-5 my-3">
          {title && (
            <h3 className="sm:text-3xl text-[22px] font-semibold text-primary  ">
              {title}
            </h3>
          )}

          {showMore && (
            <Link
              className="normal-case btn btn-ghost  sm:min-h-[41px] min-h-[37px] sm:h-[41px] h-[37px]  sm:!px-[10px] !p-2 "
              to={showMore}
            >
              Show more
            </Link>
          )}
        </div>

        {movieInfo?.length == 0 ? (
          <LoadingRow />
        ) : (
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            slidesPerGroup={1}
            navigation={true}
            speed={320}
            allowTouchMove={true}
            modules={[Pagination, Navigation]}
            className="mySwiper swiper-md-md  "
            breakpoints={{
              1500: {
                slidesPerView: 5.3,
                slidesPerGroup: 5,
              },
              1300: {
                slidesPerView: 4.3,
                slidesPerGroup: 4,
              },
              1024: {
                slidesPerView: 4.3,
                slidesPerGroup: 4,
              },
              900: {
                slidesPerView: 3.3,
                slidesPerGroup: 3,
              },

              680: {
                slidesPerView: 3.3,
                slidesPerGroup: 3,
              },
              500: {
                slidesPerView: 3.3,
                slidesPerGroup: 2,
              },

              350: {
                slidesPerView: 2,
                slidesPerGroup: 2,
              },
            }}
          >
            {movieInfo?.map((item) => (
              <SwiperSlide key={item?.id} className="bg-base-100  ">
                <Movie movie={item} ></Movie>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </motion.div>
  );
};

export default SwiperMed;

