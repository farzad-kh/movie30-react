import React, { useContext } from "react";
import { DrawersContext } from "../../context/DrawersContextProvider";
import { motion, AnimatePresence } from "framer-motion";
const PopUp = () => {
  const { isOpen, setIsOpen } = useContext(DrawersContext);
  const container = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.3,
        delay: 0.2,
        ease: [0.17, 0.67, 0.83, 0.67],
      },
    },
    show: {
      opacity: 1,
      transition: {
        delay: 0,
        duration: 0.3,
        ease: [0.17, 0.67, 0.83, 0.67],
        type: "tween",
      },
    },
  };

  return (
    <div className="">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            onClick={() => setIsOpen(!isOpen)}
            variants={container}
            initial={container.hidden}
            animate={container.show}
            exit={container.hidden}
            className="fixed top-0 left-0 right-0 w-full h-[100vh] 
          z-50 backdrop-blur-[1.5px] !backdrop-brightness-[0.8]  "
          ></motion.div>
        ) : (
          ""
        )}
      </AnimatePresence>
    </div>
  );
};

export default PopUp;
