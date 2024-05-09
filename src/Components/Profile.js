import React, { useCallback, useContext, useEffect } from "react";
import "../Styles/Profile.css";
import axios from "axios";
import Addpost from "./Addpost";
import Editprofile from "./Editprofile";
import { useState } from "react";
import Postsprof from "./Postsprof";
import { Usercontext } from "../Usercontext";

const Profile = (props) => {
  const { user } = useContext(Usercontext);
  const username = user.username;
  const [ppost, setppost] = useState([]);
  const [following, setfollowing] = useState(false);
  const [flist, setflist] = useState([]);
  const loadposts = async () => {
    const result = await axios.get(
      `http://localhost:8080/profileposts/${username}`
    );
    const res = await axios.get(
      `http://localhost:8080/findfollowers/${username}`
    );
    setflist(res.data);
    setppost(result.data);
  };
  useEffect(() => {
    loadposts();
  });
  return (
    <div
      className="profile-container"
      style={{
        left: props.notify === true ? "30%" : "40%",
      }}
    >
      <div className="profile-header">
        <img src={user.profile} alt="profile" className="profile-pimg mt-3" />
        <h2 className="profile-username mt-2">Anonymous User</h2>
        <br />
        <br></br>
        <div id="posts-no">
          <p id="posts-name">Posts:</p>
          <p>&nbsp;{ppost.length}</p>&nbsp; &nbsp; &nbsp;
          <div>
            <button
              className="btn btn-primary mx-3"
              onClick={() => {
                props.setedit_profile(true);
              }}
            >
              Edit
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                if (!following) {
                  setfollowing(true);
                } else {
                  setfollowing(false);
                }
              }}
            >
              Following
            </button>
          </div>
          <div>
            <button
              className="btn btn-primary mx-3"
              onClick={() => {
                props.setPopupOpen(true);
              }}
            >
              Add Post
            </button>
          </div>
        </div>
        {following === true ? (
          <div className="aligne">
            {flist.map((item, index) => {
              return (
                <Followering item={item} index={index} user={user} />
              );
            })}
          </div>
        ) : null}
      </div>

      {following === false ? (
        <div className="opinion-grid">
          {ppost.map((item, index) => {
            return <Postsprof item={item} index={index} key={index} />;
          })}
        </div>
      ) : null}

      <div>
        {props.isPopupOpen && <Addpost setPopupOpen={props.setPopupOpen} />}
      </div>
      <div>
        {props.edit_profile && (
          <Editprofile setedit_profile={props.setedit_profile} />
        )}
      </div>
    </div>
  );
};
export default Profile;
const Followering = (props) => {
  const [prof, setprof] = useState("");
  const profile = useCallback(async () => {
    const axio = await axios.get(`http://localhost:8080/findprofile/${props.item.followto}`);
    setprof(axio.data)
  }, [props.item.followto])
  useEffect(() => { profile() }, [profile])
  const unfollow = async () => {
    try {
      const response = await fetch("http://localhost:8080/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          followby: props.user.username,
          followto: props.item.followto,
        })
      });
      if (response.ok) {
        console.log("unfollow")
      } else {
        alert("failed to follow");
      }
    } catch (error) {
      console.log("error");
    }
  }
  return (
    <div className="follow-contain mt-4">
      <img src={prof} alt="profile" className="prof-image mx-2" />
      <button className="btn text-primary" onClick={unfollow}><strong>Unfollow</strong></button>
    </div>
  )
}
