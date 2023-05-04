import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";
import { NavBar } from "./components/NavBar";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import Expense from "./components/Expense";
import ExpensesWeeklyMonthly from "./components/ExpensesWeeklyMonthly";
import Category from "./components/Category";

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
          <Route
            path="/expense-weekly-monthly"
            element={<ExpensesWeeklyMonthly />}
          />
          <Route path="/category" element={<Category />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
