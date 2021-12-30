import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import './Detail.scss';

const Detail = () => {
  let [searchParams] = useSearchParams();
  let movieId = searchParams.get('movie_id');

  console.log('movieId', movieId);
  return <div>Detail</div>;
};

export default Detail;
