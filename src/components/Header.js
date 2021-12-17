import React, { Fragment, useEffect, useRef, useState } from 'react';
import './Header.scss';
import { BrowserView, MobileView, isMobile } from 'react-device-detect';
import { useMediaQuery } from 'react-responsive';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  const [isShow, setIsShow] = useState(true);
  const [isDrop, setIsDrop] = useState(false);
  let prevScrollpos = window.pageYOffset;
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isSmallWitdh = useMediaQuery({ query: '(max-width: 575px)' });
  const mobNavRef = useRef();
  const navIcRef = useRef();

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousedown', closeMobNav);
    return () => {
      console.log('컴포넌트 종료');
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', closeMobNav);
    };
  }, []);

  const handleScroll = () => {
    var currentScrollPos = window.pageYOffset;

    if (isMobile) {
      if (currentScrollPos < 64) {
        setIsShow(true);
        setIsDrop(false);
      } else {
        if (prevScrollpos > currentScrollPos) {
          setIsShow(true);
          setIsDrop(false);
        } else {
          setIsShow(false);
        }
      }
    } else {
      if (prevScrollpos > currentScrollPos) {
        setIsShow(true);
        setIsDrop(false);
      } else {
        setIsShow(false);
      }
    }

    prevScrollpos = currentScrollPos;
  };

  const closeMobNav = event => {
    // 해당 박스 존재유무 파악
    if (!!mobNavRef.current) {
      // 해당 박스 영역 외에서 클릭했을시
      if (!mobNavRef.current.contains(event.target)) {
        // 아이콘 영역 외에서만 동작시키기위해
        if (!navIcRef.current.contains(event.target)) {
          setIsDrop(false);
        }
      }
    }
  };

  const openDropNav = () => {
    setIsDrop(!isDrop);
  };

  return (
    <Fragment>
      {isMobile ? (
        <header className={isShow ? 'mob-header' : 'mob-header hide'}>
          <div className="header-items">
            <div className="left-wrap">
              {isTabletOrMobile && (
                <button className="nav-open-btn" onClick={openDropNav} ref={navIcRef}>
                  <i className="fas fa-bars"></i>
                </button>
              )}
              <Link to="/" className="main-ic">
                <i className="fas fa-video"></i>
              </Link>
              {!isTabletOrMobile && <NavList name={null} reference={null} />}
            </div>
            <div className="right-wrap">
              <form>
                <input type="text" placeholder="검색" />
              </form>
            </div>
            {isTabletOrMobile && isDrop && isShow && (
              <NavList name={'nav-dropdown'} reference={mobNavRef} />
            )}
          </div>
        </header>
      ) : (
        <header className={isShow ? 'pc-header' : 'pc-header hide'}>
          <div className="header-items">
            <div className="left-wrap">
              <Link to="/" className="main-ic">
                <i className="fas fa-video"></i>
              </Link>
              {isSmallWitdh ? (
                <div className="dropdown-wrap">
                  <button className="dropdown-btn">메뉴</button>
                  <NavList name={'contents'} reference={null} />
                </div>
              ) : (
                <NavList name={null} reference={null} />
              )}
            </div>
            <div className="right-wrap">
              <form>
                <input type="text" placeholder="검색" />
              </form>
            </div>
          </div>
        </header>
      )}
    </Fragment>
  );
};

const NavList = props => {
  const { name, reference } = props;

  return (
    <ul className={name} ref={reference}>
      <li>
        <NavLink to="/now-playing" className={({ isActive }) => (isActive ? 'active' : 'nav-tab')}>
          현재 상영 중
        </NavLink>
      </li>
      <li>
        <NavLink to="/popular" className={({ isActive }) => (isActive ? 'active' : 'nav-tab')}>
          인기
        </NavLink>
      </li>
      <li>
        <NavLink to="/upcoming" className={({ isActive }) => (isActive ? 'active' : 'nav-tab')}>
          개봉 예정
        </NavLink>
      </li>
      <li>
        <NavLink to="/my-list" className={({ isActive }) => (isActive ? 'active' : 'nav-tab')}>
          찜한 콘텐츠
        </NavLink>
      </li>
    </ul>
  );
};

export default Header;
