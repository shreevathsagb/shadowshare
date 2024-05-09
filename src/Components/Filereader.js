import { useCallback, useEffect, useState } from "react";

export default function FileReader(props) {
  const media = props.media;
  const [filetype, setFiletype] = useState(null);

  const readFile = useCallback(() => {
    if (media.startsWith('data:image')) {
      setFiletype('image');
    } else {
      setFiletype('video');
    }
  }, [media]);

  useEffect(() => {
    readFile();
  }, [media, readFile]);

  return (
    <>
      {filetype === 'image' ? (
        <img src={props.media} alt="post imag" id={props.id1}/>
      ) : filetype === 'video' ? (
   <video controls loop  id={props.id1} >
          <source src={props.media}/>
          Your browser does not support the video tag.
        </video>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
