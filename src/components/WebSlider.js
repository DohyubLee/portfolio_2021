import { Skeleton } from '@mui/material';
import React from 'react';
import './WebSlider.scss';
import { useMediaQuery } from 'react-responsive';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const WebSlider = props => {
  const { imageConfig, movieDatas } = props;
  const skelDefaultArr = [0, 1, 2, 3, 4, 5, 6, 7];
  const isTablet = useMediaQuery({ query: '(min-width: 768px)' });
  const isLarge = useMediaQuery({ query: '(min-width: 992px)' });

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    swipe: false,
  };

  if (isTablet && isLarge) {
    settings = { ...settings, slidesToShow: 6, slidesToScroll: 6 };
  } else if (isTablet) {
    settings = { ...settings, slidesToShow: 5, slidesToScroll: 5 };
  }

  return (
    <div className="slider-wrap">
      <Slider {...settings}>
        {movieDatas.results.length > 0
          ? movieDatas.results.map(data => {
              return (
                <div className="poster-box" key={data.id}>
                  <Link to={`/detail?movie_id=${data.id}`} className="img-link">
                    <img
                      src={`${imageConfig.base_url}${imageConfig.poster_sizes[3]}${data.poster_path}`}
                    />
                  </Link>
                </div>
              );
            })
          : skelDefaultArr.map(data => {
              return (
                <div className="poster-box skel" key={data}>
                  <Skeleton
                    className="custom-sk"
                    sx={{ bgcolor: 'grey.900' }}
                    variant="rectangular"
                  />
                </div>
              );
            })}
      </Slider>
    </div>
  );
};

export default WebSlider;
