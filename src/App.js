import "./App.css";

import Header from "./Header";
import MainBody from "./MainBody";
import Sidebar from "./Sidebar";
function App() {
  return (
    <div className="">
      <div className="mx-auto bg-grey-400">
        <div className="flex flex-col min-h-screen">
          <Header></Header>
          <div class="flex flex-1">
            <Sidebar></Sidebar>
            <MainBody></MainBody>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
