import { Skeleton } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import './Home.scss';
import Slider from '../components/Slider';

const Home = props => {
  const { imageConfig, api_key } = props;
  const isMobile = useMediaQuery({ query: '(max-width: 575px)' });
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
      setPopularDatas({ ...res.data });
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
      setNowPlayingDatas({ ...res.data });
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
      setUpcomingDatas({ ...res.data });
    });
  }, []);

  return (
    <div className="home-wrap">
      <div className="back-image-wrap">
        {isMobile ? (
          popularDatas.results.length > 0 ? (
            <img
              src={`${imageConfig.base_url}${imageConfig.backdrop_sizes[3]}${popularDatas.results[0].poster_path}`}
            />
          ) : (
            <div className="mob-skelton">
              <Skeleton sx={{ bgcolor: 'grey.900' }} variant="rectangular" height={'80vh'} />
            </div>
          )
        ) : popularDatas.results.length > 0 ? (
          <img
            src={`${imageConfig.base_url}${imageConfig.backdrop_sizes[3]}${popularDatas.results[0].backdrop_path}`}
          />
        ) : (
          <div className="mob-skelton">
            <Skeleton sx={{ bgcolor: 'grey.900' }} variant="rectangular" height={'80vh'} />
          </div>
        )}
        {popularDatas.results.length > 0 && (
          <div className="movie-info-box">
            <div className="movie-info">
              <div className="title">{popularDatas.results[0].title}</div>
              <div className="overview">{popularDatas.results[0].overview}</div>
            </div>
            <div className="btn-box">
              <button className="detail-btn">상세보기</button>
            </div>
          </div>
        )}
      </div>
      <Slider imageConfig={imageConfig} movieDatas={popularDatas} category={'인기'} />
      <Slider imageConfig={imageConfig} movieDatas={nowPlayingDatas} category={'현재 상영 중'} />
      <Slider imageConfig={imageConfig} movieDatas={upcomingDatas} category={'개봉 예정'} />
    </div>
  );
};

export default Home;
