import React,{useState,useRef} from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import Movie from '../Movie/Movie';
import MovieCardContainer from './MovieCardContainer';

const WhatchList = ({tv,newWhatchList,refetchWhatchList,refetchWhatchListTv,mediaType}) => {
    const dispatch = useDispatch();
    const moviesLength = newWhatchList?.length;
    const tvsLength = tv?.length;
    const moviesAndTvs = newWhatchList?.length + tv?.length;
    const whatchlistFillter = [
        {
          value: "all",
          label: "All",
          length: moviesAndTvs,
        },
        {
          value: "movies",
          label: "Movies",
          length: moviesLength,
        },
        {
          value: "tv series",
          label: "Tv series",
          length: tvsLength,
        },
      ];
      const ref = useRef();
      let medias = mediaType === "movie" ? "movies" : "tv";
      const filterHandler = (e, value) => {
        setActiveFilterBar({
          offsetWidth: e.target.offsetWidth,
          offsetLeft: e.target.offsetLeft,
        });
        setWhatchlistOrFavorite(value);
      };
    
      const refreshWhatchList = () => {
        refetchWhatchList();
        refetchWhatchListTv();
      };


      const [activeFilterBar, setActiveFilterBar] = useState("");
  const [whatchlistOrFavorite, setWhatchlistOrFavorite] = useState("all");
  const [selected, setSelectedIndex] = useState("all");
    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="w-full h-full  flex justify-center items-center  "
      >
        <div className="xl:p-10 lg:p-9 md:p-7 p-5 main w-full text-left">
          <h3 className="block text-primary sm:text-3xl text-[22px]    pb-10">
            WhatchList
          </h3>

          {tv?.length === 0 && newWhatchList?.length === 0 ? (
            <div>
              <div className="font-semibold text-xl">
                You haven't added any movies or tv series to your
                watchlist.
              </div>
            </div>
          ) : (
            <>
              <div
                ref={ref}
                className="flex w-full justify-start items-center  relative  sm:gap-x-4 gap-x-3 text-[20px] font-semibold "
              >
                {whatchlistFillter.map((item) => (
                  <button
                    key={item.value}
                    onClick={(e) => filterHandler(e, item.value)}
                    value={item.value}
                    className={`${
                      item.value === whatchlistOrFavorite
                        ? "text-primary brightness-[0.95]"
                        : ""
                    }  p-1 flex cursor-pointer items-center sm:min-w-[83px] min-w-[70px] justify-center sm:text-lg text-base `}
                  >
                    {" "}
                    {item.label}
                    <p
                      key={item.label}
                      className="pointer-events-none ml-[4px] sm:text-lg text-sm mt-[2px]"
                    >
                      ( {item.length} )
                    </p>
                  </button>
                ))}

                <div
                  style={{
                    left: activeFilterBar.offsetLeft,
                    width: activeFilterBar.offsetWidth,
                  }}
                  className={`sm:min-w-[83px] min-w-[70px] absolute  transition-all duration-300 left-[0] h-[2px] bg-[#de3c3c] bottom-0 `}
                ></div>
              </div>
              <div className="w-full justify-end flex  h-6 my-4">
                <button
                  className="w-fit mb-7 link  link-hover sm:text-base text-sm  text-error"
                  onClick={refreshWhatchList}
                >
                  Refresh
                </button>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="items-center sm-movie-card  flex"
              >
               <MovieCardContainer>

               
                  {whatchlistOrFavorite === "all" && (
                    <>
                      {newWhatchList?.map((item) => (
                        <Movie movie={item} key={item?.id} />
                      ))}

                      {tv?.map((item) => (
                        <Movie movie={item} key={item?.id} />
                      ))}
                    </>
                  )}

                  {whatchlistOrFavorite === "tv series" && (
                    <>
                      {tv?.length === 0 ? (
                        <div className="font-semibold text-xl">
                          You haven't added any tv series to your
                          watchlist.
                        </div>
                      ) : (
                        tv?.map((item) => (
                          <Movie movie={item} key={item?.id} />
                        ))
                      )}
                    </>
                  )}
                  {whatchlistOrFavorite === "movies" && (
                    <>
                      {newWhatchList?.length === 0 ? (
                        <div className="font-semibold text-xl">
                          You haven't added any movies to your watchlist
                        </div>
                      ) : (
                        newWhatchList?.map((item) => (
                          <Movie movie={item} key={item?.id} />
                        ))
                      )}
                    </>
                  )}
             </MovieCardContainer>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    );
};

export default WhatchList;