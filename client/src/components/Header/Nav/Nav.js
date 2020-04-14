import React from "react";
import { Link, useHistory } from "react-router-dom";

import { logOut, getSession } from "../../../auth";
const session = getSession();

export default function Nav() {
  let history = useHistory();
  return (
    <div className="nav-wrapper">
      <Link to="/">Home</Link>
      <Link to="/stations">Stations List</Link>
      <Link to="/login">Log In</Link>
      <Link
        to="/login"
        onClick={() => {
          logOut();
          history.push("/");
        }}
      >
        Log Out
      </Link>
    </div>
  );
}
