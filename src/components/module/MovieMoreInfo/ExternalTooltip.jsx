import React, { useContext,useState } from 'react';
import { DrawersContext } from '../../../context/DrawersContextProvider';
import ModalYoutube from "../../layout/ModalYoutube";
import { PiLinkSimpleLight } from "react-icons/pi";
import { FaInstagram, FaImdb } from "react-icons/fa";
import {  BsYoutube } from "react-icons/bs";
const ExternalTooltip = ({externalId}) => {
    const { darkMode } = useContext(DrawersContext);
    const [playTrailer, setPlayTrailer] = useState(false);
    const officialTrailer = externalId?.videos?.results.filter((item) =>
    item.name === "Official Trailer" ||
    item.name === "Official Trailer 2" ||
    item.name === "Official Trailer #2" ||
    item.name === "Teaser Trailer" ||
    item.name === "Teaser Trailer 2" ||
    item.name === "Teaser Trailer #2"
    
  );

    return (
        <figure
        className={`${
          darkMode ? "wrapper-icon-bg-dark" : "wrapper-icon-bg-ligth"
        } wrapper flex items-center font-semibold text-base    gap-y-2 flex-wrap   mt-3`}
      >
        {externalId?.external_ids?.instagram_id && (
          <>
            <a
              className="icon instagram"
              target="_blank"
              href={
                `https://www.instagram.com/${externalId?.external_ids?.instagram_id}` ||
                ""
              }
            >
              <span className="tooltip">Instagram</span>

              <FaInstagram className="text-[40px] absolute h-[21px] hover:text-[#efefef] " />
            </a>
          </>
        )}
        {externalId?.external_ids?.imdb_id && (
          <>
            <a
              className="icon imdb"
              target="_blank"
              href={`https://www.imdb.com/title/${externalId?.external_ids?.imdb_id}`}
            >
              <span className="tooltip">Imdb</span>
              <FaImdb className="text-[40px] absolute h-[21px]  hover:text-[#efefef] " />
            </a>
          </>
        )}
        {externalId?.homepage && (
          <>
            <a
              className="icon weblink"
              target="_blank"
              href={`${externalId?.homepage}`}
            >
              <span className="tooltip">Website</span>
              <PiLinkSimpleLight className="text-[40px] absolute h-[21px] hover:text-[#efefef] " />
            </a>
          </>
        )}

        {externalId?.videos?.results?.length !== 0 && (
          <>
            <a
              className="cursor-pointer icon youtube"
              target="_blank"
              onClick={() => setPlayTrailer(true)}
            >
              <span className="tooltip">Trailer</span>
              <BsYoutube className="text-[40px] absolute h-[21px] hover:text-[#efefef] " />
            </a>
            <ModalYoutube
              playTrailer={playTrailer}
              setPlayTrailer={setPlayTrailer}
              trailer={
                officialTrailer?.[0]?.key === undefined
                  ? externalId?.videos?.results?.[0]?.key
                  : officialTrailer?.[0]?.key
              }
            />
          </>
        )}
      </figure>
    );
};

export default ExternalTooltip;