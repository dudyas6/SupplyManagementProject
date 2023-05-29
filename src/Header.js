import './styles.css'
import logo from "./assets/icons/minilogo.png";

function Header({currentUser, OnClick}) {
  return (
    <header className="bg-nav"> 
      <div className="flex justify-between">
          <div className="inline-flex items-center p-1 mx-3">
          <i className="pr-2 text-white fas fa-bars" onClick={OnClick}>aaaaaaaaaaaa</i>
              <img className="inline-block w-8 h-8" src={logo} alt="Logo" /> 
          </div>
          <div className="flex flex-row items-center p-1">
              <a href="https://github.com/dudyas6/supplymanagementproject" className="hidden p-2 mr-2 text-white no-underline md:block lg:block">Github Project</a>
              <a href="/" className="hidden p-2 text-white no-underline md:block lg:block">{currentUser.username} - disconnect</a> 
             {
              /* Not working for now:
              <div id="ProfileDropDown" className="absolute hidden mt-12 mr-1 bg-white rounded shadow-md pin-t pin-r">
                  <ul className="list-reset">
                    <li><a href="/" className="block px-4 py-2 text-black no-underline hover:bg-grey-light">My account</a></li>
                    <li><a href="/" className="block px-4 py-2 text-black no-underline hover:bg-grey-light">Notifications</a></li>
                    <li><hr className="mx-2 border-t border-grey-ligght"/></li>
                    <li><a href="/" className="block px-4 py-2 text-black no-underline hover:bg-grey-light">Logout</a></li>
                  </ul>
              </div>
              */
             }
          </div>
        </div>
    </header>
  );
}

export default Header;
