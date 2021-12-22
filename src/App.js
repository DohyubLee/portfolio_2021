import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import axios from 'axios';

function App() {
  const api_key = 'dfebf9cfca6fde7ded33adb1b64575ab';
  const baseURL = 'https://api.themoviedb.org';
  const imageConfig = {
    backdrop_sizes: ['w300', 'w780', 'w1280', 'original'],
    poster_sizes: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
    profile_sizes: ['w45', 'w185', 'h632', 'original'],
    base_url: 'http://image.tmdb.org/t/p/',
  };
  const [popularDatas, setPopularDatas] = useState({
    results: [],
  });
  const [nowPlayingDatas, setNowPlayingDatas] = useState({
    results: [],
  });
  const [upcomingDatas, setUpcomingDatas] = useState({
    results: [],
  });

  useEffect(() => {
    axios({
      method: 'get',
      baseURL: 'https://api.themoviedb.org',
      url: '/3/movie/popular',
      params: {
        api_key,
        language: 'ko',
      },
    }).then(res => {
      setPopularDatas({ ...res.data });
    });
    axios({
      method: 'get',
      baseURL: 'https://api.themoviedb.org',
      url: '/3/movie/now_playing',
      params: {
        api_key,
        language: 'ko',
      },
    }).then(res => {
      setNowPlayingDatas({ ...res.data });
    });
    axios({
      method: 'get',
      baseURL: 'https://api.themoviedb.org',
      url: '/3/movie/upcoming',
      params: {
        api_key,
        language: 'ko',
      },
    }).then(res => {
      setUpcomingDatas({ ...res.data });
    });
  }, []);

  return (
    <div className="App">
      <div className={isMobile ? 'mob-app' : 'pc-app'}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                imageConfig={imageConfig}
                popularDatas={popularDatas}
                nowPlayingDatas={nowPlayingDatas}
                upcomingDatas={upcomingDatas}
              />
            }
          />
          <Route path="now-playing" element={<h3>now-playing</h3>} />
          <Route path="popular" element={<h3>popular11</h3>} />
          <Route path="upcoming" element={<h3>upcoming</h3>} />
          <Route path="my-list" element={<h3>upcoming</h3>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
