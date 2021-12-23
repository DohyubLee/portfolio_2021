import { Skeleton } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import './Slider.scss';
import { useMediaQuery } from 'react-responsive';

const Slider = props => {
  const { imageConfig, movieDatas } = props;
  const skelDefaultArr = [0, 1, 2, 3, 4, 5, 6, 7];
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const [viewArr, setViewArr] = useState([]);
  const [totalArr, setTotalArr] = useState([]);

  useEffect(() => {
    if (movieDatas.results.length > 0) {
      console.log('movieDatas', movieDatas);
    }
  }, [movieDatas]);

  return (
    <div className="slider-wrap">
      <ul>
        {movieDatas.results.length > 0 ? (
          <Fragment>
            {movieDatas.results.map((data, index) => {
              return (
                <li key={data.id}>
                  <img
                    src={`${imageConfig.base_url}${imageConfig.poster_sizes[2]}${data.poster_path}`}
                  />
                </li>
              );
            })}
          </Fragment>
        ) : (
          <Fragment>
            {skelDefaultArr.map((data, index) => {
              return (
                <li key={index}>
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
      <div className="btn-wrap">
        <button>prev</button>
        <button>next</button>
      </div>
    </div>
  );
};

export default Slider;
