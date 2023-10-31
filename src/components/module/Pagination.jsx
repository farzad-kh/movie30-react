import React from 'react';
import { motion } from 'framer-motion';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { decrement, increment } from '../../features/currentGenres ';

const Pagination = ({page,DataMovies}) => {

  const dispatch = useDispatch();
  const pervPageHandler = (e) => {
    if (page <= 1) {
      null;
    } else {
      dispatch(decrement());
    }
  };
  const nextPageHandler = () => {
    DataMovies([]);
    dispatch(increment());
  };



    return (
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5,duration:0.5 }}
    
    className="join flex justify-center gap-x-5 items-center mt-14  ">
      <a
        href="#movie"
        onClick={pervPageHandler}
        className={`${
          page <= 1 &&
          "pointer-events-none opacity-[0.75] shadow-none bg-[#2d3134a3]"
        } h-[45px] min-h-[45px] pl-[5px]  min-w-[86px] shadow-[#182436c7] shadow-sm btn text-base  btn-neutral normal-case px-[12px]  rounded-[5px]`}
      >
        <MdArrowBackIosNew />
        Prev
      </a>
      <div className="text-lg text-primary font-semibold">{page}</div>
      <a
        href="#movie"
        onClick={nextPageHandler}
        className="  btn text-base pr-[5px]  min-w-[86px] font-semibold  h-[45px] min-h-[45px] btn-neutral normal-case px-[12px] shadow-sm shadow-[#182436c7] rounded-[5px]"
      >
        Next
        <MdArrowForwardIos />
      </a>
    </motion.div>
    );
};

export default Pagination;