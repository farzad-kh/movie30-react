
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useGetMovieInformationsQuery,
  useGetSearchQuery,
} from "../../services/tmdbSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import MovieInfoList from "./MovieInfoList";
import Search from "../Search/Search";
import SerieInfoList from "./SerieInfoList";
import LoadingInfo from "../Loading/LoadingInfo";
import { selectMovieInfo } from "../../features/currentGenres ";

const MovieInformation = () => {
  const { id, media } = useParams();
  
  const { searchIsActive, movieInfoObj, searchQuery } = useSelector(
    (state) => state.currentGenres
  );

  const dispatch = useDispatch();

  const { data: movie, isFetching: fetchMovie } = useGetMovieInformationsQuery({
    id: id,
    media: media,
  });




  const { data, isFetching, isError } = useGetSearchQuery({
    searchQuery: searchQuery,
  });

  let obj = {
    ...(media === "movie" ? { media_type: "movie" } : { media_type: "tv" }),
  };

  useEffect(() => {
    dispatch(selectMovieInfo({ ...movie, ...obj }));
   
    
  }, [movie]);


  if (searchQuery.length > 0 && searchIsActive) return <Search />;

  return (
    <>
   
      {fetchMovie ? (
        <LoadingInfo height />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        
        >
          {movieInfoObj?.media_type === "movie" && (
            <MovieInfoList
              key={movieInfoObj.id}
              movieInfo={movieInfoObj}
              isFetching={fetchMovie}
              media={movieInfoObj?.media_type}
              id={id}
            />
          )}

          {movieInfoObj?.media_type === "tv" && (
            <SerieInfoList
              key={movieInfoObj.id}
              serieInfo={movieInfoObj}
              isFetching={fetchMovie}
              media={movieInfoObj?.media_type}
              id={id}
            />
          )}
        </motion.div>
      )}
    </>
  );
};

export default MovieInformation;
