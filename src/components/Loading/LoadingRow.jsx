import React, { useContext } from "react";
import styles from "../../styles/loading.module.css";
import { DrawersContext } from "../../context/DrawersContextProvider";

const LoadingRow = ({ minHeight }) => {
  const { isOpen, setIsOpen, darkMode } = useContext(DrawersContext);
  return (
    <div
      style={{ minHeight: `${minHeight}vh` }}
      className={` ${minHeight && "sm:min-h-[590px] min-h-[700px]"} w-full p-7 mt-6 flex justify-center    elative top-2 `}
    >
      <span
        className={`${darkMode ? styles.loaderRow : styles.loaderRowLight}  `}
      ></span>
    </div>
  );
};

export default LoadingRow;
