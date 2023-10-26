import styles from "../../styles/loading.module.css";

const Loading = ({ color, height }) => (
    
  <div
    className={`w-full p-7 mt-6 flex justify-center ${
      height ? `min-h-[360vh]` : "min-h-[329vh]"
    }   relative top-2 `}
  >
    {/* <span className= {`loading loading-lg loading-spinner  ${color}`} ></span> */}

    <div className={`${styles.loaderMain} `}></div>
  </div>
);

export default Loading;
