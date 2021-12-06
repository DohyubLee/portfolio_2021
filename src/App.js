import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import { useEffect, useState } from 'react';

function App() {
  const api_key = 'dfebf9cfca6fde7ded33adb1b64575ab';
  const [config, setConfig] = useState();

  useEffect(() => {
    console.log('testddd');
  }, []);
  return (
    <div className="App">
      <Header />
      <div className="box">1111</div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="now-playing" element={<h3>now-playing</h3>} />
        <Route path="popular" element={<h3>popular11</h3>} />
        <Route path="upcoming" element={<h3>upcoming</h3>} />
        <Route path="my-list" element={<h3>upcoming</h3>} />
      </Routes>
    </div>
  );
}

export default App;
