import React, { Fragment, useEffect, useState } from 'react';
import './Home.scss';
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import { Skeleton } from '@mui/material';
import MobSlider from '../components/MobSlider';

const Home = props => {
  const { imageConfig, popularDatas, nowPlayingDatas, upcomingDatas } = props;

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
              <div className="category-title">인기 작품들</div>
              <MobSlider imageConfig={imageConfig} movieDatas={popularDatas} />
            </div>
            <div className="slider-box">
              <div className="category-title">현재 상영중</div>
              <MobSlider imageConfig={imageConfig} movieDatas={nowPlayingDatas} />
            </div>
            <div className="slider-box">
              <div className="category-title">개봉 예정</div>
              <MobSlider imageConfig={imageConfig} movieDatas={upcomingDatas} />
            </div>
          </div>
        </div>
      ) : (
        <div className="pc-home">PC</div>
      )}
    </Fragment>
  );
};

export default Home;
