import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function ValidateUsernamePasswordSyntax(username, password) {
  // return string if username and password are syntax valid
  if (username === "" || password === "") return "Please fill all fields";
  return "";
}

function ValidateUsernamePasswordDB(allUsers, username, password) {
  // return true if username and password are valid in DB
    try{
        return allUsers.find((user) => user.username === username && user.password === password);
    } catch {
        return "ERROR";
    }
}

function Login(allUsers) {
  // if username or password empty
  // show message

  var username = document.getElementById("grid-username").value;
  var password = document.getElementById("grid-password").value;

  let res = ValidateUsernamePasswordSyntax(username, password);
  if (res !== "") {
    console.log(res);
    return;
  }
  let user = ValidateUsernamePasswordDB(allUsers, username, password);
  if (user === null || user === "ERROR") {
    console.log("Not Found");
    return;
  }

  // success login
  console.log("SUCCESS");

  // TODO: Assigne the "currentUser"
  sessionStorage.setItem('currentUser', JSON.stringify(user));

  // navigate to next page
  document.location.href = "/index";

  return;
}

export default function LoginPage() {
  const [users, setUsers] = useState([]);

  const getUsersData = () => {
    axios
      .get("/api/getAllUsers")
      .then((response) => {
        setUsers(response.data); // Set the response data to the users state
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getUsersData(); // Call the function to fetch and set the users data
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
                    for="grid-username"
                  >
                    Username
                  </label>
                  <input
                    className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white-500"
                    id="grid-username"
                    type="text"
                    placeholder="Username"
                  />
                  <p className="text-xs italic text-red-500">
                    Please fill out this field.
                  </p>
                </div>
                <div className="w-full px-3 md:w-1/2">
                  <label
                    className="block mb-1 text-xs font-light tracking-wide text-gray-700 uppercase"
                    for="grid-password"
                  >
                    Password
                  </label>
                  <input
                    className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white-500"
                    id="grid-password"
                    type="password"
                    placeholder="password"
                  />
                  <p className="text-xs italic text-red-500">
                    Please fill out this field.
                  </p>
                </div>
              </div>
            </form>
            <div className="w-full mt-10 mb-2">
              <button
                onClick={() => Login(users)}
                className="float-right px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
