import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import Search from "../components/Search/Search";

import { fetchToken } from "../components/utils";
const LoginOrSignUp = () => {

  const { searchIsActive, searchQuery } = useSelector(
    (state) => state.currentGenres
  );
  const sessionId = localStorage.getItem("session_id");


  if (searchQuery.length > 0 && searchIsActive) return <Search />;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.3 }}
      className="xl:px-10  lg:px-9 md:px-7 px-5 py-6 main"
    >
      {sessionId === "" || sessionId === null ? (
        <div>
          <div className="text-lg text-primary">
            Please{" "}
            <button
              onClick={() => fetchToken()}
              tabIndex={0}
              className="link text-lg link-hover normal-case  min-h-[41px] h-[41px] "
            >
              Sign up
            </button>{" "}
            or{" "}
            <button
              onClick={() => fetchToken()}
              tabIndex={0}
              className="link text-lg link-hover normal-case  min-h-[41px] h-[41px] "
            >
              Login
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-xl text-primary">you Alredy Login</div>
        </div>
      )}
    </motion.div>
  );
};

export default LoginOrSignUp;
