import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { SuccessLabel, ErrorLabel } from "../common/LittleLabels";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [labelMsg, setLabelMsg] = useState("");
  const [signInStatus, setSignInStatus] = useState(null);

  const ValidateLogin = () => {
    if (username === "" || password === "") {
      setLabelMsg("Please fill all fields");
      setSignInStatus("error");
    } else {
      const user = users.find((user) => user.username === username);
      if (user && user.password === password) {
        setSignInStatus("success");
        setLabelMsg("Sign-in successful. Move to the dashboard.");
        sessionStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        setLabelMsg("Invalid username or password");
        setSignInStatus("error");
      }
    }
    return;
  };


  const getUsersData = () => {
    axios
      .get(`http://localhost:3001/users/get`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.error(error));
  };
  // ---- USE EFFECTS ----
  useEffect(() => {
    if (signInStatus === null) return;
    setTimeout(() => {
      if (signInStatus === "success") 
        document.location.href = "/warehouse";
      setSignInStatus(null);
    }, 3000);
  }, [signInStatus]);

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <div className="flex flex-row items-center justify-center mx-auto">
      <div className="flex-1 mx-2 md:flex-row lg:flex-row">
        <div className="w-full mb-2 border border-gray-300 border-solid rounded shadow-sm">
          <div className="px-2 py-3 bg-gray-200 border-b border-gray-200 border-solid">
            Login
          </div>
          <div className="p-3">
          <LoginForm
              setUsername={setUsername}
              setPassword={setPassword}
              ValidateLogin={ValidateLogin}
            />
          </div>
        </div>
        {signInStatus === "success" && <SuccessLabel innerText={labelMsg} />}
        {signInStatus === "error" && <ErrorLabel innerText={labelMsg} />}
      </div>
    </div>
  );
}
