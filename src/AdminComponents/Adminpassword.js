import React, { useContext, useState } from "react";
import { Admincontext } from "../Admincontext";

export default function Adminpassword() {

  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const {admin}=useContext(Admincontext)
  
  const updatepass = async () => {
    if(password===""||cpassword === ""){
        alert("fill both inputs")
    }else if(cpassword!==password){
        alert("password must be same")
    }else if(password.length<8){
        alert("passsword must contain 8 charecters")
    }else{
    try {
      const response = await fetch("http://localhost:8080/updatepass", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminname: admin.adminname,
          password: password,
        }),
      });
      if (response.ok) {
        alert("Password Updated");
        window.location.reload();
      } else {
        alert("failed to Update");
      }
    } catch (error) {
      alert("error");
    }}
  };
  return (
    <>
      <center className="m-5">
        <div className="card w-50 m-5 p-5 ">
          <h1>Update Password</h1>
          <input
          className="form-control m-2 w-50 mx-auto"
          type="password"
          value={password}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
          placeholder="Password"
        />
          <input
          className="form-control m-2 w-50 mx-auto"
          type="password"
          value={cpassword}
          onChange={(e) => {
            setcpassword(e.target.value);
          }}
          placeholder="Confirm Password"
        />
          <button
            className="btn btn-primary mx-auto m-3 w-50"
            onClick={updatepass}
          >
            Update Password
          </button>
        </div>
      </center>
    </>
  );
}
