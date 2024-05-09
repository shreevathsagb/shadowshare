import { useState, useEffect, useContext, useCallback } from "react";
import "../Styles/Home.css";
import Addpost from "./Addpost";
import Sharepage from "./Sharepage";
import Posts from "./Posts.js";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { Usercontext } from "../Usercontext.js";
export default function Home(props) {
  const { user } = useContext(Usercontext);
  const [Post, setPost] = useState([]);
  const [share, setshare] = useState(false);
  const [search, setsearch] = useState("");
  
  const loadpost = useCallback(async () => {
    const result = await axios.get("http://localhost:8080/getpost");
    const res = result.data.filter((use) => use.username !== user.username);
    setPost(res);
}, [user.username]);

useEffect(() => {
    loadpost(); 
}, [loadpost]);

  return (
    <>
      <span id="span">
        <div
          id="pc1"
          className=""
          style={{
            "marginLeft": props.notify === true ? "30%" : "40%",
          }}
          
        >
          <p>{props.notify}</p>
          {Post.map((item, index) => {
            return (
              <Posts
                item={item}
                index={index}
                setshare={setshare}
                setPost={setPost}
                key={index}
              />
            );
          })}
        </div>
        {props.isPopupOpen && <Addpost setPopupOpen={props.setPopupOpen} />}
        <div>{share && <Sharepage setshare={setshare} />}</div>
      </span>
      <div className="header rounded-top">
        <input
          type="text"
          placeholder="Type here to Search...."
          id="search-main"
          className="rounded-start"
          value={search}
          onChange={(e) => {
            setsearch(e.target.value);
          }}
        />
        <button
          id="button-main"
          className="rounded-end"
          onClick={async () => {
            if (search === "") {
              alert("search space can't be null");
            } else {
              const po = await axios.get(
                `http://localhost:8080/search/${search}`
              );
              setPost(po.data);
            }
          }}
        >
          <FaSearch />
        </button>
      </div>
    </>
  );
}