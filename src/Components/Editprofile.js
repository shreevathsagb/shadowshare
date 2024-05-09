import "../Styles/Editprofile.css";
import { useState, useContext, useEffect } from "react";
import { Usercontext } from "../Usercontext";
import axios from "axios";

export default function Editprofile(props) {
  const { user } = useContext(Usercontext);
  const [username, setusername] = useState(user.username);
  const [email, setemail] = useState(user.email);
  const [password, setpassword] = useState(user.password1);
  const [password2, setpassword2] = useState(user.password1);
  const [Changepass, setChangepass] = useState(false);
  const [phone, setphone] = useState(user.phone);
  const [country, setcountry] = useState(user.country);
  const [city, setcity] = useState(user.city);
  const [pdp, setpdp] = useState(user.profile);
  const [selected,setSelected]=useState(false)
  const gender = user.gender;

  const handlemedia = (e) => {
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setpdp(reader.result);
    };
  };


  async function handlechange() {
    if (username === "" ||
      email === "" ||
      password === "" ||
      password2 === "") {
      alert("Fill all details");
    } else {
      try {
        const response = await axios.put("http://localhost:8080/updateuser", {
          username: username,
          email: email,
          phone: phone,
          country: country,
          city: city,
          gender: gender,
          password1: password,
          profile: pdp,
          status: user.status
        });
        alert(response.data);
      } catch (err) {
        alert(err.response.data);
      }
    }
  }

  return (
    <>
      <div
        id="addpost-contain"
        onClick={() => {
          props.setedit_profile(false);
        }}
      ></div>
      <div id="editprofile-container" className="card">
        <div id="close-edit">
          <span
            className="item-clos"
            onClick={() => {
              props.setedit_profile(false);
            }}
          >
            &times;
          </span>
        </div>
        <img src={user.profile} alt="profile" className="profile-pimg mt-5" />
        <h1 className="edit-h1">Edit Profile</h1>
        <label className="label-edit">Change profile</label>
        <br />
        <input
          type="file"
          accept="image/*"
          className="form-control w-50"
          id="edit-username"
          onChange={handlemedia}
        />
        <div>
          <label className="label-edit">Username</label>
          <br />
          <input
            id="edit-username"
            type="text"
            value={username}
            onChange={(e) => {
              setusername(e.target.value);
            }}
            className="input-edit form-control"
          />
        </div>
        <div>
          <label className="label-edit">E-mail</label>
          <br />
          <input
            id="edit-username"
            type="email"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            className="input-edit form-control"
          />
        </div>
        <div>
          <label className="label-edit">Phone No</label>
          <br />
          <input
            id="edit-username"
            type="text"
            value={phone}
            onChange={(e) => {
              setphone(e.target.value);
            }}
            className="input-edit form-control"
          />
        </div>
        <div>
          <label className="label-edit">Country</label>
          <br />
          <input
            id="edit-username"
            type="text"
            value={country}
            onChange={(e) => {
              setcountry(e.target.value);
            }}
            className="input-edit  form-control"
          />
        </div>
        <div>
          <label className="label-edit">City</label>
          <br />
          <input
            id="edit-username"
            type="text"
            value={city}
            onChange={(e) => {
              setcity(e.target.value);
            }}
            className="input-edit  form-control"
          />
        </div>
        <div>
          <button
            onClick={() => {
              setChangepass(!Changepass);
            }}
            className="button-edit btn btn-primary"
          >
            Change password
          </button>
        </div>
        {Changepass && (
          <div>
            <input
              type="password"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              placeholder="Password"
              className="input-edit form-control"
            />
            <br></br>
            <br />
            <input
              type="password"
              onChange={(e) => {
                setpassword2(e.target.value);
              }}
              placeholder="Confirm Password"
              className="input-edit form-control"
            />
          </div>
        )}
        <div>
          <button
            onClick={handlechange}
            className="button-edit btn btn-primary"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
