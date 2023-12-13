
import {
  BsStarFill,
  BsDot,

} from "react-icons/bs";
import { MdLanguage } from "react-icons/md";

import { TbChairDirector } from "react-icons/tb";
import { HiOutlineBookOpen } from "react-icons/hi";



import { TbLanguage } from "react-icons/tb";
import { MdOutlineStarRate } from "react-icons/md";
import ExternalTooltip from "./ExternalTooltip";

const FilmMoreInfo = ({ movieInfo, children ,usPG}) => {
  const director =
    movieInfo?.credits?.crew?.filter((item) =>
      item?.job.toLowerCase() === "director" ||
      item?.department.toLowerCase() === "director"
      
    ) || [];

  const writers =
    movieInfo?.credits?.crew?.filter((item) =>
      item?.department === "Writing" && item?.job === "Writer" 
    ) || [];

  const movieRate = () => {
    if (movieInfo?.["vote_average"] <= 4) {
      return "text-red-800";
    } else if (movieInfo?.["vote_average"] <= 7) {
      return "text-orange-500 ";
    } else {
      return "  text-yellow-400";
    }
  };



  let time = movieInfo?.runtime;
  const Hours = Math.floor(time / 60);
  const minutes = time % 60;

  const starsCasts = movieInfo?.credits?.cast.slice(0, 3);




  return (
    <div className="flex flex-col my-7">
      <figure className="sm:text-base text-sm  flex items-center font-semibold   gap-x-1 gap-y-2 flex-wrap  mb-[14px] ">
        <div className="flex items-center  gap-1">
          {movieInfo?.status == "In Production" ||
          (movieInfo?.status === "Post Production" &&
            movieInfo?.["vote_average"] === 0) ? (
            movieInfo?.status === "In Production" ? (
              <>
                <div className="text-slate-200">In production</div>
              </>
            ) : (
              movieInfo?.status === "Post Production" && (
                <>
                  <div className=" text-slate-200">Post production</div>
                </>
              )
            )
          ) : (
            <>
              {movieInfo?.["vote_average"] === 0 ? (
                <div className=" text-slate-200">No info</div>
              ) : (
                <>
                  <BsStarFill className={`w-[14px] ${movieRate() || ""}`} />
                  <h4 className=" text-primary flex ">
                    {movieInfo?.["vote_average"]?.toFixed(1) || ""}
                    <div className="text-secondary ml-[2px]">/</div>
                    <div className="text-secondary ml-[2px]">10</div>
                  </h4>
                </>
              )}
            </>
          )}
        </div>

        {movieInfo?.runtime > 0 || !movieInfo?.runtime === undefined ? (
          <div className="flex items-center  gap-1">
            <BsDot className="self-end w-[19px] h-[19px]" />

            <div className="">
              {Hours === 0 ? (
                <span>{minutes}m</span>
              ) : minutes === 0 ? (
                <span>{Hours}h</span>
              ) : (
                <span>
                  {Hours}h {minutes}m
                </span>
              )}
            </div>
          </div>
        ) : (
          ""
        )}

        {usPG?.certification ? (
          <div className=" flex items-center  gap-1">
            <BsDot className="self-end w-[19px] h-[19px]" />
            <div>{usPG?.certification || ""}</div>
          </div>
        ) : (
          ""
        )}

        {movieInfo?.["release_date"] ? (
          <div className="flex items-center gap-1">
            <BsDot className="self-end w-[19px] h-[19px]" />
            <div className=" flex">
              {movieInfo?.["release_date"]?.slice(0, 4) ||
                serieInfo?.["first_air_date"]?.slice(0, 4)}
            </div>
          </div>
        ) : (
          ""
        )}
      </figure>
      
      {movieInfo?.production_countries?.length !== 0 && (
        <figure className=" sm:text-base text-sm  flex items-center font-semibold   gap-x-1 gap-y-2 flex-wrap mb-[14px] ">
          <MdLanguage className="self-center  w-[19px] h-[19px]" />
          <span className=" flex gap-1">
         
            <div className=" mr-2">Country of origin</div>

            {movieInfo?.production_countries?.map((item, i) => (
              <div className="flex" key={item.name}>
                <div key={item?.iso_3166_1} className="title-2">
                  {item?.iso_3166_1}
                </div>

                {i + 1 === movieInfo?.production_countries.length ? (
                  ""
                ) : (
                  <span className="ml-[5px]" >
                    .
                  </span>
                )}
              </div>
            ))}
          </span>
        </figure>
      )}
      {movieInfo?.spoken_languages?.length !== 0 && (
        <figure className="  sm:text-base text-sm flex items-center font-semibold   gap-x-1 gap-y-2 flex-wrap  mb-[14px]">
          <TbLanguage className="self-center  w-[19px] h-[19px]" />
          <div className=" mr-2">Languages</div>
          {movieInfo?.spoken_languages?.map((language, i) => (
            <div key={language.name} className="flex">
              <p  className="title-2 ">
                {language?.english_name}
              </p>

             
              {i + 1 === movieInfo?.spoken_languages.length ? (
                ""
              ) : (
                <span className="ml-[5px]" >
                  .
                </span>
              )}
            </div>
          ))}
        </figure>
      )}
      {starsCasts?.length !== 0 && (
        <figure className=" sm:text-base text-sm flex items-center font-semibold   gap-x-1 gap-y-2 flex-wrap  mb-[14px]">
          <MdOutlineStarRate className="self-center  w-[18px] h-[18px]" />
          <div className=" mr-2">Stars</div>

          {starsCasts?.map((item, i) => (
            <div key={item?.name} className="flex">
              <p  className="title-2 ">
                {item?.name}
              </p>

              {i + 1 === starsCasts?.length ? (
                ""
              ) : (
                <span className="ml-[5px]" >
                  .
                </span>
              )}
            </div>
          ))}
        </figure>
      )}

      {director.length !== 0 && (
        <figure className=" sm:text-base text-sm flex items-center font-semibold  gap-x-1 gap-y-2 flex-wrap  mb-[14px]">
          <TbChairDirector className="self-center  w-[18px] h-[18px]" />
          <div className=" mr-2">Director</div>

          {director?.map((item, i) => (
            <div key={item?.name} className="flex">
              <p  className="title-2 ">
                {item?.name}
              </p>

              {i + 1 === director.length ? (
                ""
              ) : (
                <span className="ml-[5px]">
                  .
                </span>
              )}
            </div>
          ))}
        </figure>
      )}

      {writers.length !== 0 && (
        <figure className=" sm:text-base text-sm flex items-center font-semibold   gap-x-1 gap-y-2 flex-wrap  mb-[14px]">
          <HiOutlineBookOpen className="self-center  w-[18px] h-[18px]" />
          <div className=" mr-2">Writer</div>
          {writers?.map((writer, i) => (
            <div className="flex" key={i}>
              <div key={writer?.name} className="title-2">
                {writer?.name}
              </div>

              {i + 1 === writers.length ? (
                ""
              ) : (
                <span className="ml-[5px]" >
                  .
                </span>
              )}
            </div>
          ))}
        </figure>
      )}

      {children}
      <ExternalTooltip externalId={movieInfo}/>
    </div>
  );
};

export default FilmMoreInfo;
