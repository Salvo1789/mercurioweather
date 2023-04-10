import "bootstrap/dist/js/bootstrap";
import './App.css'
import WeatherSearch from "./components/WeatherSearch";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter >
      <Routes >
        <Route path="/" element={<WeatherSearch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
