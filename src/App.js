import "./App.scss";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/">index</Link>
        <Link to="/popular">popular</Link>
      </header>
      <Routes>
        <Route path="/" element={<h3>home9</h3>} />
        <Route path="popular" element={<h3>popular9</h3>} />
      </Routes>
    </div>
  );
}

export default App;
