import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Wish.scss';
import { isMobile } from 'react-device-detect';
import { ImageConfig, LocalStorage } from '../types';

type WishProps = {
  imageConfig: ImageConfig;
};

const Wish = ({ imageConfig }: WishProps) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    let getList = JSON.parse(localStorage.getItem('my-list') || '');
    if (!!getList) {
      setList(getList);
    }
  }, []);

  return (
    <div className={isMobile ? 'mob-wish' : 'mob-wish web-wish'}>
      {list.length > 0 ? (
        <Fragment>
          <h3>찜한 콘텐츠</h3>
          <ul>
            {list.map((data: LocalStorage['my_list']) => {
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
                      {data.genres.map(genre => {
                        return (
                          <span key={genre.id} className="genre-name">
                            {genre.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Fragment>
      ) : (
        <div className="not-exist">not-exist</div>
      )}
    </div>
  );
};

export default Wish;
