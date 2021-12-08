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
      <Slider />
    </div>
  );
};

export default Home;
