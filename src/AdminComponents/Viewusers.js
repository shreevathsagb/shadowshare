import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Viewusers() {
  const [users, setusers] = useState([]);
  useEffect(() => {
    loadusers();
  }, []);
  const loadusers = async () => {
    const result = await axios.get("http://localhost:8080/findusers");
    setusers(result.data);
  };
  return (
    <>
      <table className="table table-bordered border-dark w-75 mt-4 mx-auto">
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">E-mail</th>
            <th scope="col">Phone</th>
            <th scope="col">City</th>
            <th scope="col">Country</th>
            <th scope="col">Password</th>
            <th scope="col">Status</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => {
            return (
              <tr key={index} className="text-center">
                <th scope="row">{item.username}</th>
                <th>{item.email}</th>
                <th>{item.phone}</th>
                <th>{item.city}</th>
                <th>{item.country}</th>
                <th>{item.password1}</th>
                <th
                  style={{ color: item.status === "pending" ? "red" : "green" }}
                >
                  {item.status}
                </th>
                <th>
                  <button
                    className="btn btn-success m-2"
                    onClick={async () => {
                      await axios.put(
                        `http://localhost:8080/blocked/${"Confirm"}/${
                          item.username
                        }`
                      );
                      window.location.reload();
                    }}
                  >
                    Unblock
                  </button>
                  <button
                    className="btn btn-danger m-2"
                    onClick={async () => {
                      await axios.put(
                        `http://localhost:8080/blocked/${"pending"}/${
                          item.username
                        }`
                      );
                      window.location.reload();
                    }}
                  >
                    Block
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
