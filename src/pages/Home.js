import React, { Fragment } from 'react';
import './Home.scss';
import { isMobile } from 'react-device-detect';

const Home = props => {
  const { imageConfig, api_key } = props;
  return (
    <Fragment>
      {isMobile ? (
        <div className="mob-home">
          <div className="main-backdrop">dd</div>
          <div className="contents-wrap"></div>
        </div>
      ) : (
        <div className="pc-home">PC</div>
      )}
    </Fragment>
  );
};

export default Home;
