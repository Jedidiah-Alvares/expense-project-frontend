import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { NavBar } from "./components/NavBar";
import { SignUp } from "./components/SignUp";
import SignIn from "./components/SignIn";
import Expense from "./components/Expense";
import ExpensesWeeklyMonthly from "./components/ExpensesWeeklyMonthly";
import Category from "./components/Category";
import ProtectRoutes from "./components/ProtectRoutes";
import React from "react";
import { PageNotFound } from "./components/PageNotFound";
import CustomFilter from "./components/CustomFilter";
import FilterExpenses from "./components/FilterExpenses";

function App() {
  return (
    <>
      <NavBar />
      <div className="vertical-center text-center " id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/expense"
            element={<ProtectRoutes Component={Expense} />}
          />
          <Route
            path="/filtered-expense"
            element={<ProtectRoutes Component={FilterExpenses} />}
          >
            <Route index element={<Navigate to="weekly-monthly" />} />
            <Route
              path="weekly-monthly"
              element={<ProtectRoutes Component={ExpensesWeeklyMonthly} />}
            />
            <Route
              path="custom-filter"
              element={<ProtectRoutes Component={CustomFilter} />}
            />
          </Route>

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
