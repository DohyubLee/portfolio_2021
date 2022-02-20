import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './Search.scss';
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import { ImageConfig, SearchData } from '../types';

type SearchProps = {
  imageConfig: ImageConfig;
  api_key: string;
};

const Search = ({ api_key, imageConfig }: SearchProps) => {
  let [searchParams] = useSearchParams();
  let keyword = searchParams.get('keyword');
  const [list, setList] = useState<SearchData | null>();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 767px)' });

  useEffect(() => {
    axios({
      method: 'get',
      baseURL: 'https://api.themoviedb.org',
      url: `/3/search/movie`,
      params: {
        api_key,
        language: 'ko',
        query: keyword,
      },
    }).then(res => {
      setList(res.data);
    });
  }, [keyword]);

  return true ? (
    <div className={isMobile ? 'mob-search' : 'mob-search web-search'}>
      <h3>검색결과</h3>
      {!!list ? (
        <ul>
          {list.results.map(data => {
            return (
              <li key={data.id}>
                <Link to={`/detail?movie_id=${data.id}`} className="img-link">
                  {isTabletOrMobile ? (
                    <img
                      src={`${imageConfig.base_url}${imageConfig.backdrop_sizes[3]}${data.backdrop_path}`}
                    />
                  ) : (
                    <img
                      src={`${imageConfig.base_url}${imageConfig.backdrop_sizes[2]}${data.poster_path}`}
                    />
                  )}
                </Link>
                <div className="info">
                  <div className="title">{data.title}</div>
                  <div className="date">{data.release_date}</div>
                  <div className="overview">{data.overview}</div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="not-exist">not-exist</div>
      )}
    </div>
  ) : (
    <div className="web-search">web</div>
  );
};

export default Search;
