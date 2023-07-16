import { useState } from "react";
import { Link } from "react-router-dom";
import SidebarRow from "./SidebarRow";
import { List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { HiOutlinePresentationChartLine } from "react-icons/hi";
import { FiTruck } from "react-icons/fi";
import { BsBoxSeam } from "react-icons/bs";
import { MdOutlineDeliveryDining } from "react-icons/md";
import "../../styles.css";

function Sidebar({ isSidebarOpen }) {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  return (
    <aside
      id="sidebar"
      className={`${
        isSidebarOpen ? "block" : "hidden"
      } w-1/2 bg-white border-r md:w-1/6 lg:w-1/6 border-side-nav`}
    >
      <List>
        <Link
          to="/dashboard"
          onClick={() => handleItemClick("dashboard")}
          className={`bg-white mb-1 ${
            activeItem === "dashboard"
              ? "bg-blue-500 text-white rounded-lg font-bold"
              : ""
          }`}
        >
          <ListItem>
            <ListItemPrefix>
              <HiOutlinePresentationChartLine className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
        </Link>
        <Link
          to="/warehouse"
          onClick={() => handleItemClick("warehouse")}
          className={`bg-white mb-1 ${
            activeItem === "warehouse"
              ? "bg-blue-500 text-white rounded-lg font-bold"
              : ""
          }`}
        >
          <ListItem>
            <ListItemPrefix>
              <BsBoxSeam className="h-5 w-5" />
            </ListItemPrefix>
            Inventory Management
          </ListItem>
        </Link>
        <Link
          to="/trackingOrdersVendor"
          onClick={() => handleItemClick("trackingOrdersVendor")}
          className={`bg-white mb-1 ${
            activeItem === "trackingOrdersVendor"
              ? "bg-blue-500 text-white rounded-lg font-bold"
              : ""
          }`}
        >
          <ListItem>
            <ListItemPrefix>
              <FiTruck className="h-5 w-5" />
            </ListItemPrefix>
            Track Vendor Orders
          </ListItem>
        </Link>
        <Link
          to="/trackingOrdersUsers"
          onClick={() => handleItemClick("trackingOrdersUsers")}
          className={`bg-white mb-1 ${
            activeItem === "trackingOrdersUsers"
              ? "bg-blue-500 text-white rounded-lg font-bold"
              : ""
          }`}
        >
          <ListItem>
            <ListItemPrefix>
              <MdOutlineDeliveryDining className="h-5 w-5" />
            </ListItemPrefix>
            Track User Orders
          </ListItem>
        </Link>
      </List>
    </aside>
  );
}

export default Sidebar;
