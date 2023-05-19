import "./App.css";
import CreateItem from "./CreateItem";
import Header from "./Header";
import MainBody from "./MainBody";
import Sidebar from "./Sidebar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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
          <Route path="/index" element={<MainBody />} />
          <Route path="/otherr" element={<CreateItem />} />
        </Route>
      </Routes>
    </Router>
  );
}

function AuthenticatedLayout({ children }) {
  const userJson = sessionStorage.getItem("currentUser");
  const currentUser = JSON.parse(userJson);

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="mx-auto bg-grey-400">
      <div className="flex flex-col min-h-screen">
        <Header currentUser={currentUser} />
        <div className="flex flex-1">
          <Sidebar />
          {children}
        </div>
      </div>
    </div>
  );
}
export default App;
