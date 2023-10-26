import React, { useContext, useEffect, useState, useRef } from "react";

import classnames from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import { DrawersContext } from "../../context/DrawersContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { searchInput } from "../../features/currentGenres ";
import { useLocation, Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { fetchToken, moviesApi, createSessionId, getProfile } from "../utils";
import { setUser } from "../../features/auth";
import PopUp from "./PopUp";
import { bgProfile } from "../helper";
import { profileClearSearch, cc } from "../../features/currentGenres ";

import { BsBookmarks } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  // const { searchInput } = useSelector((state => state.currentGenres))
  const { searchQuery } = useSelector((state) => state.currentGenres);
  const dispatch = useDispatch();

  const { user, sessionId } = useSelector(
    (state) => state?.user
  );

  const [backDrop, setBackDrop] = useState(false);
  const [isLogin, setIslogin] = useState(true);


  const { isOpen, setIsOpen, resNav, setResNav, darkMode } =
    useContext(DrawersContext);

  // const [scrollDirection, setScrollDirection] = useState(null);

 
  const loacation = useLocation();
  const [openDrop, setOpenDrop] = useState(false);
  const token = localStorage?.getItem("request_token");
  const sessionIdLocalStorag = localStorage?.getItem("session_id");

  const dropDown = {
    hidden: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef?.current?.contains(e.target)) {
        setOpenDrop(false);
      }
    };

    document.addEventListener("mousedown", handler);
  }, [loacation]);

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIdLocalStorag) {
          getProfile(dispatch, setUser);
        } else {
          createSessionId();

          getProfile(dispatch, setUser);
        }
      }
    };

    window.addEventListener("scroll", function () {
      if (window.scrollY > 0) {
        setBackDrop(true);
      } else {
        setBackDrop(false);
      }
    });

    window.onresize = () => {
      if (window.innerWidth < 1280) {
        setResNav(true);
      } else {
        setResNav(false);
        setIsOpen(false);
      }
    };
    if (window.innerWidth < 1280) {
      setResNav(true);
    } else {
      setResNav(false);
      setIsOpen(false);
    }
    if (window.scrollY > 0) {
      setBackDrop(true);
    } else {
      setBackDrop(false);
    }

    logInUser();

    if (isLogin) {
      setTimeout(() => setIslogin(false), 2000);
    }
  }, [resNav, token]);

 

  const logoutHandler = () => {
    localStorage.removeItem("accountId");
    localStorage.removeItem("request_token");
    localStorage.removeItem("session_id");
    window.location.href = "/";
  };
  const myStyles = classnames(
    "backdrop-blur backdrop-brightness-[0.9]  shadow-sm  "
  );

  const dropMenuLi = [
    {
      name: "Profile",
      path: `/profile/${user.username}`,
      icon: <CgProfile className="text-[15px]" />,
    },
    {
      name: "Whatchlist",
      path: "/user/whatchlist",
      icon: <BsBookmarks className="text-[15px]" />,
    },
    {
      name: "Favorite",
      path: "/user/favorites",
      icon: <AiOutlineHeart className="text-[15px]" />,
    },
  ];

  const navigateHandler = (item) => {
    setOpenDrop(!openDrop);
  };
  return (
    <motion.div
      initial="hidden"
      animate="show"
      className={`  text-primary transition-all duration-250 z-40 w-full ease-in  ${
        darkMode ? "bg-base-50 " : "bg-base-100"
      }  ${backDrop && myStyles}    sticky top-0 `}
    >
      <div className="sm:pl-6 sm:pr-6 pl-2 pr-2 gap-2 navbar flex justify-between w-full">
        {resNav && (
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, ease: "easeIn", duration: 0.5 }}
            className="sm:w-[48px] w-[42px]  sm:h-[48px] h-[42px] "
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="btn  btn-square btn-ghost  sm:w-[48px] w-[42px]  sm:h-[48px] sm:min-h-[48px] min-h-[42px] h-[42px] "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </motion.div>
        )}

        <div className=" gap-2 w-full   ">
          <div className="form-control relative  sm:w-[259px]  w-[210px] ">
            <input
              onChange={(e) => dispatch(searchInput(e.target.value))}
              value={searchQuery}
              type="text"
              placeholder="Search Movies & Shows ..."
              className="input input-bordered sm:h-12 h-11 md:w-auto text-sm  "
            />

            {searchQuery.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <AiOutlineClose
                  onClick={() => dispatch(cc())}
                  className="cursor-pointer absolute right-3 top-[30%]"
                />
              </motion.div>
            )}
          </div>
        </div>
        <div className="">
          <div className="flex ">
            {isLogin ? (
              <div className="loader mr-4"></div>
            ) : sessionId !== "" && sessionIdLocalStorag !== null ? (
              <>
                <div
                  ref={menuRef}
                  className="flex items-center justify-center gap-1"
                >
                  {/* for dropdown it's must all tags have a same parent */}
                  <div
                    onClick={navigateHandler}
                    className="dropdown-end dropdown "
                  >
                    <div className="btn btn-ghost btn-circle avatar">
                      <div
                        style={{
                          background: `${bgProfile(user?.username?.charAt(0))}`,
                        }}
                        className={`w-10 rounded-full  flex items-center `}
                      >
                        <div className="items-center flex justify-center self-center w-full h-full text-[#efefef]  text-lg">
                          {user?.username?.charAt(0)}
                        </div>
                        {/* <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {openDrop && (
                      <motion.ul
                        variants={dropDown}
                        animate={openDrop ? dropDown?.show : dropDown?.hidden}
                        exit={dropDown?.hidden}
                        className={`${
                          darkMode
                            ? "bg-[#1d1d1d]"
                            : "backdrop-blur-md  backdrop-brightness-[0.45] text-white "
                        } absolute top-[48px] !right-[32px] my-5    z-[1] py-2 px-2 shadow menu menu-sm dropdown-content  rounded-box w-[240px]  [&>li]:p-2 `}
                      >
                        <li className={` !p-0 pointer-events-none   border-b `}>
                          <label className="justify-between p-2">
                            {user?.username}
                          </label>
                        </li>
                        <div className="my-3 flex flex-col gap-y-1">
                          {dropMenuLi.map((item) => (
                            <li
                              key={item?.name}
                              className="flex w-full items-center  flex-row"
                            >
                              <div className="!p-0 items-center self-center absolute left-[4px] pointer-events-none">
                                {item?.icon}
                              </div>
                              <Link
                                to={item?.path}
                                className={`${
                                  !darkMode &&
                                  "hover:bg-[#e5ebeb59] hover:text-[#eff0f1] "
                                } !p-0 !pl-[18px] rounded-md w-full`}
                                onClick={() => {
                                  navigateHandler(item);
                                  dispatch(profileClearSearch());
                                }}
                              >
                                <h3 className="p-2">{item.name}</h3>
                              </Link>
                            </li>
                          ))}

                          <li className="flex w-full items-center  flex-row ">
                            <div className="!p-0 items-center self-center absolute left-[4px] pointer-events-none">
                              <MdOutlineLogout className="text-[15px]" />
                            </div>
                            <button
                              onClick={logoutHandler}
                              className={`${
                                !darkMode &&
                                "hover:bg-[#e5ebeb59]  hover:text-[#eff0f1]"
                              } p-2 !pl-[26px] rounded-md w-full `}
                            >
                              Logout
                            </button>
                          </li>
                        </div>
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="flex items-center justify-center gap-1"
              >
                <p></p>
                <button
                  onClick={() => fetchToken()}
                  tabIndex={0}
                  className="btn btn-ghost normal-case text-base min-h-[41px] h-[41px] "
                >
                  Login
                </button>
              </motion.div>
            )}
          </div>
        </div>

        <PopUp />
      </div>
    </motion.div>
  );
};

export default Navbar;
