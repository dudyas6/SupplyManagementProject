import "./App.css";
import Header from "./Header";
import MainBody from "./MainBody";
import Sidebar from "./Sidebar";
// import React, { useState, useEffect } from "react";
// import axios from "axios";

function App() {
  return (
      <div className="mx-auto bg-grey-400">
        <div className="flex flex-col min-h-screen">
          <Header/>
          <div class="flex flex-1">
            <Sidebar/>
            <MainBody/>
          </div>
        </div>
      </div>
  );
}

export default App;
