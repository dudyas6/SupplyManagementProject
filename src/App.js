import "./App.css";
import CreateItem from "./CreateItem";
import Header from "./Header";
import MainBody from "./MainBody";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./components/LoginPage";
// import React, { useState, useEffect } from "react";
// import axios from "axios";


function App() {
  return (
    <div className="mx-auto bg-grey-400">
      <div className="flex flex-col min-h-screen">
        <Header />
        <div class="flex flex-1">
          <Sidebar />
          <Router>
            <Routes>
              <Route exact path="/" element={<LoginPage />} />
              <Route path="/index" element={<MainBody />} />
              <Route path="/otherr" element={<CreateItem />} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
