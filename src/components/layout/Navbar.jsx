

import React, { useContext, useEffect, useState } from "react";

import classnames from "classnames";
import { motion } from "framer-motion";
import { DrawersContext } from "../../context/DrawersContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { searchInput } from "../../features/currentGenres ";
import { useLocation } from "react-router-dom";
import PopUp from "./PopUp";
import { cc } from "../../features/currentGenres ";

import { AiOutlineClose } from "react-icons/ai";
import DropDownMenu from "../module/DropDownMenu";

const Navbar = () => {
  // const { searchInput } = useSelector((state => state.currentGenres))
  const { searchQuery } = useSelector((state) => state.currentGenres);
  const dispatch = useDispatch();



  const [backDrop, setBackDrop] = useState(false);



  const { isOpen, setIsOpen, resNav, setResNav, darkMode } =
    useContext(DrawersContext);

  // const [scrollDirection, setScrollDirection] = useState(null);

 
  const loacation = useLocation();
  

  


 


  useEffect(() => {
  
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

    


  }, [resNav,loacation]);

 


  const myStyles = classnames(
    "backdrop-blur backdrop-brightness-[0.9]  shadow-sm  "
  );


 
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

        <section className=" gap-2 w-full   ">
          <div className="form-control relative  sm:w-[259px]  w-[200px]  ">
          
            <input
     
              onChange={(e) => dispatch(searchInput(e.target.value.trim()))}
              value={searchQuery}
              type="email" title="serach"  autocomplete="off"

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
        </section>
     <DropDownMenu  darkMode={darkMode}/>

        <PopUp />
      </div>
    </motion.div>
  );
};

export default Navbar;
