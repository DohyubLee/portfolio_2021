import React, { Fragment, useEffect, useState } from 'react';
import './Movie.scss';
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Movie = props => {
  const { imageConfig, api_key, genres, category } = props;
  const [movieDatas, setMovieDatas] = useState({
    results: [],
  });
  let fetching = false;
  // 맨처음 로드전 height가 정해지지 않아서 데이터 다 받고 진행시 사용을 위해
  let page = 1;
  const categoryName = {
    popular: '인기 작품들',
    now_playing: '현재 상영중',
    upcoming: '개봉 예정',
  };

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   // loadData(page);
  //   return () => {
  //     console.log('컴포넌트 종료');
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    loadData(page);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [category]);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight && fetching) {
      loadData(++page);
    }
  };

  const loadData = async page => {
    await axios({
      method: 'get',
      baseURL: 'https://api.themoviedb.org',
      url: `/3/movie/${category}`,
      params: {
        api_key,
        language: 'ko',
        page,
      },
    }).then(res => {
      if (page === 1) {
        setMovieDatas(fetchData => {
          return { ...fetchData, ...res.data };
        });
      } else {
        setMovieDatas(fetchData => {
          return {
            ...fetchData,
            ...res.data,
            results: [...fetchData.results, ...res.data.results],
          };
        });
      }
      fetching = true;
    });
  };

  return (
    <Fragment>
      {isMobile ? (
        <div className="mob-movie">
          <h3>{categoryName[category]}</h3>
          <ul>
            {movieDatas.results.map(data => {
              return (
                <li key={data.id}>
                  <Link to={`/detail?movie_id=${data.id}`} className="img-link">
                    <img
                      src={`${imageConfig.base_url}${imageConfig.backdrop_sizes[3]}${data.backdrop_path}`}
                    />
                  </Link>
                  <div className="info">
                    <div className="title">{data.title}</div>
                    <div className="genre">
                      <span className="genre-title">장르: </span>
                      {data.genre_ids.map(id => {
                        return (
                          <span key={id} className="genre-name">
                            {!!genres[id] ? genres[id] : '미확인'}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="web-movie">
          <div className="contents-wrap">
            <h3>{categoryName[category]}</h3>
            <ul>
              {movieDatas.results.map(data => {
                return (
                  <li key={data.id}>
                    <Link to={`/detail?movie_id=${data.id}`} className="text-link">
                      <img
                        src={`${imageConfig.base_url}${imageConfig.backdrop_sizes[3]}${data.backdrop_path}`}
                      />
                    </Link>
                    <div className="info">
                      <div className="title">{data.title}</div>
                      <div className="genre">
                        <span className="genre-title">장르: </span>
                        {data.genre_ids.map(id => {
                          return (
                            <span key={id} className="genre-name">
                              {!!genres[id] ? genres[id] : '미확인'}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Movie;
