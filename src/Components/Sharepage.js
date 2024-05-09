import React from "react";
import "../Styles/share.css";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";
export default function Sharepage(props) {
  const pageurl = window.location.href;
  return (
    <>
      <div
        id="addpost-contain"
        onClick={() => {
          props.setshare(false);
        }}
      ></div>
      <span className="share-span">
        <h3 className="share-head">Share</h3>
        <hr />
        <FacebookShareButton className="share-button" url={pageurl}>
          <FacebookIcon className="share-icon" /> &nbsp;Facebook
        </FacebookShareButton>
        <br />
        <TwitterShareButton className="share-button" url={pageurl}>
          <TwitterIcon className="share-icon" /> &nbsp;Twitter
          &nbsp;&nbsp;&nbsp;
        </TwitterShareButton>
        <br />
        <p
          onClick={() => {
            props.setshare(false);
          }}
          id="cancel"
        >
          Cancel
        </p>
      </span>
    </>
  );
}
