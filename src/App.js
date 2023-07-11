import "./App.css";
import "./customeStyle.css";

import React from "react";
import { useState } from "react";
import Header from "./Header";
import { InventoryPage } from "./components/Pages/Inventory/InventoryPage";
import Sidebar from "./components/Sidebar/Sidebar";
import { DashboardPage } from "./components/Pages/Dashboard/Dashboard";
import LoginPage from "./components/Pages/Login/LoginPage";
import { TrackingPage } from "./components/Pages/TrackingVendorOrders/TrackingPage";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { TrackingPageUser } from "./components/Pages/TrackingUsersOrders/TrackingPageUser";
export const DarkModeContext = React.createContext();

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    console.log(darkMode);
  };
  const userJson = sessionStorage.getItem("currentUser");
  const currentUser = JSON.parse(userJson);

  return (
    <DarkModeContext.Provider value={darkMode}>
      <div className={darkMode ? "dark-mode" : ""}>
        <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
        <Router>
          <Routes>
            <Route element={<AuthenticatedLayout />}>
              <Route
                path="/"
                element={
                  currentUser ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <LoginPage />
                  )
                }
              />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/warehouse" element={<InventoryPage />} />
              <Route path="/trackingOrdersVendor" element={<TrackingPage />} />
              <Route
                path="/trackingOrdersUsers"
                element={<TrackingPageUser />}
              />
            </Route>
          </Routes>
        </Router>
      </div>
    </DarkModeContext.Provider>
  );
}

function AuthenticatedLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const userJson = sessionStorage.getItem("currentUser");
  const currentUser = JSON.parse(userJson);

  if (!currentUser) {
    return <LoginPage />;
  }

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="mx-auto bg-grey-400">
      <div className="flex flex-col justify-center min-h-screen">
        <Header currentUser={currentUser} OnClick={handleSidebarToggle} />
        <div className="flex flex-1">
          <Sidebar className={` ${isSidebarOpen ? "block" : "none"}`} />
          <div className="flex-1 p-3 overflow-hidden bg-white-300">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
