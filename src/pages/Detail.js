import React, { Fragment, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import './Detail.scss';
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import { Skeleton } from '@mui/material';

const Detail = props => {
  const { api_key, imageConfig } = props;
  let [searchParams] = useSearchParams();
  let movieId = searchParams.get('movie_id');
  const [details, setDetails] = useState({
    id: null,
    title: null,
  });
  const [credits, setCredits] = useState({
    id: null,
    cast: [],
    crew: [],
  });
  const [isWish, setIsWish] = useState(false);
  const skelDefaultArr = [0, 1, 2, 3, 4, 5, 6, 7];

  useEffect(() => {
    axios({
      method: 'get',
      baseURL: 'https://api.themoviedb.org',
      url: `/3/movie/${movieId}`,
      params: {
        api_key,
        language: 'ko',
      },
    }).then(res => {
      setDetails(res.data);
    });
    axios({
      method: 'get',
      baseURL: 'https://api.themoviedb.org',
      url: `/3/movie/${movieId}/credits`,
      params: {
        api_key,
        language: 'ko',
      },
    }).then(res => {
      setCredits(res.data);
    });
  }, []);

  const putWishList = () => {
    setIsWish(!isWish);
  };

  return (
    <Fragment>
      {true ? (
        <div className={isMobile ? 'mob-detail' : 'mob-detail web-detail'}>
          <div className="backdrop-wrap">
            {!!details.id && (
              <Fragment>
                <img
                  src={`${imageConfig.base_url}${imageConfig.backdrop_sizes[3]}${details.backdrop_path}`}
                />
                <div className="main-info">
                  <div className="title-wrap">
                    <div className="title">{details.title}</div>
                    <button className="wish" onClick={putWishList}>
                      {isWish ? <i className="far fa-heart"></i> : <i className="fas fa-heart"></i>}
                    </button>
                  </div>
                  <div className="genre">
                    <span className="genre-title">장르: </span>
                    {details.genres.map(data => {
                      return (
                        <span key={data.id} className="genre-name">
                          {!!data.id ? data.name : '미확인'}
                        </span>
                      );
                    })}
                  </div>
                  <div className="date">개봉일: {details.release_date}</div>
                  <div className="overview">{details.overview}</div>
                </div>
              </Fragment>
            )}
          </div>
          <div className="cast-wrap">
            <h3>주요 출연진</h3>
            <ul>
              {credits.cast.length > 0
                ? credits.cast.map(data => {
                    return (
                      <li key={data.id}>
                        <img
                          src={`${imageConfig.base_url}${imageConfig.profile_sizes[1]}${data.profile_path}`}
                        />
                        <div className="name">{data.name}</div>
                        <div className="character">{data.character}</div>
                      </li>
                    );
                  })
                : skelDefaultArr.map(data => {
                    return (
                      <li key={data}>
                        <Skeleton
                          className="custom-sk"
                          sx={{ bgcolor: 'grey.900' }}
                          variant="rectangular"
                        />
                      </li>
                    );
                  })}
            </ul>
          </div>
        </div>
      ) : (
        <div className="web-detail">web</div>
      )}
    </Fragment>
  );
};

export default Detail;
