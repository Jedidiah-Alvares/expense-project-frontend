import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";
import { NavBar } from "./components/NavBar";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import { Expense } from "./components/Expense";

function App() {
  return (
    <>
      <NavBar />
      <div className="vertical-center text-center" id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/expense" element={<Expense />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
