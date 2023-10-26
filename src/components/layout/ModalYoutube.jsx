import React, { useContext } from "react";
import { DrawersContext } from "../../context/DrawersContextProvider";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
const ModalYoutube = ({ playTrailer, setPlayTrailer, trailer }) => {


  const isPlay = (e) => {
    setPlayTrailer(!playTrailer);
  };
  if (playTrailer === false) return null;

  return (
    <>
      <motion.div
        onClick={isPlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed top-0 left-0 right-0 w-full h-[100vh] 
                z-[50] backdrop-blur-[1.5px] !backdrop-brightness-[0.5]  "
      ></motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full right-0 m-auto h-full flex absolute  justify-center items-center "
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, type: "spring" }}
          className="fixed top-[130px]  sm:w-[68.9%] w-full flex justify-center z-[55]   bg-black    lg:h-[658.5px] md:h-[550px] h-[450px]"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.4 }}
            onClick={isPlay}
            className="text-3xl right-0 w-fit sm:mr-0 mr-1 absolute  flex justify-end z-[55]  top-[-40px] cursor-pointer hover:text-slate-50"
          >
            <AiOutlineClose />
          </motion.div>
          <iframe
            className="w-full h-full z-[0] outline-none "
            title="Trailer"
            src={`https://www.youtube.com/embed/${trailer}?autoplay=1`}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen="1"
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default ModalYoutube;
