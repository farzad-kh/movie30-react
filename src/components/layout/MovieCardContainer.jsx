import React from "react";
import { motion } from "framer-motion";
const MovieCardContainer = ({ children }) => {
  return (
    <div className="dd grid sm:gap-x-8 gap-x-6 md:gap-y-12 gap-y-4 w-full md:justify-normal justify-center !cursor-default">
      {children}
    </div>
  );
};

export default MovieCardContainer;
