import SidebarRow from './SidebarRow';
import '../../styles.css'

function Sidebar() {
  return (
    <aside id="sidebar" className="hidden w-1/2 bg-blue-100 border-r md:w-1/6 lg:w-1/6 border-side-nav md:block lg:block">
    <ul className="flex flex-col list-reset">
    <SidebarRow content="Dashboard" href="/dashboard" faIcon="fa-tachometer-alt"/>
    <SidebarRow content="Inventory management" href="/warehouse" faIcon="fa-wpforms"/>
    <SidebarRow content="Track vendor orders" href="/trackingOrdersVendor" faIcon="fa-wpforms"/>
    <SidebarRow content="Track users orders" href="/trackingOrdersUsers" faIcon="fa-wpforms"/>
    </ul>
  </aside>
  );
}
export default Sidebar;
