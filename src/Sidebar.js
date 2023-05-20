import './styles.css'

function Sidebar() {
  return (
    <aside id="sidebar" className="bg-side-nav w-1/2 md:w-1/6 lg:w-1/6 border-r border-side-nav hidden md:block lg:block">

                <ul className="list-reset flex flex-col">
                    <li className=" w-full h-full py-3 px-2 border-b border-light-border bg-white">
                        <a href="/index"
                           className="font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline">
                            <i className="fas fa-tachometer-alt float-left mx-2"></i>
                            Dashboard
                            <span><i className="fas fa-angle-right float-right"></i></span>
                        </a>
                    </li>
                    <li className="w-full h-full py-3 px-2 border-b border-light-border">
                        <a href="/warehouse"
                           className="font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline">
                            <i className="fab fa-wpforms float-left mx-2"></i>
                            Table
                            <span><i className="fa fa-angle-right float-right"></i></span>
                        </a>
                    </li>
                </ul>

            </aside>
  );
}
export default Sidebar;
