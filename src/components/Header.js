import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  const [navActive, setNavActive] = useState(false);

  const changeNavBackColor = () => {
    if (window.scrollY > 0) {
      setNavActive(true);
    } else {
      setNavActive(false);
    }
  };

  window.addEventListener('scroll', changeNavBackColor);
  return (
    <header className={navActive ? 'header-back-color' : ''}>
      <nav className="App-header">
        <div className="left-wrap">
          <Link to="/">
            <i class="fas fa-video fa-3x"></i>
          </Link>
          <ul>
            <li>
              <NavLink
                to="/now-playing"
                className={({ isActive }) => (isActive ? 'active' : 'nav-tab')}
              >
                now-playing
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/popular"
                className={({ isActive }) => (isActive ? 'active' : 'nav-tab')}
              >
                popular
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/upcoming"
                className={({ isActive }) => (isActive ? 'active' : 'nav-tab')}
              >
                upcoming
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="right-wrap">
          <button>검색</button>
          <Link to="/my-list">my-list</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
