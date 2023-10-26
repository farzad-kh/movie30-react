export const bgProfile=(item)=>{
    const letter=item.toUpperCase()
   
if (letter==="A" || letter==="B"||letter==="C"||letter==="D"||letter==="E") {
   return "#3379b8ed"
}else if(letter==="F"||letter==="G" ||letter==="H" ||letter==="I"||letter==="J"){
    return "#bc3838ed" 
}else if(letter==="K"||letter==="K"||letter==="L"||letter==="M"||letter==="N"){
    return "#814b9a"
}else if(letter==="O"||letter==="P"||letter==="Q"||letter==="R"||letter==="S"){
    return "#474646"
}else if(letter==="T"||letter==="U"||letter==="Y"||letter==="W"){
    return "#ab4287"
}else if(letter==="X"||letter==="V"||letter==="Z"){
    return "#458943"
}else{
    return "#919133"
}
}