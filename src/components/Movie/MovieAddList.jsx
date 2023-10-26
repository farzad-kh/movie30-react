import React, { useContext, useEffect } from "react";
import { motion,AnimatePresence } from "framer-motion";
import { useGetListQuery } from "../../services/tmdbSlice";
import { FavoriteOrWhatchConext } from "../../context/FavoriteOrWhatchConextProvider";
import { FaBookmark } from "react-icons/fa";
import { AiTwotoneHeart } from "react-icons/ai";
const MovieAddList = ({ movie }) => {
  const accountId = localStorage.getItem("accountId");
  const sessionId = localStorage.getItem("session_id");

  const {
    data: whatchList,
    isFetching: listIsLoading,
    refetch: refetchWhatchList,
  } = useGetListQuery({
    accountId: accountId,
    listName: "watchlist",
    media: movie?.media_type === "movie" ? "movies" : "tv",
    sessionId: sessionId,
    page: 1,
  });

  const {
    data: favorites,
    isFetching: FavoritesLoading,
    refetch: refetchFavorite,
  } = useGetListQuery({
    accountId: accountId,
    listName: "favorite",
    media: movie?.media_type === "movie" ? "movies" : "tv",
    sessionId: sessionId,
    page: 1,
  });

  // Fetch users watchlist and favorite list for the movie
  const addToWatchListsHandler = async () => {
    setIsMovieWatchlisted(whatchListTrueOrFalse);

    await addToWatchLists(
      sessionId,
      movie?.media_type,
      movie?.id,
      accountId,
      whatchListTrueOrFalse
    );
    refetchWhatchList();
  };

  const addToFavoritesHandler = async () => {
    setIsMovieFavorited(favoriteTrueOrFalse);

    await addToFavorites(
      sessionId,
      movie?.media_type,
      movie?.id,
      accountId,
      favoriteTrueOrFalse
    );
    refetchFavorite();
  };

  const whatchListTrueOrFalse = !!whatchList?.results?.find(
    (item) => item.id === movie?.id
  );

  const favoriteTrueOrFalse = !!favorites?.results?.find(
    (item) => item.id === movie?.id
  );
  const {
    addToFavorites,
    setIsMovieFavorited,
    setIsMovieWatchlisted,
    addToWatchLists,
  } = useContext(FavoriteOrWhatchConext);

  useEffect(() => {}, [whatchList, favorites]);

  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.8,
        type: "spring",
        bounce: 0.25,
        delay: 0.1,
      }}
      // bg-[#41474c]
      className="  absolute flex justify-center w-full p-0 ali  items-center z-[63] menu menu-sm dropdown-content top-[10%]  gap-y-1      "
    >
      <div className="sm:w-[88%] w-full text-slate-100 gb flex flex-col gap-y-2  py-[10px]  sm:rounded rounded-none  ">
        {whatchList?.results?.length >= 20 &&
        !whatchListTrueOrFalse &&
        movie?.media_type === "movie" ? (
          <li className="  flex w-full flex-row   ">
            <div className="hover:bg-[#a93f3fde] flex relative py-2 w-full  px-2 rounded-none  hover:text-[#e9eaeb] ">
              <a className="w-full p-0 text-[13.5px] ">
                Cant add more then 20 movies
              </a>
            </div>
          </li>
        ) : whatchList?.results?.length >= 20 &&
          !whatchListTrueOrFalse &&
          movie?.media_type === "tv" ? (
          <>
            <li className="  flex w-full flex-row   ">
              <div className="hover:bg-[#a93f3fde] flex relative py-2 w-full  px-2 rounded-none  hover:text-[#e9eaeb]">
                <a className="w-full p-0 text-[13.5px] ">Cant add more then 20 tv</a>
              </div>
            </li>
            <div></div>
          </>
        ) : (
          <li
            className="flex relative w-full flex-row"
            onClick={addToWatchListsHandler}
          >
            <div className="flex w-full  py-2 px-2 rounded-none hover:bg-[#6b686859] hover:text-[#c5dbed]">
              <AnimatePresence>
                <motion.div
                  className=""
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  exit={{ opacity: 0 }}
                >
                  {listIsLoading ? (
                    <span
                      className={`top-[0] right-auto left-[0] ml-[5px] mr-[5px] loader flex items-center  `}
                    ></span>
                  ) : (
                    <FaBookmark
                      className={` w-[15px] h-[15px] relative ${
                        whatchListTrueOrFalse
                          ? "text-[#cd5065]"
                          : "text-slate-50"
                      } `}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
              <a className="w-full p-0 ">
                {" "}
                {whatchListTrueOrFalse ? "In Whatchlist" : "Add to Whatchlist"}
              </a>
            </div>
          </li>
        )}
        <div className="w-[90%] m-auto h-[1px] bg-[#6e7578]"></div>
        {favorites?.results?.length >= 20 &&
        !favoriteTrueOrFalse &&
        movie?.media_type === "movie" ? (
          <li className="  flex w-full flex-row   ">
            <div className="hover:bg-[#a93f3fde] flex relative w-full py-2  px-2  rounded-none  hover:text-[#e9eaeb] ">
              <a className="w-full p-0 text-[13.5px] ">
                Cant add more then 20 movies
              </a>
            </div>
          </li>
        ) : favorites?.results?.length >= 20 &&
          !favoriteTrueOrFalse &&
          movie?.media_type === "tv" ? (
          <li className="  flex w-full flex-row   ">
            <div className="hover:bg-[#a93f3fde] w-full flex relative py-2  px-2  rounded-none ">
              <a className="w-full p-0 text-[13.5px] ">Cant add more then 20 tv</a>
            </div>
          </li>
        ) : (
          <li
            className="flex relative w-full flex-row"
            onClick={addToFavoritesHandler}
          >
            <div className="flex w-full py-2 px-3  rounded-none hover:bg-[#6b686859] hover:text-[#c5dbed]">
              <AnimatePresence>
                <motion.div
                  className=""
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  exit={{ opacity: 0 }}
                >
                  {FavoritesLoading ? (
                    <span
                      className={`top-[0] right-auto left-[0] ml-[5px] mr-[5px] loader flex items-center  `}
                    ></span>
                  ) : (
                    <AiTwotoneHeart
                      className={`w-[15px] h-[15px] relative ${
                        favoriteTrueOrFalse ? "text-[#b91c1c]" : "text-slate-50"
                      } `}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
              <a className="w-full p-0 ">
                {favoriteTrueOrFalse ? "In Favorits" : "Add to Favorits"}
              </a>
            </div>
          </li>
        )}
      </div>
    </motion.ul>
  );
};

export default MovieAddList;
