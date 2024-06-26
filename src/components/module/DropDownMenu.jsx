import React, { useRef, useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CgProfile } from "react-icons/cg";
import { BsBookmarks } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
 
import { fetchToken, moviesApi, createSessionId, getProfile } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../features/auth";
import { profileClearSearch } from "../../features/currentGenres ";
const DropDownMenu = ({ darkMode }) => {
  const dispatch = useDispatch();
  const { user, sessionId } = useSelector((state) => state?.user);
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
  const token = localStorage?.getItem("request_token");
  const sessionIdLocalStorag = localStorage?.getItem("session_id");
  const [openDrop, setOpenDrop] = useState(false);
  const logoutHandler = () => {
    localStorage.removeItem("accountId");
    localStorage.removeItem("request_token");
    localStorage.removeItem("session_id");
    window.location.href = "/";
  };

  const navigateHandler = () => {
    setOpenDrop(!openDrop);
  };
  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef?.current?.contains(e.target)) {
        setOpenDrop(false);
      }
    };

    document.addEventListener("mousedown", handler);

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
    logInUser();
  }, [token]);
  const [isLogin, setIslogin] = useState(true);
  if (isLogin) setTimeout(() => setIslogin(false), 2000);

  return (
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
              <div onClick={navigateHandler} className="dropdown-end dropdown ">
                <div className="btn btn-ghost btn-circle avatar">
                  <div
                    
                    className={`w-10 rounded-full  flex items-center bg-[#bc3838ed] `}
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
                              navigateHandler();
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
            <button
              onClick={() => fetchToken()}
              tabIndex={0}
              className="btn btn-ghost normal-case sm:text-base text-sm min-h-[41px] h-[41px] "
            >
              Login
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DropDownMenu;
