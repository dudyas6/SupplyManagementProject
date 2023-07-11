import "./styles.css";
import logo from "./assets/icons/minilogo.png";
import { BsXOctagon } from "react-icons/bs";

function Header({ currentUser, handleSidebar }) {
  const handleDisconnect = () => {
    sessionStorage.clear();
    window.location.href = "/"; // login page
  };
  return (
    <header className="bg-nav">
      <div className="flex justify-between">
        <div className="inline-flex items-center p-1 mx-3">
          <i
            className="cursor-pointer pr-2 text-white fas fa-bars"
            onClick={handleSidebar}
          ></i>
          <div className="hidden p-2 mr-2 text-white no-underline md:flex lg:flex">
            Welcome {currentUser.username}
          </div>
        </div>
        <div className="flex flex-row items-center p-1">
          <div className="flex items-center p-2 text-white no-underline md:flex lg:flex">
            <BsXOctagon className="cursor-pointer" onClick={handleDisconnect} />
            <p className="ml-1">Disconnect</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
