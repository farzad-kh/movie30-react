import React, { useEffect, useState, useRef, useContext } from "react";
import classnames from "classnames";
import { DrawersContext } from "../../context/DrawersContextProvider";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
// import { DarkMode, Opacity } from '@mui/icons-material';
import { useGetGenresQuery } from "../../services/tmdbSlice";

import { useDispatch, useSelector } from "react-redux";
import {
  selectGenres,
  resetPage,
  selectName,
} from "../../features/currentGenres ";
import { IoMdClose } from "react-icons/io";

import Ic from "../../asset/genres/index";

const Drawers = () => {
  const dispatch = useDispatch();
  const { data } = useGetGenresQuery();
  const [genres, setGenres] = useState([]);

  const ref = useRef("");
  const [backDropDra, setBackDropDra] = useState(false);
  const [offSetT, setOffsetT] = useState("");
  const [activeClass, setActiveClass] = useState("");

  const { isOpen, setIsOpen, resNav, setResNav, darkMode, setDarkMode } =
    useContext(DrawersContext);
  const { searchIsActive, genresName } = useSelector(
    (state) => state.currentGenres
  );

  const location = useLocation();



  const categoryName = [
    {
      label: "Home",
      value: "Home",
      path: "/",
    },
    {
      label: "TopRated",
      value: "Top rated",
      path: "/toprated",
    },
    {
      label: "TvSeries",
      value: "Tv series",
      path: "/tvseries",
    },
  ];

  const chengeGenreHandler = (i, item) => {
    window.scrollTo(0, 0);

    setIsOpen(false);
    dispatch(resetPage());
    setActiveClass(i);

    dispatch(selectGenres(item.id));
    // dispatch(selectGenres(item.id))
  };

  let obj = {
    id: "",
    name: "All Genres",
  };
  let newData = [];
  newData =
    data?.genres?.map((item, i) => {
  
      return { ...item };
    }) || [];
  newData.unshift(obj);

  useEffect(() => {
    categoryName.map((item) =>
      item.path === location.pathname ? setActiveClass(item.label) : null
    );

    setGenres(newData);
    if (isOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "unset";
    }
  }, [isOpen, offSetT, darkMode, data, location]);

  const myStyles = classnames(
    " backdrop-blur backdrop-brightness-[0.9]   shadow-sm   "
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-base-100 relative drwers-container   "
    >
      <div
        className={` w-[250px]  transition-all duration-500  xl:flex bg-base-100  items-center  sticky top-0  xl:translate-x-[0] translate-x-[-250px] 
     ${
       isOpen
         ? "origin-right  ease-out top-0 sticky bg-white flex z-50  !translate-x-0"
         : "ease-out translate-x-[-250px] origin-left top-0 sticky  bg-white flex z-50 "
     }  `}
      >
        <div
          ref={ref}
          className="w-full drawers bg-base-100"
          onScroll={() =>
            ref.current.scrollTop > 0
              ? setBackDropDra(true)
              : setBackDropDra(false)
          }
        >

          <div
            className={`navbar z-[999999] pl-4 pr-4  transition-all duration-200   ease-in  text-primary sticky top-0  ${
              darkMode ? "bg-base-50 " : "bg-base-100"
            }   ${backDropDra && myStyles}`}
          >
            <div className="flex ml-2 w-full justify-between ">
              {isOpen && resNav && (
                <div
                  className="cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <IoMdClose className="w-6 h-6" />
                </div>
              )}

              <label
                onClick={() => setDarkMode(!darkMode)}
                className="swap swap-rotate mr-3 "
              >
                {darkMode ? (
                  <svg
                    style={{ opacity: 1 }}
                    className={`swap-on fill-current w-7 h-7  "text-[#4e8af6]"  `}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>
                ) : (
                  <svg
                    className="swap-off fill-current w-7 h-7  "
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                )}
              </label>
            </div>
          </div>
          <h4 className="h4"></h4>
          <ul className="pl-4 pr-4 flex flex-col gap-1 drawer-ul text-primary transition-all duration-200 ease-in ">
            <div>
              <h3 className=" title px-2 py-2 w-full block text-[0.9rem] select-none  ">
                Categories
              </h3>
            </div>

            <ul className="ml-2 flex flex-col gap-2  ">
              {categoryName.map((item, i) => (
                <li
                  className={` select-none  flex items-center  ac relative  group cursor-pointer 
              ${
                location.pathname === item?.path && !searchIsActive
                  ? "active "
                  : ""
              } ${darkMode ? "dark-line" : "white-line"}   `}
                  key={i}
                >
                  <img
                    src={Ic[item.value.toLowerCase()]}
                    //  if is any problem chenge if statement of this
                    className={`${darkMode ? "invert-[1]" : "invert-0"} ${
                      location.pathname === item.path &&
                      !searchIsActive &&
                      "opacity-[1]"
                    }  absolute group-hover:opacity-[1] opacity-[0.5] pointer-events-none transition-all duration-200  object-contain   h-[21px]`}
                  ></img>
                  <Link
                    className={` ${
                      activeClass === item?.label &&
                      !searchIsActive &&
                      location.pathname === item.path
                        ? "text-primary font-semibold"
                        : ""
                    }      w-full z-50  select-none  ease-out pl-[1.9rem] py-2  flex text-sm text-base-content   group-hover:text-primary`}
                    onClick={() => {
                      chengeGenreHandler(item?.label, item);
                    }}
                    to={item?.path}
                  >
                    {item?.value}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="h-[2px] bg-base-300 block my-4  "></div>

            <ul className={`ml-2 flex flex-col gap-2 `}>
              <div>
                <h3 className=" title px-2 py-2 w-full block text-[0.9rem]  select-none  ">
                  Movie genres
                </h3>
              </div>

              {genres?.map((item, i) => (
                <motion.li
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={i}
                  className={` select-none  flex items-center text-base ac relative  group cursor-pointer 
                  ${
                    location.pathname === "/movies/genres" &&
                    !searchIsActive &&
                    genresName === item.name
                      ? "active "
                      : ""
                  } ${darkMode ? "dark-line" : "white-line"}   `}
                >
                  {item.icone}
                  <img
                    className={`${darkMode ? "invert-[1]" : "invert-0"} ${
                      location.pathname === "/movies/genres" &&
                      !searchIsActive &&
                      genresName === item.name &&
                      "opacity-[1]"
                    }  absolute group-hover:opacity-[1] opacity-[0.5] transition-all duration-200  object-contain   h-[21px]`}
                    src={Ic[item.name.toLowerCase()]}
                    alt=""
                  />

                  <Link
                    hrefLang="#movie"
                    onClick={() => {
                      chengeGenreHandler(i, item);
                      dispatch(selectName(item.name));
                    }}
                    to="/movies/genres"
                    className={` ${
                      location.pathname === "/movies/genres" &&
                      !searchIsActive &&
                      genresName === item.name
                        ? "text-primary font-semibold "
                        : ""
                    }  w-full z-50  ease-out  pl-[1.9rem] py-2  flex text-sm text-base-content   group-hover:text-primary`}
                  >
                    {item?.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </ul>

          <div className="opacity-custom bg-base-100 z-[55] pointer-events-none "></div>
        </div>
      </div>
    </motion.div>
  );
};

export default Drawers;
