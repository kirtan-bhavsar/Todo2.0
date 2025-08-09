import React, { useState } from 'react'

const DropArea = ({show}) => {

    // const [showDropArea,setShowDropArea] = useState(true);

  // return (
  //   <div onDragEnter={() => {
  //       setShowDropArea(true);
  //       console.log(`drop area : ${showDropArea}`);
  //   }} onDragLeave={() => setShowDropArea(false)} className={showDropArea ? "drop-area" : "hide-drop-area"}></div>
  // )

  return(
    <div className={show ? "drop-area" : "hide-drop-area"}></div>
  )
}

export default DropArea