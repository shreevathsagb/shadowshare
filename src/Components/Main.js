import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Notifications from "./Notifications";
import { HiLogout } from "react-icons/hi";
import { HiMiniUserCircle, HiMiniPlusCircle } from "react-icons/hi2";
import { MdNotifications } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import "../Styles/Home.css";
import { Usercontext } from "../Usercontext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
export default function Main(props) {
  const { user } = useContext(Usercontext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/getnotify");
        const data = res.data;
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <nav className="first-div">
        <p id="first">Shadow Share</p>
        <MdNotifications
          className="notify-main"
          onClick={() => {
            if (props.notify === false) {
              props.setnotify(true);
            } else {
              props.setnotify(false);
            }
          }}
        />
        <img
          src={user.profile}
          alt="profile"
          className="profile-image"
          onClick={() => {
            navigate("/main/profile");
          }}
        />
      </nav>
      <div id="left">
        <button
          className="options"
          onClick={() => {
            navigate("/main");
          }}
        >
          <FaHome />
          &nbsp;Home
        </button>
        <button
          className="options"
          onClick={() => {
            if (props.isPopupOpen === false) {
              props.setPopupOpen(true);
            } else {
              props.setPopupOpen(false);
            }
          }}
        >
          <HiMiniPlusCircle />
          &nbsp;&nbsp;Add post
        </button>
        <button
          className="options"
          onClick={() => {
            if (props.notify === false) {
              props.setnotify(true);
            } else {
              props.setnotify(false);
            }
          }}
        >
          <MdNotifications />
          &nbsp;&nbsp;Notification
        </button>
        <button
          className="options"
          onClick={() => {
            navigate("/main/profile");
          }}
        >
          <HiMiniUserCircle />
          &nbsp;&nbsp;Profile
        </button>
        <button
          onClick={() => {
            if (window.confirm("your loging out")) {
              navigate("/");
            }
          }}
          className="options"
        >
          <HiLogout />
          &nbsp;&nbsp;Log out
        </button>
      </div>
      {props.notify && (
        <div id="right">
          <Notifications setnotify={props.setnotify} />
        </div>
      )}
      <Outlet notify={props.notify} />
      <ToastContainer />
    </>
  );
}
