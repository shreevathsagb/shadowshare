import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../Styles/Amain.css";
export default function Amain() {
  return (
    <>
      <nav className="header-amain bg-primary">
        <Link className="link-amain" to="/amain/viewposts">
          Viewposts
        </Link>
        <Link className="link-amain" to="/amain/">
          Viewusers
        </Link>
        <Link className="link-amain" to="/amain/adminpassword">
          Update Password
        </Link>
        <Link className="link-amain" to="/">
          Logout
        </Link>
      </nav>
      <Outlet />
    </>
  );
}
