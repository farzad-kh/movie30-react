import React from 'react';

const GridCol = ({children}) => {
    return (
        <div className="grid w-full xl:grid-cols-[250px_minmax(0,_4fr)] grid-cols-[0_minmax(0,_4fr)] transition-all duration-500  ">
            {children}
        </div>
    );
};

export default GridCol;