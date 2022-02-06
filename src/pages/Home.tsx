import React, { Fragment, useEffect, useState } from 'react';
import './Home.scss';
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import { Skeleton } from '@mui/material';
import MobSlider from '../components/MobSlider';
import WebSlider from '../components/WebSlider';
import { Link } from 'react-router-dom';
import { Datas, ImageConfig } from '../types';

type HomeProps = {
  imageConfig: ImageConfig;
  api_key: string;
};

const Home = ({ imageConfig, api_key }: HomeProps) => {
  const [popularDatas, setPopularDatas] = useState<Datas | null>(null);
  const [nowPlayingDatas, setNowPlayingDatas] = useState<Datas | null>(null);
  const [upcomingDatas, setUpcomingDatas] = useState<Datas | null>(null);

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
            {!!popularDatas ? (
              <img
                src={`${imageConfig.base_url}${imageConfig.backdrop_sizes[3]}${popularDatas.results[0].backdrop_path}`}
              />
            ) : (
              <div className="skel-wrap">
                <Skeleton sx={{ bgcolor: 'grey.900' }} variant="rectangular" height={'100%'} />
              </div>
            )}

            <div className="info-wrap">
              {!!popularDatas ? (
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
            <SliderBox imageConfig={imageConfig} movieDatas={popularDatas} category={'popular'} />
            <SliderBox
              imageConfig={imageConfig}
              movieDatas={nowPlayingDatas}
              category={'now-playing'}
            />
            <SliderBox imageConfig={imageConfig} movieDatas={upcomingDatas} category={'upcoming'} />
          </div>
        </div>
      ) : (
        <div className="pc-home">
          <div className="main-backdrop">
            {!!popularDatas ? (
              <img
                src={`${imageConfig.base_url}${imageConfig.backdrop_sizes[3]}${popularDatas.results[0].backdrop_path}`}
              />
            ) : (
              <div className="skel-wrap">
                <Skeleton sx={{ bgcolor: 'grey.900' }} variant="rectangular" height={'100%'} />
              </div>
            )}
            <div className="info-wrap">
              {!!popularDatas ? (
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
            <SliderBox imageConfig={imageConfig} movieDatas={popularDatas} category={'popular'} />
            <SliderBox
              imageConfig={imageConfig}
              movieDatas={nowPlayingDatas}
              category={'now_playing'}
            />
            <SliderBox imageConfig={imageConfig} movieDatas={upcomingDatas} category={'upcoming'} />
          </div>
        </div>
      )}
    </Fragment>
  );
};

type SliderBoxProps = {
  imageConfig: ImageConfig;
  movieDatas: Datas | null;
  category: string;
};

const SliderBox = ({ imageConfig, movieDatas, category }: SliderBoxProps) => {
  // const { imageConfig, movieDatas, category } = props;
  const categoryObj: { [key: string]: string } = {
    popular: '인기 작품들',
    now_playing: '현재 상영중',
    upcoming: '개봉 예정',
  };
  return (
    <div className="slider-box">
      <div className="category-title">
        <span className="category">{categoryObj[category]}</span>
        <Link to={`/${category}`} className="text-link">
          더보기
        </Link>
      </div>
      {isMobile ? (
        <MobSlider imageConfig={imageConfig} movieDatas={movieDatas} />
      ) : (
        <WebSlider imageConfig={imageConfig} movieDatas={movieDatas} />
      )}
    </div>
  );
};

export default Home;
