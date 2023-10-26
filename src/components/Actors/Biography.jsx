import React, { useEffect, useRef } from "react";
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";
import { TfiYoutube } from "react-icons/tfi";
import { motion } from "framer-motion";
import moment from "moment";
import { differenceInYears } from "date-fns";
import LoadingRow from "../Loading/LoadingRow";
import Movie from "../Movie/Movie";
const Biography = ({ actors, isError, currentItems, setOffsetTop }) => {
  const formattedDate = moment(actors?.birthday).format("MMMM DD, YYYY");
  const formattedDeathday = moment(actors?.deathday).format("MMMM DD, YYYY");
  

  const date = new Date();
  const birth = new Date(actors?.birthday);
  const ageYears = differenceInYears(date, birth);
  const ref = useRef();
  useEffect(() => {
    setOffsetTop(ref?.current?.offsetTop);
  }, []);

  const { instagram_id, tiktok_id, facebook_id, twitter_id, youtube_id } =
    actors?.external_ids;

  const socialMediaLinks = [
    {
      id: instagram_id,
      label: "Instagram",
      icon: (
        <FaInstagram className="text-[28px] hover:text-primary transition-all" />
      ),
    },
    {
      id: tiktok_id,
      label: "TikTok",
      icon: (
        <FaTiktok className="text-[24px] mt-[2px] hover:text-primary transition-all" />
      ),
    },
    {
      id: facebook_id,
      label: "Facebook",
      icon: (
        <FaFacebook className="text-[28px] hover:text-primary transition-all" />
      ),
    },
    {
      id: twitter_id,
      label: "Twitter",
      icon: (
        <FaTwitter className="text-[26px] mt-[2px] hover:text-primary transition-all" />
      ),
    },
    {
      id: youtube_id,
      label: "YouTube",
      icon: (
        <TfiYoutube className="text-[28px] hover:text-primary transition-all" />
      ),
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.3 }}
      id="search"
      className="xl:p-8 p-[24px] relative main"
    >
      <h3 className=" ml-3 sm:text-3xl text-[26px] font-semibold text-primary  pb-10  ">
        Biography
      </h3>
      <section className=" lg:flex-row  flex-col gap-y-8 gap-x-5 lg:px-14 md:px-10 sm:px-4 px-0 flex justify-between items-center  mt-4 md:mb-[85px] mb-7">
        <article className=" lg:py-0 py-4 lg:px-0 sm:px-8 px-4 lg:justify-start justify-center sm:items-baseline items-center gap-x-8 self-baseline flex-[0.8]  flex w-full lg:flex-col  sm:flex-row flex-col">
          <div className="md:w-[270px] md:h-[400px] w-[233px] h-[348px] overflow-hidden  rounded-md relative flex flex-shrink-0">
            <img
              src={`https://image.tmdb.org/t/p/original${actors?.["profile_path"]}`}
              className=" skeleton2 absolute w-full h-full object-cover overflow-hidden  rounded-md"
            />
          </div>
          <div className="sm:w-full w-[341px] mt-3 md:self-end sm:self-end self-center flex flex-col  ">
            <div className="flex my-1 mb-6 gap-x-4 sm:justify-start justify-center">
              {socialMediaLinks.map(
                (socialMedia, index) =>
                  socialMedia.id && (
                    <a
                      key={index}
                      target="_blank"
                      href={`https://www.${socialMedia.label.toLowerCase()}.com/${
                        socialMedia.id
                      }`}
                    >
                      {socialMedia.icon}
                    </a>
                  )
              )}
            </div>
            <figure className="flex gap-y-2 font-semibold flex-col mb-6 sm:p-0 pl-12 ">
              <div className="flex text-base gap-x-2">
                <p className="text-secondary">Name:</p>
                <p className="text-primary">{actors?.name || ""}</p>
              </div>

              {actors?.birthday && actors?.birthday !== null && (
                <div className="flex text-base gap-x-2 flex-wrap">
                  <p className="text-secondary">Born:</p>
                  {actors?.deathday ? (
                    <p className="text-primary">{formattedDate}</p>
                  ) : (
                    <p className="text-primary">
                      {formattedDate} - ({ageYears} years)
                    </p>
                  )}
                </div>
              )}

              {actors?.place_of_birth && (
                <div className="flex text-base gap-x-2 flex-wrap">
                  <p className="text-secondary">Place of birth:</p>
                  <p className="text-primary">{actors?.place_of_birth}</p>
                </div>
              )}
              {actors?.known_for_department && (
                <div className="flex text-base gap-x-2">
                  <p className="text-secondary">Known For:</p>
                  <p className="text-primary">{actors?.known_for_department}</p>
                </div>
              )}
              {actors?.deathday && (
                <div className="flex text-base gap-x-2">
                  <p className="text-secondary">Died</p>
                  <p className="text-primary">{formattedDeathday}</p>
                </div>
              )}
            </figure>

            {actors?.imdb_id && (
              <div className="mt-4 flex sm:justify-start justify-center">
                <a
                  target="_blank"
                  href={`https://www.imdb.com/name/${actors?.external_ids?.imdb_id}`}
                  className=" hover:btn-primary border-2 btn !w-[133px] !min-h-[45px] max-h-[45px] btn-outline btn-secondary"
                >
                  IMDB Profile
                </a>
              </div>
            )}
          </div>
        </article>
        {actors?.biography && (
          <section className="flex-[2] sm:px-8 px-6 rounded-md  py-6 bg-info  self-start text-primary ">
            <div className="mb-3 text-xl font-semibold title-2 ">
              {actors?.name}
            </div>
            <p className="flex ">{actors?.biography}</p>
          </section>
        )}
      </section>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex flex-col min-h-[100vh]  "
      >
        <div>
          <h3
            ref={ref}
            className=" sm:ml-3 ml-0 sm:text-3xl text-[26px] font-semibold text-primary  pb-10  "
          >
            Filmography
          </h3>

          {isError ? (
            <div className="ml-4 text-xl text-red-400">Error 502</div>
          ) : currentItems?.length == 0 ? (
            <LoadingRow minHeight={660} />
          ) : (
            <div className="w-full flex items-center sm-movie-card ">
              <motion.div
                className="md:px-6 sm:px-4 px-0  dd grid gap-x-8 md:gap-y-12 gap-y-4 w-full justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                {currentItems?.map((item, i) => (
                  <Movie movie={item} key={item.id} />
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Biography;
