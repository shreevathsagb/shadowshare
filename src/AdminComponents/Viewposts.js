import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Styles/viewposts.css"
import FileReader from "../Components/Filereader";
export default function Viewposts() {
  const [posts, setposts] = useState([]);
  useEffect(() => {
    loadposts();
  }, []);
  const loadposts = async () => {
    const result = await axios.get("http://localhost:8080/getadminpost");
    setposts(result.data);
  };
  return (
    <>
          {posts.map((item, index) => {
            return (
              <div className=" card rounded m-3" id="vp-container">
                <h4 className="m-5">Post:</h4>
                <div>
                <FileReader media={item.media} id1="image-vp"/>
                </div>
                <h4 className="m-5">Info:</h4>
                <div className="div-vp">
                <p>username:&nbsp;{item.username}</p>
                <p>caption:&nbsp;{item.caption}</p>
                <p>likes:&nbsp;{item.likes}</p>
                <p>genre:&nbsp;{item.genre}</p>
                <p>report:&nbsp;{item.report}</p>
                <button className="btn btn-danger" onClick={async () => {
                      const bol=window.confirm();
                      if(bol){
                      await axios.delete(
                        `http://localhost:8080/deleltepost/${item.id}`
                      );
                      window.location.reload();}}}>Delete Post</button>
                </div></div>
            );
          })}
    </>
  );
}