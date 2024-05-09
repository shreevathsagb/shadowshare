import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Admincontext } from "../Admincontext";
export default function Alogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {setadmin} =useContext(Admincontext);
  const handleLogin = async  ()=> {
    if (username === "" || password === "") {
      alert("Fill in all details");
    } else if (password.length < 8) {
      alert("Password must contain at least 8 characters");
    } else {
      try {
        const response = await fetch("http://localhost:8080/adminlogin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            adminname: username,
            password: password,
          }),
        });

        if (response.ok) {
           const userData = await response.json();
           setadmin(userData);
           navigate("/amain");
         } else  {
           alert("invalid credentials or your blocked by admin");
        }
        console.log(response);
      } catch (error) {
        console.error("Error:", error);
        alert("error");
      }
    }
  };
  const handlekeyPress=(e)=>{
    if(e.key === "Enter"){
      handleLogin();
    }
  };

  return (
    <div>
      <form className="card mx-auto w-50 h-100 m-5 p-3" onSubmit={handleLogin}>
        <h3 className="text-center">Admin Login</h3>
        <input
          placeholder="Admin name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handlekeyPress}
          className="mx-auto m-3 w-75 form-control"
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handlekeyPress}
          className="mx-auto m-3 w-75 form-control"
        />
        <button
          type="button"
          className="btn btn-primary mx-auto w-75 m-3"
          onClick={handleLogin}
        >
          Log in
        </button>
      </form>
    </div>
  );
}
