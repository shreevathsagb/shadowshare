import { useState } from "react";
import "../Styles/Registration.css";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [country, setcountry] = useState("");
  const [city, setcity] = useState("");
  const [password, setpassword] = useState("");
  const [password2, setpassword2] = useState("");
  const [gender, setgender] = useState("");
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const handlesubmit = async () => {
    if (
      username === "" ||
      email === "" ||
      phone === "" ||
      country === "" ||
      city === "" ||
      password === "" ||
      password2 === ""
    ) {
      alert("Fill all details");
    } else if (!emailRegex.test(email)) {
      alert("enter valid Email");
    } else if (gender === "") {
      alert("select the gender");
    } else if (password.length < 8) {
      alert("password must contain 8 caracters");
    } else if (password !== password2) {
      alert("passwords must be same");
    } else if (phone.length < 10) {
      alert("enter valid Phone No");
    } else {
      try {
        const response = await fetch("http://localhost:8080/registeruser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: email,
            phone: phone,
            country: country,
            city: city,
            password1: password,
            gender: gender,
            status:"confirm",
          }),
        });
        if (response.ok) {
          navigate("/");
        } else {
          alert("failed to register");
        }
      } catch (error) {
        console.log("error");
      }
    }
  };
  return (
    <>
      <div className="login-container card mx-auto mt-5 p-3">
        <h1 className="text-center Dark">Shadow Share</h1>
        <div className="login-buttons">
          <button
            className="btn btn-primary mx-auto mt-5 mb-3"
            onClick={() => {
              navigate("/");
            }}
          >
            Log in
          </button>
          <button className="btn btn-primary mx-auto mt-5 mb-3" disabled>
            Register
          </button>
        </div>
        <input
          className="form-control my-2"
          value={username}
          onChange={(e) => {
            setusername(e.target.value);
          }}
          placeholder="Username"
        />
        <input
          className="form-control my-2"
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
          }}
          placeholder="E-mail"
        />
        <input
          className="form-control my-2" maxLength="10" minLength="10"
          value={phone}
          onChange={(e) => {
            setphone(e.target.value);
          }}
          placeholder="Phone No"
        />
        <input
          className="form-control my-2"
          value={country}
          onChange={(e) => {
            setcountry(e.target.value);
          }}
          placeholder="Country"
        />
        <input
          className="form-control my-2"
          value={city}
          onChange={(e) => {
            setcity(e.target.value);
          }}
          placeholder="City"
        />
        <input
          type="password"
          className="form-control my-2"
          value={password}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
          placeholder="Password"
        />
        <input
          type="password"
          className="form-control my-2"
          value={password2}
          onChange={(e) => {
            setpassword2(e.target.value);
          }}
          placeholder="Confirm Password"
        />
        <div>
          <p id="gender-regis" className="mt-3">
            Gender
          </p>
        </div>
        <div id="div-regis">
          <input
            type="radio"
            className="radio-color"
            name="gender"
            value="Male"
            checked={gender === "Male"}
            onChange={(e) => {
              setgender(e.target.value);
            }}
          />
          <p id="radio-p">Male</p>
          <input
            type="radio"
            className="radio-color"
            name="gender"
            value="Female"
            checked={gender === "Female"}
            onChange={(e) => {
              setgender(e.target.value);
            }}
          />
          <p id="radio-p">Female</p>
          <input
            type="radio"
            className="radio-color"
            name="gender"
            value="Others"
            checked={gender === "Others"}
            onChange={(e) => {
              setgender(e.target.value);
            }}
          />
          <p id="radio-p">Others</p>
          <input
            type="radio"
            className="radio-color"
            name="gender"
            value="Prefer not to say"
            checked={gender === "Prefer not to say"}
            onChange={(e) => {
              setgender(e.target.value);
            }}
          />
          <p id="radio-p">Prefer not to say</p>
        </div>
        <div></div>
        <button className="btn btn-dark" onClick={handlesubmit}>
          Sign Up
        </button>
      </div>
    </>
  );
}
