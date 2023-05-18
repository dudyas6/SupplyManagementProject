import './styles.css'
function Header() {
  const userJson = sessionStorage.getItem('currentUser');
  var currentUser = JSON.parse(userJson)
  // header className was: App-header
  return (
    <header className="bg-nav"> 
      <div className="flex justify-between">
          <div class="p-1 mx-3 inline-flex items-center">
              <i className="pr-2 text-white fas fa-bars" onclick="sidebarToggle()"></i>
              <h1 className="p-2 text-white">Logo</h1>
          </div>
          <div className="flex flex-row items-center p-1">
              <a href="https://github.com/tailwindadmin/admin" className="hidden p-2 mr-2 text-white no-underline md:block lg:block">Project Github</a>


              <img onclick="profileToggle()" className="inline-block w-8 h-8 rounded-full" src="https://avatars0.githubusercontent.com/u/4323180?s=460&v=4" alt="" /> 
              <a href="#" onclick="profileToggle()" className="hidden p-2 text-white no-underline md:block lg:block">{currentUser.username}</a> 
              <div id="ProfileDropDown" className="absolute hidden mt-12 mr-1 bg-white rounded shadow-md pin-t pin-r">
                  <ul className="list-reset">
                    <li><a href="#" className="block px-4 py-2 text-black no-underline hover:bg-grey-light">My account</a></li>
                    <li><a href="#" className="block px-4 py-2 text-black no-underline hover:bg-grey-light">Notifications</a></li>
                    <li><hr className="mx-2 border-t border-grey-ligght"/></li>
                    <li><a href="#" className="block px-4 py-2 text-black no-underline hover:bg-grey-light">Logout</a></li>
                  </ul>
              </div>
          </div>
        </div>
    </header>
  );
}

export default Header;
