import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";
import { NavBar } from "./components/NavBar";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import Expense from "./components/Expense";
import ExpensesWeeklyMonthly from "./components/ExpensesWeeklyMonthly";
import Category from "./components/Category";
import ProtectRoutes from "./components/ProtectRoutes";
import React, { useEffect } from "react";
import { PageNotFound } from "./components/PageNotFound";
import { LoadingContextProvider } from "./components/withLoading";

function App() {
  return (
    <>
      <NavBar />
      <div className="vertical-center text-center" id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/expense"
            element={<ProtectRoutes Component={Expense} />}
          />
          <Route
            path="/expense-weekly-monthly"
            element={<ProtectRoutes Component={ExpensesWeeklyMonthly} />}
          />
          <Route
            path="/category"
            element={<ProtectRoutes Component={Category} />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
