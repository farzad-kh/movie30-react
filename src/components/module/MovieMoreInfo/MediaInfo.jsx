import React from 'react';

const MediaInfo = ({movieOrSeriInfo,iconMedia,title,value}) => {


    return (
       
       <>
       
        {movieOrSeriInfo?.length !== 0 && (
        <figure className="  sm:text-base text-sm flex items-center font-semibold   gap-x-1 gap-y-2 flex-wrap  mb-[14px]">
        {iconMedia}
          <div className=" mr-2">{title}</div>
          {movieOrSeriInfo?.map((item, i) => (
            <div key={item.name} className="flex">
              <p  className="title-2 ">
                {item?.[value]}
              </p>

             
              {i + 1 === movieOrSeriInfo?.length ? (
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
       </>
    );
};

export default MediaInfo;


