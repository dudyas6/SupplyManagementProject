import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { SuccessLabel, ErrorLabel } from "../common/LittleLabels";

export default function LoginPage() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [signInStatus, setSignInStatus] = useState(null);

  const ValidateLogin = () => {
    if (username === "" || password === "") {
      setError("Please fill all fields");
      setSignInStatus("error");
    } else {
      const user = users.find((user) => user.username === username);
      if (user && user.password === password) {
        setSignInStatus("success");
        sessionStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        setError("Invalid username or password");
        setSignInStatus("error");
      }
    }
    setTimeout(() => {
      if (signInStatus === "success") {console.log("B"); document.location.href = "/warehouse"; }
      setSignInStatus(null);
    }, 3000);
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
            <form className="w-full">
              <div className="flex flex-wrap mb-6 -mx-3">
                <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                  <label
                    className="block mb-1 text-xs font-light tracking-wide text-gray-700 uppercase"
                    htmlFor="grid-username"
                  >
                    Username
                  </label>
                  <input
                    className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white-500"
                    id="grid-username"
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <p className="text-xs italic text-red-500">
                    Please fill out this field.
                  </p>
                </div>
                <div className="w-full px-3 md:w-1/2">
                  <label
                    className="block mb-1 text-xs font-light tracking-wide text-gray-700 uppercase"
                    htmlFor="grid-password"
                  >
                    Password
                  </label>
                  <input
                    className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white-500"
                    id="grid-password"
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <p className="text-xs italic text-red-500">
                    Please fill out this field.
                  </p>
                </div>
              </div>
              <div className="w-full mt-10 mb-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    ValidateLogin();
                  }}
                  className="float-right px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700"
                >
                  Login
                </button>
                <div className="clear-both" />
              </div>
            </form>
          </div>
        </div>
        {signInStatus === "success" && (
          <SuccessLabel
            innerText="Sign-in successful. Move to the dashboard."
          />
        )}
        {signInStatus === "error" && (
          // Error msg
          <ErrorLabel innerText={error} />
        )}
      </div>
    </div>
  );
}
