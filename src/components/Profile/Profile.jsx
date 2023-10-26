import React, { useEffect, useState } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useGetListQuery, useGetListTvQuery } from "../../services/tmdbSlice";
import Search from "../Search/Search";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Movie from "../Movie/Movie";
const Profile = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const logoutHandler = () => {
    localStorage.removeItem("accountId");
    localStorage.removeItem("request_token");
    localStorage.removeItem("session_id");
    window.location.href = "/";
  };

  const sessionId = localStorage.getItem("session_id");

  const navigate = useNavigate();

  const { searchIsActive, searchQuery } = useSelector(
    (state) => state.currentGenres
  );

  useEffect(() => {
    if (sessionId === null || sessionId === "") {
      navigate("/login-or-signup");
    }
  }, []);

  if (searchQuery.length > 0 && searchIsActive) return <Search />;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.3 }}
    >
      <div className="xl:p-10 lg:p-9 md:p-7 p-5 main">
        <div className="flex justify-between w-100% ">
          <h3 className="block text-primary sm:text-3xl text-[22px]   pb-4 ">
            My Profile
          </h3>
          <button
            onClick={logoutHandler}
            className="flex justify-center self-baseline items-center gap-2 text-sm font-semibold text-primary link link-hover"
          >
            <div className="">LOGOUT</div>
            <MdOutlineLogout className="w-[16px] h-[16px] pointer-events-none" />
          </button>
        </div>
        <figure className="sm:text-lg text-base">
          Welcome {user?.username}
        </figure>
      </div>
    </motion.div>
  );
};

export default Profile;
