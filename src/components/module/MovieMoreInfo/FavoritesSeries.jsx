// import React, { useContext, useEffect } from 'react';
// import { useGetListQuery } from '../../../services/tmdbSlice';
// import { FavoriteOrWhatchConext } from '../../../context/FavoriteOrWhatchConextProvider';
// import { useNavigate } from 'react-router-dom';
// import { motion ,AnimatePresence } from 'framer-motion';

// import {
//     AiOutlineInfoCircle,
//     AiOutlineHeart,
//     AiTwotoneHeart,
//   } from "react-icons/ai";
  
// const FavoritesSeries = ({serieInfo,darkMode ,media,id,showErr,setShowErr }) => {

//     const sessionId = localStorage.getItem("session_id");
//     const accountId = localStorage.getItem("accountId");
//     const {
//         addToFavorites,
//         isMovieFavorited,
//         setIsMovieFavorited
//       } = useContext(FavoriteOrWhatchConext);
    
//     const {
//         data: favorites,
//         isFetching: FavoritesLoading,
//         refetch: refetchFavorite,
//       } = useGetListQuery({
//         accountId: accountId,
//         listName: "favorite",
//         media: "tv",
//         sessionId: sessionId,
//         page: 1,
//       });
    
//       const favoriteTrueOrFalse = !!favorites?.results?.find(
//         (movie) => movie.id === serieInfo.id
//       );
    
//     const addToFavoritesHandler = async () => {
//         setIsMovieFavorited(favoriteTrueOrFalse);
//         await addToFavorites(sessionId, media, id, accountId, isMovieFavorited);
//         refetchFavorite();
//       };
//       const navigateLogin = useNavigate();

//       useEffect(()=>{
//         setIsMovieFavorited(favoriteTrueOrFalse);
//       },[favorites])

//     return (
//         <div className=" mt-1 mb-[40px]">
//         {favorites?.results?.length >= 20 && !isMovieFavorited ? (
//           <button
//             onClick={() => setShowErr(true)}
//             className=" hover:bg-[#8f2f2f] normal-case text-sm  !transition-none  backdrop-blur-md  text-slate-300  backdrop-brightness-[1.4] p-[8px] rounded-md  text-[0.9rem] font-semibold 	 relative btn bg-[#2d2c2cbd] pr-[10px] pl-[10px] min-h-[40px] h-[40px] border "
//           >
//             <AnimatePresence>
//               {showErr && (
//                 <motion.p
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                 >
//                   Can't add more than 20 movies
//                 </motion.p>
//               )}
//             </AnimatePresence>
//             <AiOutlineInfoCircle className="text-lg" />
//           </button>
//         ) : (
//           <>
//             {isMovieFavorited ? (
//               FavoritesLoading ? (
//                 <motion.button className="text-[0.9rem] btn  backdrop-blur-md backdrop-brightness-[1.4] p-[8px] rounded-md font-semibold 	capitalize relative  bg-[#2d2c2cbd] hover:bg-[#242525]  text-slate-300   pr-[10px] pl-[10px] min-h-[40px] h-[40px] border border-secondary">
//                   <span className={`mx-3 loader `}></span>
//                 </motion.button>
//               ) : (
//                 <AnimatePresence>
//                   <motion.button
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     onClick={addToFavoritesHandler}
//                     className={`${
//                       darkMode
//                         ? " hover:bg-[#242525]  bg-[rgba(0,0,0,.3)] "
//                         : "bg-[#ededed] text-[#2d2c2c] hover:bg-[#e4e4e4]"
//                     }text-slate-300  backdrop-brightness-[1.4] p-[8px] font-normal  !transition-none  rounded-md sm:text-base text-sm   normal-case	relative btn backdrop-blur-[3px] pr-[10px] pl-[10px] min-h-[40px] h-[40px] border border-secondary`}
//                   >
//                     Favorite
//                     <AiTwotoneHeart className="w-5 h-5 fill-red-700" />
//                   </motion.button>
//                 </AnimatePresence>
//               )
//             ) : FavoritesLoading ? (
//               <button className=" hover:bg-[#242525]   backdrop-blur-md  text-slate-300  backdrop-brightness-[1.4] p-[8px] rounded-md  text-[0.9rem] font-semibold 	capitalize relative btn bg-[#2d2c2cbd] pr-[10px] pl-[10px] min-h-[40px] h-[40px] border border-secondary">
//                 <span className={` mx-3 loader `}></span>
//               </button>
//             ) : (
//               <AnimatePresence>
//                 <motion.button
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   onClick={
//                     sessionId === null && accountId === null
//                       ? () => navigateLogin("/login-or-signUp")
//                       : addToFavoritesHandler
//                   }
//                   className={`${
//                     darkMode
//                       ? " hover:bg-[#242525]  bg-[rgba(0,0,0,.3)] "
//                       : "bg-[#ededed] text-[#2d2c2c] hover:bg-[#e4e4e4]"
//                   }text-slate-300  backdrop-brightness-[1.4] p-[8px] rounded-md sm:text-base text-sm font-normal !transition-none   normal-case	relative btn backdrop-blur-[3px] pr-[10px] pl-[10px] min-h-[40px] h-[40px] border border-secondary`}
//                 >
//                   Add to Favorite
//                   <AiOutlineHeart className="w-5 h-5" />
//                 </motion.button>
//               </AnimatePresence>
//             )}
//           </>
//         )}
//       </div>
//     );
// };

// export default FavoritesSeries;