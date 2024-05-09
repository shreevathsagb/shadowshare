import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Styles/Login.css";
import { Usercontext } from "../Usercontext";
export default function Login(props) {
  const { setuser } = useContext(Usercontext);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const handlelogin = async () => {
   
      try {
        const response = await fetch("http://localhost:8080/userlogin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password1: password,
          }),
        });
        if (response.ok) {
          const userData = await response.json();
          setuser(userData);
          navigate("/main");
        } else {
          alert("invalid credentials");
        }
      } catch (error) {
        console.log("error");
      }
    
  };
  const handlekeyPress = (e) => {
    if (e.key === "Enter") {
      handlelogin();
    }
  };
  return (
    <>
      <div className="login-container card mx-auto mt-5 p-5">
        <h1 className="text-center Dark">Shadow Share</h1>
        <div className="login-buttons">
          <button
            className="btn btn-primary mx-auto button-login my-5"
            disabled
          >
            Log in
          </button>
          <button
            className="btn btn-primary mx-auto my-5"
            onClick={() => {
              navigate("/registration");
            }}
          >
            Register
          </button>
        </div>
        <div>
          <input
            className="form-control my-4"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            onKeyDown={handlekeyPress}
            placeholder="E-mail"
          />
          <input
            type="password"
            className="form-control my-4"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            onKeyDown={handlekeyPress}
            placeholder="Password"
          />
        </div>
        <button className="btn btn-dark" onClick={handlelogin}>
          Log in
        </button>
        <p className="text-center mt-5">
          Log in as Admin &nbsp;&nbsp;<Link to="/alogin">Log in</Link>
        </p>
      </div>
    </>
  );
}
