import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <header className="App-header">
      <Link to="/">index</Link>
      <Link to="/popular">popular</Link>
    </header>
  );
};

export default Header;
