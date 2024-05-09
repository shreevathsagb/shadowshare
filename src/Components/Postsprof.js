import React, { useState } from "react";
import Postpopup from "./Postpopup";
import FileReader from "./Filereader";
export default function Postsprof(props) {
  const [Postpop, setPostpop] = useState(false);
  return (
    <>
      <div className="opinion-post" key={props.index} onClick={() => {
          setPostpop(true);
        }}>
      {<FileReader media={props.item.media} id1="post-image" key={props.index}/>}
      </div>
      {Postpop && <Postpopup item={props.item} setPostpop={setPostpop} />}
    </>
  );
}
