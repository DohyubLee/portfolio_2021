import React, {
  ChangeEvent,
  FormEvent,
  Fragment,
  MouseEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import './Header.scss';
import { useMediaQuery } from 'react-responsive';
import { Link, NavLink, useNavigate } from 'react-router-dom';

type HeaderProps = {
  isMobile: boolean;
};

const Header = ({ isMobile }: HeaderProps) => {
  const [isShow, setIsShow] = useState(true);
  const [isDrop, setIsDrop] = useState(false);
  const [value, setValue] = useState('');
  let prevScrollpos = window.pageYOffset;
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isSmallWitdh = useMediaQuery({ query: '(max-width: 575px)' });
  const mobNavRef = useRef<HTMLUListElement>(null);
  const navIcRef = useRef<HTMLButtonElement>(null);
  let navigate = useNavigate();

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

  const closeMobNav = (event: Event): void => {
    // 해당 박스 존재유무 파악
    if (!!mobNavRef.current) {
      // 해당 박스 영역 외에서 클릭했을시
      if (event.target instanceof HTMLUListElement && !mobNavRef.current.contains(event.target)) {
        if (!!navIcRef.current) {
          // 아이콘 영역 외에서만 동작시키기위해
          if (
            event.target instanceof HTMLButtonElement &&
            !navIcRef.current.contains(event.target)
          ) {
            setIsDrop(false);
          }
        }
      }
    }
  };

  const openDropNav = () => {
    setIsDrop(!isDrop);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    navigate(`/search?keyword=${value}`);
    event.preventDefault();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
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
              <form onSubmit={handleSubmit}>
                <input type="text" placeholder="검색" value={value} onChange={handleChange} />
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
              <form onSubmit={handleSubmit}>
                <input type="text" placeholder="검색" value={value} onChange={handleChange} />
              </form>
            </div>
          </div>
        </header>
      )}
    </Fragment>
  );
};

const NavList = ({
  name,
  reference,
}: {
  name: string | null;
  reference: RefObject<HTMLUListElement> | null;
}) => {
  // const { name, reference } = props;

  return (
    <ul className={name ? name : ''} ref={reference}>
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
