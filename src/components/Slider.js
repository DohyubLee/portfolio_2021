import React, { Fragment } from 'react';
import './Slider.scss';
import { useMediaQuery } from 'react-responsive';
import { BrowserView, MobileView } from 'react-device-detect';
import { Skeleton } from '@mui/material';

const Slider = props => {
  const { movieDatas, imageConfig, category } = props;
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1199px)' });
  const skelDefaultArr = [0, 1, 2, 3, 4, 5, 6, 7];

  //movieDatas.results.length > 0
  return (
    <div className="slider-wrap">
      <MobileView className="mob-view">
        <div className="category-title">{category}</div>
        <ul>
          {movieDatas.results.length > 0 ? (
            <Fragment>
              {movieDatas.results.map(data => {
                return (
                  <li>
                    <img
                      src={`${imageConfig.base_url}${imageConfig.poster_sizes[1]}${data.poster_path}`}
                    />
                  </li>
                );
              })}
            </Fragment>
          ) : (
            <Fragment>
              {skelDefaultArr.map((data, index) => {
                return (
                  <li>
                    <Skeleton
                      className="custom-sk"
                      sx={{ bgcolor: 'grey.900' }}
                      variant="rectangular"
                    />
                  </li>
                );
              })}
            </Fragment>
          )}
        </ul>
      </MobileView>
      <BrowserView className="pc-view">WEB</BrowserView>
    </div>
  );
};

export default Slider;
