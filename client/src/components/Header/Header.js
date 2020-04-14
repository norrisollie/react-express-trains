import React from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav/Nav";

export default function Header() {
  return (
    <div className="section header flex va">
      <Link to="/">
        <div className="title">Train Times UK</div>
      </Link>
      <Nav />
    </div>
  );
}
