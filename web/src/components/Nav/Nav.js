import React from "react";
import logo from "../Template/logo.png";
import "./Nav.css";
import CreateTemplate from "../CreateTemplate/CreateTemplate";

export default function Nav() {
  return (
    <nav className="Nav">
      <div className="Nav-container">
        <div>
          <a href="https://www.instagram.com/greengodictionary/">
            <img src={logo} className="Nav-logo" />
            greengo dictionary
          </a>
        </div>
        <div>
          <CreateTemplate />
        </div>
      </div>
    </nav>
  );
}
