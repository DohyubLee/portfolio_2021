import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <header>
      <div className="App-header">
        <Link to="/">index</Link>
        <Link to="/popular">popular</Link>
      </div>
    </header>
  );
};

export default Header;
