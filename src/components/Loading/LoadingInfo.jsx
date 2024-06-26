import React, { useContext } from "react";
import styles from "../../styles/loading.module.css";

import { DrawersContext } from "../../context/DrawersContextProvider";

const Loading = ({ label }) => {
  const { darkMode } = useContext(DrawersContext);
  return (
    <div
      className={`w-full p-7 mt-6 flex justify-center 
     
   }   relative top-2 `}
    >
   

      <div className="w-full flex flex-col  items-center justify-start mt-2  ">
        <div
          className={`${
            darkMode ? styles.loaderInfoDark : styles.loaderInfoLight
          } mb-3 `}
        ></div>
        <div className="max-sm:text-sm text-primary font-semibold">
          {label ? label : "Loding data"}
        </div>
        <div className="text-sm">Please wait a moment</div>
      </div>
    </div>
  );
};

export default Loading;
