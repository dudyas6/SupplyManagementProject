import "./App.css";
import axios from "axios";
import Header from "./Header";
import MainBody from "./MainBody";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
function App() {
  
  useEffect(() => {
    const connectToMongoDB = async () => {
      try {
        const response = await axios.get("/api/connect");
        console.log(response.data);
      }
      catch (error) {
        console.log(error);
      }
    };
    connectToMongoDB();
  }, []);

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
