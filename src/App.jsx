import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
    </Routes>
  );
};

export default App;
