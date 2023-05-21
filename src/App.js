import "./App.css";
import Header from "./Header";
import { InventoryPage } from "./components/Pages/Inventory/InventoryPage";
import Sidebar from "./components/Sidebar/Sidebar";
import { DashboardPage } from './components/Pages/Dashboard/Dashboard';
import LoginPage from "./components/Pages/Login/LoginPage";
import { TrackingPage } from "./components/Pages/Tracking/TrackingPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<AuthenticatedLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/warehouse" element={<InventoryPage />} />
          <Route path="/tracking" element={<TrackingPage />} />
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
