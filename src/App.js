import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import Movie from './pages/Movie';

function App() {
  const api_key = 'dfebf9cfca6fde7ded33adb1b64575ab';
  const baseURL = 'https://api.themoviedb.org';
  const imageConfig = {
    backdrop_sizes: ['w300', 'w780', 'w1280', 'original'],
    poster_sizes: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
    profile_sizes: ['w45', 'w185', 'h632', 'original'],
    base_url: 'http://image.tmdb.org/t/p/',
  };

  const genres = {
    28: '액션',
    12: '모험',
    16: '애니메이션',
    35: '코미디',
    80: '범죄',
    99: '다큐멘터리',
    18: '드라마',
    10751: '가족',
    14: '판타지',
    36: '역사',
    27: '공포',
    10402: '음악',
    9648: '미스터리',
    10749: '로맨스',
    878: 'SF',
    10770: 'TV 영화',
    53: '스릴러',
    10752: '전쟁',
    37: '서부',
  };

  return (
    <div className="App">
      <div className={isMobile ? 'mob-app' : 'pc-app'}>
        <Header />
        <Routes>
          <Route path="/" element={<Home imageConfig={imageConfig} api_key={api_key} />} />
          <Route
            path="now-playing"
            element={
              <Movie
                imageConfig={imageConfig}
                api_key={api_key}
                genres={genres}
                category={'now_playing'}
              />
            }
          />
          <Route
            path="popular"
            element={
              <Movie
                imageConfig={imageConfig}
                api_key={api_key}
                genres={genres}
                category={'popular'}
              />
            }
          />
          <Route
            path="upcoming"
            element={
              <Movie
                imageConfig={imageConfig}
                api_key={api_key}
                genres={genres}
                category={'upcoming'}
              />
            }
          />
          <Route path="my-list" element={<h3>upcoming</h3>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
