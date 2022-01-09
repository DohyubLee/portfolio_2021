import React, { Fragment, useEffect, useState } from 'react';
import './Home.scss';
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import { Skeleton } from '@mui/material';
import MobSlider from '../components/MobSlider';
import WebSlider from '../components/WebSlider';
import { Link } from 'react-router-dom';

const Home = props => {
  const { imageConfig, api_key } = props;

  const [popularDatas, setPopularDatas] = useState({
    results: [],
  });
  const [nowPlayingDatas, setNowPlayingDatas] = useState({
    results: [],
  });
  const [upcomingDatas, setUpcomingDatas] = useState({
    results: [],
  });

  useEffect(() => {
    axios({
      method: 'get',
      baseURL: 'https://api.themoviedb.org',
      url: '/3/movie/popular',
      params: {
        api_key,
        language: 'ko',
      },
    }).then(res => {
      setPopularDatas(res.data);
    });
    axios({
      method: 'get',
      baseURL: 'https://api.themoviedb.org',
      url: '/3/movie/now_playing',
      params: {
        api_key,
        language: 'ko',
      },
    }).then(res => {
      setNowPlayingDatas(res.data);
    });
    axios({
      method: 'get',
      baseURL: 'https://api.themoviedb.org',
      url: '/3/movie/upcoming',
      params: {
        api_key,
        language: 'ko',
      },
    }).then(res => {
      setUpcomingDatas(res.data);
    });
  }, []);

  return (
    <Fragment>
      {isMobile ? (
        <div className="mob-home">
          <div className="main-backdrop">
            {popularDatas.results.length > 0 ? (
              <img
                src={`${imageConfig.base_url}${imageConfig.backdrop_sizes[3]}${popularDatas.results[0].backdrop_path}`}
              />
            ) : (
              <div className="skel-wrap">
                <Skeleton sx={{ bgcolor: 'grey.900' }} variant="rectangular" height={'100%'} />
              </div>
            )}

            <div className="info-wrap">
              {popularDatas.results.length > 0 ? (
                <Fragment>
                  <div className="title">{popularDatas.results[0].title}</div>
                  <div className="overview">{popularDatas.results[0].overview}</div>
                  <div className="detail">
                    <Link
                      to={`/detail?movie_id=${popularDatas.results[0].id}`}
                      className="text-link"
                    >
                      더보기
                    </Link>
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <div className="title">
                    <Skeleton sx={{ bgcolor: 'grey.900' }} variant="rectangular" width={'160px'} />
                  </div>
                  <div className="overview">
                    <Skeleton sx={{ bgcolor: 'grey.900' }} variant="rectangular" height={'70px'} />
                  </div>
                </Fragment>
              )}
            </div>
          </div>
          <div className="contents-wrap">
            <div className="slider-box">
              <div className="category-title">
                <span className="category">인기 작품들</span>
                <Link to="/popular" className="text-link">
                  더보기
                </Link>
              </div>
              <MobSlider imageConfig={imageConfig} movieDatas={popularDatas} />
            </div>
            <div className="slider-box">
              <div className="category-title">
                <span className="category">현재 상영중</span>
                <Link to="/now-playing" className="text-link">
                  더보기
                </Link>
              </div>
              <MobSlider imageConfig={imageConfig} movieDatas={nowPlayingDatas} />
            </div>
            <div className="slider-box">
              <div className="category-title">
                <span className="category">개봉 예정</span>
                <Link to="/upcoming" className="text-link">
                  더보기
                </Link>
              </div>
              <MobSlider imageConfig={imageConfig} movieDatas={upcomingDatas} />
            </div>
          </div>
        </div>
      ) : (
        <div className="pc-home">
          <div className="main-backdrop">
            {popularDatas.results.length > 0 ? (
              <img
                src={`${imageConfig.base_url}${imageConfig.backdrop_sizes[3]}${popularDatas.results[0].backdrop_path}`}
              />
            ) : (
              <div className="skel-wrap">
                <Skeleton sx={{ bgcolor: 'grey.900' }} variant="rectangular" height={'100%'} />
              </div>
            )}
            <div className="info-wrap">
              {popularDatas.results.length > 0 ? (
                <Fragment>
                  <div className="title">{popularDatas.results[0].title}</div>
                  <div className="overview">{popularDatas.results[0].overview}</div>
                  <div className="detail">
                    <Link
                      to={`/detail?movie_id=${popularDatas.results[0].id}`}
                      className="text-link"
                    >
                      더보기
                    </Link>
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <div className="title">
                    <Skeleton sx={{ bgcolor: 'grey.900' }} variant="rectangular" width={'250px'} />
                  </div>
                  <div className="overview">
                    <Skeleton sx={{ bgcolor: 'grey.900' }} variant="rectangular" height={'70px'} />
                  </div>
                </Fragment>
              )}
            </div>
          </div>
          <div className="contents-wrap">
            <div className="slider-box">
              <div className="category-title">
                <span className="category">인기 작품들</span>
                <Link to="/popular" className="text-link">
                  더보기
                </Link>
              </div>
              <WebSlider imageConfig={imageConfig} movieDatas={popularDatas} />
            </div>
            <div className="slider-box">
              <div className="category-title">
                <span className="category">현재 상영중</span>
                <Link to="/now_playing" className="text-link">
                  더보기
                </Link>
              </div>
              <WebSlider imageConfig={imageConfig} movieDatas={nowPlayingDatas} />
            </div>
            <div className="slider-box">
              <div className="category-title">
                <span className="category">개봉 예정</span>
                <Link to="/upcoming" className="text-link">
                  더보기
                </Link>
              </div>
              <WebSlider imageConfig={imageConfig} movieDatas={upcomingDatas} />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Home;
