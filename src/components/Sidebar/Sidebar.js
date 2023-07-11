import SidebarRow from "./SidebarRow";
import "../../styles.css";

function Sidebar({ isSidebarOpen }) {
  return (
    <aside
      id="sidebar"
      className={`${
        isSidebarOpen ? "block" : "hidden"
      } w-1/2 bg-blue-100 border-r md:w-1/6 lg:w-1/6 border-side-nav`}
    >
      <ul className="flex flex-col list-reset">
        <SidebarRow
          content="Dashboard"
          href="/dashboard"
          faIcon="fa-tachometer-alt"
        />
        <SidebarRow
          content="Inventory management"
          href="/warehouse"
          faIcon="fa-warehouse"
        />
        <SidebarRow
          content="Track vendor orders"
          href="/trackingOrdersVendor"
          faIcon="fa-truck"
        />
        <SidebarRow
          content="Track users orders"
          href="/trackingOrdersUsers"
          faIcon="fa-shopping-basket"
        />
      </ul>
    </aside>
  );
}

export default Sidebar;
