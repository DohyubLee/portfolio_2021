import React, { useEffect, useState } from 'react';
import './Header.scss';
import { BrowserView, MobileView, isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isShow, setIsShow] = useState(true);
  let prevScrollpos = window.pageYOffset;
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      console.log('컴포넌트 종료');
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
    prevScrollpos = currentScrollPos;
  };

  return (
    <header className={isShow ? '' : 'header-hide'}>
      <MobileView className="mob-wrap">
        <div className="menu">
          <button>
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <div className="home">
          <Link to="/">
            <i className="fas fa-video"></i>
          </Link>
        </div>
        <div className="search">
          <button>
            <i className="fas fa-search"></i>
          </button>
          <Link to="/my-list" className="my-list">
            <i className="fas fa-heart fa-lg"></i>
          </Link>
        </div>
      </MobileView>
      <BrowserView className="pc-wrap">WEB</BrowserView>
    </header>
  );
};

export default Header;
