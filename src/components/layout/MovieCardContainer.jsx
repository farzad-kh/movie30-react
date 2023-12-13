import React from "react";
import { motion } from "framer-motion";
// !cursor-default self-center dd grid gap-x-8 gap-y-12 
const MovieCardContainer = ({ children, searchIsActive}) => {
  return (
    <div className="dd grid sm:gap-x-8 gap-x-6 md:gap-y-12 gap-y-4 w-full justify-center self-center !cursor-default"
     >
      {children}
    </div>
  );
};

export default MovieCardContainer;
