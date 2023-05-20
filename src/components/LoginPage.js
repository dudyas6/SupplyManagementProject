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
      if (signInStatus === "success") document.location.href = "/dashboard";
      setSignInStatus(null);
    }, 3000);
  }, [signInStatus]);

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md px-8 py-6 bg-white rounded shadow-md">
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuCA_pyAUH6qj935MfUrKdydYYQ-9y40uC0A&usqp=CAU"
            alt="Login"
            className="w-32 h-32 mb-4 rounded-full"
          />
          <h2 className="mb-2 text-2xl font-bold">Login</h2>
        </div>
        <LoginForm
          setUsername={setUsername}
          setPassword={setPassword}
          ValidateLogin={ValidateLogin}
        />
      </div>

      {signInStatus === "success" && (
        <div className="w-full max-w-md px-8 py-6 bg-white rounded shadow-md">
          <SuccessLabel innerText={labelMsg} />
        </div>
      )}
      {signInStatus === "error" && (
        <div className="w-full max-w-md px-8 py-6 bg-white rounded shadow-md">
          <ErrorLabel innerText={labelMsg} />
        </div>
      )}
    </div>
  );
}
