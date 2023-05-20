import './styles.css'

function Sidebar() {
  return (
    <aside id="sidebar" className="hidden w-1/2 border-r bg-side-nav md:w-1/6 lg:w-1/6 border-side-nav md:block lg:block">

                <ul className="flex flex-col list-reset">
                    <li className="w-full h-full px-2 py-3 bg-white border-b border-light-border">
                        <a href="/dashboard"
                           className="font-sans text-sm font-hairline no-underline hover:font-normal text-nav-item">
                            <i className="float-left mx-2 fas fa-tachometer-alt"></i>
                            Dashboard
                            <span><i className="float-right fas fa-angle-right"></i></span>
                        </a>
                    </li>
                    <li className="w-full h-full px-2 py-3 border-b border-light-border">
                        <a href="/warehouse"
                           className="font-sans text-sm font-hairline no-underline hover:font-normal text-nav-item">
                            <i className="float-left mx-2 fab fa-wpforms"></i>
                            Table
                            <span><i className="float-right fa fa-angle-right"></i></span>
                        </a>
                    </li>
                </ul>

            </aside>
  );
}
export default Sidebar;
