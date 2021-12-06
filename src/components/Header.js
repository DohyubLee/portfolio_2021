import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import './Header.scss';

const Header = () => {
  const [navActive, setNavActive] = useState(false);
  const [isSearchBar, setIsSearchBar] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const inputRef = useRef();
  const mobNavRef = useRef();
  const navIcRef = useRef();
  const [openMobNav, setOpenMobNav] = useState(false);

  useEffect(() => {
    if (isSearchBar === true) {
      inputRef.current.focus();
    }
  }, [isSearchBar]);

  useEffect(() => {
    window.addEventListener('scroll', changeNavBackColor);
    window.addEventListener('mousedown', closeMobNav);

    return () => {
      console.log('이 컴포넌트 사라질때');
    };
  }, []);

  const closeMobNav = event => {
    if (!!mobNavRef.current) {
      // 해당 박스 존재유무 파악
      if (!mobNavRef.current.contains(event.target)) {
        // 해당 박스 영역 외에서 클릭했을시
        if (!navIcRef.current.contains(event.target)) {
          // 아이콘 영역 외에서만 동작시키기위해
          setOpenMobNav(false);
        }
      }
    }
  };

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

  const OnBlurSearchBar = () => {
    console.log('OnBlur');
    setIsSearchBar(false);
  };

  const OpenMobNavSelect = () => {
    setOpenMobNav(!openMobNav);
  };

  return (
    <header className={navActive ? 'header-back-color' : ''}>
      <nav className="App-header">
        <div className="left-wrap">
          <Link to="/">
            <i className="fas fa-video"></i>
          </Link>
          {isTabletOrMobile ? (
            <div className="menu-wrap" ref={navIcRef}>
              <button onClick={OpenMobNavSelect} className="ic-btn">
                <i className="fas fa-bars fa-lg"></i>
              </button>
            </div>
          ) : (
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
          )}
        </div>
        <div className="right-wrap">
          <div className="search-wrap">
            <div className={isSearchBar ? 'search-bar active' : 'search-bar'}>
              <button onClick={OpenSearchBar} className="toggle-btn">
                <i className="fas fa-search"></i>
              </button>
              <form>
                <input onFocus={OnFocus} onBlur={OnBlurSearchBar} ref={inputRef} />
              </form>
            </div>
          </div>
          <Link to="/my-list" className="my-list">
            <i className="fas fa-heart fa-lg"></i>
          </Link>
        </div>
        {isTabletOrMobile && (
          <div ref={mobNavRef} className="mob-nav-wrap">
            <ul>
              <li className={openMobNav ? 'mob-nav-active' : ''}>
                <NavLink
                  to="/now-playing"
                  className={({ isActive }) => (isActive ? 'active' : 'nav-tab')}
                >
                  now-playing
                </NavLink>
              </li>
              <li className={openMobNav ? 'mob-nav-active' : ''}>
                <NavLink
                  to="/popular"
                  className={({ isActive }) => (isActive ? 'active' : 'nav-tab')}
                >
                  popular
                </NavLink>
              </li>
              <li className={openMobNav ? 'mob-nav-active' : ''}>
                <NavLink
                  to="/upcoming"
                  className={({ isActive }) => (isActive ? 'active' : 'nav-tab')}
                >
                  upcoming
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
