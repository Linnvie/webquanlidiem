import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import BangDiem from "./components/BangDiem/BangDiem"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bangdiem" element={<BangDiem />} />
            <Route path="/login" element={<Login />} />
            <Route  element={<Home />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
