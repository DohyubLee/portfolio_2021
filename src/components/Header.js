import React, { useEffect, useState } from 'react';
import './Header.scss';
import { BrowserView, MobileView, isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';

const Header = () => {
  const [preScrollYPos, setPreScrollYPos] = useState(window.pageYOffset);
  const [isShow, setIsShow] = useState(true);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      // window.removeEventListener('scroll', handleScroll);
    };
  }, [preScrollYPos]);

  const handleScroll = () => {
    const currentYOffset = window.pageYOffset;
    if (preScrollYPos > currentYOffset) {
      setIsShow(true);
      setPreScrollYPos(currentYOffset);
    } else {
      setIsShow(false);
      setPreScrollYPos(currentYOffset);
    }
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
