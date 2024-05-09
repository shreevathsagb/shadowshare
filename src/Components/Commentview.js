import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../Styles/Comment.css";
import { IoSend } from "react-icons/io5";
import { Usercontext } from "../Usercontext";
export default function CommentView(props) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { user } = useContext(Usercontext);
  const pid = props.id;
  const handleComment = async () => {
    if (comment === "") {
      alert("Comments can't be empty");
    } else {
      try {
        const response = await fetch("http://localhost:8080/postcomments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postid: pid,
            commente: comment,
            username: user.username,
          }),
        });
        if (response.ok) {
          loadComments(pid);
          setComment("");
        } else {
          alert("failed to register");
        }
      } catch (error) {
        console.log("error");
      }
    }
  };
  const loadComments = async (id) => {
    try {
      const result = await axios.get(`http://localhost:8080/getcomments/${id}`);
      setComments(result.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    loadComments(pid);
  }, [pid]);
  return (
    <div id="main-comment">
      <div className="d-flex">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a Comment...."
          id="textarea-comment"
          className="form-control w-75 m-1"
        />
        <button onClick={handleComment} id="add-comment">
          <IoSend className="comment-icons" />
        </button>
      </div>
      {comments.map((item, index) => (
  <div className="row" key={index}>
    <div className="col">
      <p id="caption">
        {item.commente}
      </p>
    </div>
    <div className="col">
    </div>
  </div>
))}
    </div>
  );
}
