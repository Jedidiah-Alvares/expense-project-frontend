import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <div className="vertical-center text-center" id="main">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
