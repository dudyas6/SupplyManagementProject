import "./App.css";
import CreateItem from "./CreateItem";
import Header from "./Header";
import Table from "./Table";
import Sidebar from "./Sidebar";
import { DashboardPage } from "./components/Dashboard/Dashboard";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<AuthenticatedLayout />}>
          <Route path="/index" element={<CreateItem />} />
          <Route path="/warehouse" element={<Table />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

function AuthenticatedLayout() {
  const userJson = sessionStorage.getItem("currentUser");
  const currentUser = JSON.parse(userJson);

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="mx-auto bg-grey-400">
    <div className="flex flex-col justify-center min-h-screen">
      <Header currentUser={currentUser} />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-3 overflow-hidden bg-white-300">
        <Outlet />
        </div>
      </div>
    </div>
  </div>
  );
}
export default App;
