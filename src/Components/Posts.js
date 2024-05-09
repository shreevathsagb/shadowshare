import React, { useCallback, useContext, useEffect, useState } from "react";
import { HiChatBubbleOvalLeft, HiHandThumbUp } from "react-icons/hi2";
import { BsFillSendFill } from "react-icons/bs";
import Commentview from "./Commentview.js";
import axios from "axios";
import { Usercontext } from "../Usercontext.js";
import Filereader from "./Filereader.js";
import { HiDotsVertical } from "react-icons/hi";
export default function Posts(props) {
  const { user } = useContext(Usercontext);
  const [likes, setlikes] = useState(props.item.likes);
  const [view, setView] = useState(false);
  const [liked, setLiked] = useState(false);
  const [profile1, setProfile1] = useState("");
  const [following, setFollowing] = useState(null);
  const [report, setreport] = useState(false);
  const handleLiked = async () => {
    try {
      if (!liked) {
        await axios.put(`http://localhost:8080/addlike/${props.item.id}`);
        setLiked(true);
        const res=  await axios.get(`http://localhost:8080/getlikes/${props.item.id}`)
        setlikes(res.data);
        
      } else {
        await axios.put(`http://localhost:8080/minuslike/${props.item.id}`);
        setLiked(false);
        const res=  await axios.get(`http://localhost:8080/getlikes/${props.item.id}`)
        setlikes(res.data);
       
      }
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  const loadUser = useCallback(async () => {
    try {
      const profile = await axios.get(
        `http://localhost:8080/getprofile/${props.item.username}`
      );
      setProfile1(profile.data);
    } catch (error) {
      console.error("Error loading user:", error);
    }
  }, [props.item.username]);
  const findfollow = useCallback(async () => {
    const result = await axios.get(
      `http://localhost:8080/following/${user.username}/${props.item.username}`
    );
    setFollowing(result.data);
  }, [user.username, props.item.username]);
  useEffect(() => {
    loadUser();
    findfollow();
  }, [loadUser, findfollow]);
  const handleFollowed = async () => {
    try {
      const response = await fetch("http://localhost:8080/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          followby: user.username,
          followto: props.item.username,
        }),
      });
      if (response.ok) {
        setFollowing(true);
      } else {
        alert("failed to follow");
      }
    } catch (error) {
      console.log("error");
    }
  };
  const handleunFollowed = async () => {
    try {
      const response = await fetch("http://localhost:8080/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          followby: user.username,
          followto: props.item.username,
        }),
      });
      if (response.ok) {
        setFollowing(false);
      } else {
        alert("failed to follow");
      }
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <div id="postcontainer" className="" key={props.index}>
      <div>
        <img src={profile1.profile} alt="dp" className="profile-img" />

        <button
          className="butti fw-lightbold text-primary"
          onClick={() => {
            following ? handleunFollowed() : handleFollowed();
          }}
        >
          <strong>{following ? "Unfollow" : "Follow"}</strong>
        </button>
        <HiDotsVertical
          className="threedots"
          onClick={() => {
            setreport(true);
          }}
        />
      </div>
      {<Filereader media={props.item.media} id1="mainimg" />}
      <div id="more">
        <div id="reaction">
          <HiHandThumbUp
            className="reacter"
            id="like-home"
            onClick={handleLiked}
          />
          <HiChatBubbleOvalLeft
            className="reacter"
            onClick={() => setView((prevView) => !prevView)}
          />
          <BsFillSendFill
            className="reacter"
            onClick={() => props.setshare(true)}
          />
        </div>
      </div>
      <p id="caption">{likes}</p>
      <p id="caption">{props.item.caption}</p>
      {view && (
        <div id="comments">
          <Commentview id={props.item.id} />
        </div>
      )}
      <hr />
      {report && (
        <>
          <div
            id="addpost-contain"
            onClick={() => {
              setreport(false);
            }}
          ></div>
          <span className="share-span">
            <h3 className="share-head">Options</h3>
            <hr/>
            <p
              className="text-center m-0 fw-bold text-danger"
              onClick={async () => {
                if (window.confirm("report")) {
                  {
                    await axios.put(
                      `http://localhost:8080/plusreport/${props.item.id}`
                    );
                  }
                }
              }}
            >
              Report
            </p>
            <hr/>
            <p className="text-center m-0" onClick={() => props.setshare(true)}>
              share
            </p>
            <hr/>
            <p
              onClick={() => {
                setreport(false);
              }}
              className="text-center "
            >
              Cancel
            </p>
          </span>
        </>
      )}
    </div>
  );
}
