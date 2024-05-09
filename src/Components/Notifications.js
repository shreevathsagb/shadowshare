import React from "react";import axios from "axios";
import { useState, useEffect } from "react";
export default function Notifications(props) {
  const loadnotification = async () => {
    const results = await axios.get("http://localhost:8080/getnotifications");
    setnotification(results.data);
  };
  const [notification, setnotification] = useState([]);
  useEffect(() => {
    loadnotification();
  }, []);
  return (
    <>
      <span
        className="item-close"
        onClick={() => {
          props.setnotify(false);
        }}
      >
        &times;
      </span>
      <table>
        <thead>
          <tr>
            <th id="tablehead">Notifications</th>
          </tr>
        </thead>
        <tbody>
          {notification.map((item, index) => {
            return (
              <tr key={index}>
                <td className="tablerow">
                  <li id="li-notify">{item.notify}</li>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

