import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  const [navActive, setNavActive] = useState(false);
  const [isSearchBar, setIsSearchBar] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    if (isSearchBar === true) {
      inputRef.current.focus();
    }
  }, [isSearchBar]);

  const changeNavBackColor = () => {
    if (window.scrollY > 0) {
      setNavActive(true);
    } else {
      setNavActive(false);
    }
  };

  const OpenSearchBar = () => {
    setIsSearchBar(!isSearchBar);
  };

  const OnFocus = () => {
    console.log('OnFocus');
  };

  const OnBlur = () => {
    console.log('OnBlur');
    setIsSearchBar(false);
  };

  window.addEventListener('scroll', changeNavBackColor);

  return (
    <header className={navActive ? 'header-back-color' : ''}>
      <nav className="App-header">
        <div className="left-wrap">
          <Link to="/">
            <i className="fas fa-video fa-3x"></i>
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
          <div className="search-wrap">
            <div className={isSearchBar ? 'search-bar active' : 'search-bar'}>
              <button onClick={OpenSearchBar} className="toggle-btn">
                <i className="fas fa-search"></i>
              </button>
              <form>
                <input onFocus={OnFocus} onBlur={OnBlur} ref={inputRef} />
              </form>
            </div>
          </div>
          <Link to="/my-list" className="my-list">
            <i className="fas fa-heart fa-lg"></i>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
