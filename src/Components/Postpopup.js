import React from "react";
import { HiChatBubbleOvalLeft } from "react-icons/hi2";
import { useState } from "react";
import Commentpost from "./Commentpost.js";
import "../Styles/Postpopup.css";
import FileReader from "./Filereader.js";
import axios from "axios";
export default function Postpopup(props) {
  const [view, setview] = useState(false);
  return (
    <div>
      <div
        id="addpost-contain"
        onClick={() => {
          props.setPostpop(false);
        }}
      ></div>
      <div className="popup">
        <div className="popup-content">
          <div id="postcontainer" className="mx-auto" key={props.item.index}>
            <div className="popup-contain">
              
              <FileReader media={props.item.media} id1="mainimg"/>
              <div id="more">
                <div id="reaction">
                  <HiChatBubbleOvalLeft
                    className="reacter"
                    onClick={() => {
                      if (view === false) {
                        setview(true);
                      } else {
                        setview(false);
                      }
                    }}
                  />
                </div>
              </div>
              <p id="caption">{props.item.likes}&nbsp;likes</p>
              <p id="caption">{props.item.caption}</p>
              {view && (
                <div id="comments">
                  <Commentpost id={props.item.id}/>
                </div>
              )}
                <button className="btn btn-danger" onClick={async () => {
                      const bol=window.confirm("Are you sure?");
                      if(bol){
                      await axios.delete(
                        `http://localhost:8080/deleltepost/${props.item.id}`
                      );
                      window.location.reload();}}}>Delete Post</button>
              <hr/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
