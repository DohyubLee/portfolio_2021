import "./App.scss";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">ddd</header>
      <Routes>
        <Route index element={<h3>Please select a topic.</h3>} />
      </Routes>
    </div>
  );
}

export default App;
