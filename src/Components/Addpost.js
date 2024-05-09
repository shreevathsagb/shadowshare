import React, { useContext, useState } from "react";
import "../Styles/Addpost.css";
import { Button } from "react-bootstrap";
import { Usercontext } from "../Usercontext";
export default function Addpost(props) {
  const {user}= useContext(Usercontext);
  const [caption, setcaption] = useState("");
  const [media, setmedia] = useState("");
  const [genre, setgenre] = useState("movies");
  const genres = ["movies", "god", "music", "entertainment", "memes"];
  const handlemedia = (e) => {
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setmedia(reader.result);
    };
  };
  const handlepost = async () => {
    if (caption === "") {
      alert("caption cant be empty");
    } else if (media === "") {
      alert("upload images");
    } else {
      try {
        const response = await fetch("http://localhost:8080/addpost", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: user.username,
            likes: 0,
            caption: caption,
            media: media,
            genre: genre,
          }),
        });
        if (response.ok) {
          alert("posted");
          props.setPopupOpen(false);
        } else {
          alert("failed to Post");
        }
      } catch (error) {
        console.log("error");
      }
    }
  };
  return (
    <div id="AddPost">
      <div
        id="addpost-contain"
        onClick={() => {
          props.setPopupOpen(false);
        }}
      ></div>
      <div className="popup">
        <div className="popup-content">
          <span
            className="close"
            onClick={() => {
              props.setPopupOpen(false);
            }}
          >&times;
          </span>
          <h2>Create Post</h2>
          <center>
            <label>
              <b>Select Photos</b>
            </label>
            <input
              type="file"
              className="form-control"
              id="formFile"
              accept="image/* vedio/*"
              onChange={handlemedia}
            ></input>
            <br></br>
          </center>
          <label>
            <b>Caption</b>
          </label>
          <textarea
            className="form-control"
            value={caption}
            onChange={(e) => {
              setcaption(e.target.value);
            }}
          />
          <br></br>
          <br></br>
          <label>
            <b>Topic</b>
          </label>
          <select
            className="form-select"
            aria-label="select example"
            value={genre}
            onChange={(e) => {
              setgenre(e.target.value);
            }}
          >
            {genres.map((item, index) => {
              return <option key={index}>{item}</option>;
            })}
          </select>
          <br></br>
          <br></br> <Button onClick={handlepost}>Create</Button>
        </div>
      </div>
    </div>
  );
}