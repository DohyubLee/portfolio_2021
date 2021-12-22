import { Skeleton } from '@mui/material';
import React, { Fragment } from 'react';
import './MobSlider.scss';

const MobSlider = props => {
  const { imageConfig, movieDatas } = props;
  const skelDefaultArr = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="mob-slider">
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
    </div>
  );
};

export default MobSlider;
