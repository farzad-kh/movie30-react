
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useGetActorListQuery } from "../../services/tmdbSlice";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { motion } from "framer-motion";
import Search from "../Search/Search";
import Loading from "../Loading/Loading";
import { DrawersContext } from "../../context/DrawersContextProvider";

//icons

import Biography from "./Biography";

const Actors = () => {
  const { id } = useParams();
  const {
    data: actors,
    isFetching,
    isError,
   
  } = useGetActorListQuery({ id: id });


  // if combined_credits tmdb had 404 do this
  // const tvCredit=actors?.tv_credits?.cast.map(item=>item)
  // const movieCredit=actors?.movie_credits?.cast.map(item=>item)

  const { genresIdOrCategoryName, searchIsActive, searchQuery, genresName } =
    useSelector((state) => state.currentGenres);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [val, setVal] = useState(1);
  const itemsPerPage = 20;

  const [offsetTop, setOffsetTop] = useState("");
  const filterActorsMovies =
    actors?.combined_credits?.cast?.filter((item) =>
      item?.backdrop_path === null || item?.backdrop_path === undefined
        ? ""
        : item
    ) || [];

  const filterMovies = filterActorsMovies.filter(
    (item, index, self) =>
      index ===
      self.findIndex((t) => t.name === item.name && t.title === item.title)
  );


  const handlePageClick = (event) => {
    window.scrollTo(0, offsetTop);
    setCurrentItems([]);

    setVal(event.selected + 1);
    const newOffset = (event.selected * itemsPerPage) % filterMovies?.length;

    setItemOffset(newOffset);
  };

  useEffect(() => {
    // window.onresize = () => {
    //   setOffsetTop(ref?.current?.offsetTop);
    // }
  
    const endOffset = itemOffset + itemsPerPage;
    setTimeout(
      () => setCurrentItems(filterMovies.slice(itemOffset, endOffset)),
      500
    );
    setPageCount(Math.ceil(filterMovies?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, val, actors, offsetTop]);

  const pageOpacity = {
    hidden: {
      opacity: 0,
      transition: {
        delay: 0,
        duration: 0,
      },
    },
    show: {
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 0.5,
      },
    },
  };
  const {  darkMode } = useContext(DrawersContext);
 



  if (searchQuery.length > 0 && searchIsActive) return <Search />;
  return (
    <>
      {isFetching ? (
        <Loading />
      ) : (
      <Biography actors={actors} isError={isError} currentItems={currentItems} setOffsetTop={setOffsetTop}/>
      )}

      {filterMovies.length > 20 && (
        <motion.div
          variants={pageOpacity}
          animate={
            currentItems.length === 0 ? pageOpacity.hidden : pageOpacity.show
          }
          className="w flex w-full pagination-container "
        >
          <ReactPaginate
            breakLabel={
              <button className="text-gray-600 cursor-text  " disabled>
                ...
              </button>
            }
            nextLabel={false}
            onPageChange={handlePageClick}
            hrefBuilder={(page, pageCount, selected) =>
              page >= 1 && page <= pageCount && `#search`
            }
            pageRangeDisplayed={3}
            pageCount={pageCount}
            // previousLabel={<HiChevronLeft className="hover:bg-transparent bg-transparent text-xl"/>}
            previousLabel={false}
            renderOnZeroPageCount={null}
            activeLinkClassName={`${
              !darkMode
                ? "!bg-neutral !text-[#f5f3f3] "
                : "bg-neutral !text-primary "
            }`}
            containerClassName="container-page"
            pageLinkClassName={`text-secondary p-[19px] w-[36px] h-[36px]  text-center cursor-pointer flex z-[50] overflow-hidden items-center justify-center `}
            disabledLinkClassName="disable-page"
            marginPagesDisplayed={1}
            breakClassName={`pointer-events-none text-secondary `}
            pageClassName={` ${darkMode ? "li-dark" : "li-light"}`}
          />
        </motion.div>
      )}
    </>
  );
};

export default Actors;
