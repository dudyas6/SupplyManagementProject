import './styles.css'
import logo from "./assets/icons/minilogo.png";

function Header({currentUser, OnClick}) {

  const handleDisconnect = () => {
    sessionStorage.clear();
    window.location.href = "/"; // login page
  };
  return (
    <header className="bg-nav"> 
      <div className="flex justify-between">
          <div className="inline-flex items-center p-1 mx-3">
          <i className="pr-2 text-white fas fa-bars" onClick={OnClick}>aaaaaaaaaaaa</i>
              <img className="inline-block w-8 h-8" src={logo} alt="Logo" /> 
          </div>
          <div className="flex flex-row items-center p-1">
              <a href="https://github.com/dudyas6/supplymanagementproject" className="hidden p-2 mr-2 text-white no-underline md:block lg:block">Github Project</a>
              <a href="/" className="hidden p-2 text-white no-underline md:block lg:block"   onClick={handleDisconnect}>{currentUser.username} - disconnect</a> 
          </div>
        </div>
    </header>
  );
}

export default Header;
