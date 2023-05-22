import React from "react";
import axios from "axios";
import { BsQuestionCircle } from "react-icons/bs";

export default function AddItemPopup({ onClose }) {
  function InsertItemToDB() {
    const image = document.getElementById("image").value;
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const currentQuantity = document.getElementById("currentQuantity").value;
    const minimumQuantity = document.getElementById("minimumQuantity").value;

    const isValid = validateAllInputs(
      image,
      name,
      description,
      price,
      currentQuantity,
      minimumQuantity
    );

    if (!isValid) {
      return;
    }

    axios
      .post(`http://localhost:3001/items/add/`, {
        ItemImage: image,
        ItemName: name,
        Description: description,
        Price: price,
        CurrentQuantity: currentQuantity,
        MinimumQuantity: minimumQuantity,
      })
      .then((response) => {
        let msg = "Item inserted to database successfully";
        setMsgBox("success", msg);
        setTimeout(() => {
          onClose();
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function validateAllInputs(
    image,
    name,
    description,
    price,
    currentQuantity,
    minimumQuantity
  ) {
    let isValid = true;
    let errorMsg = "";
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    const allFields = [
      image,
      name,
      description,
      price,
      currentQuantity,
      minimumQuantity,
    ];

    allFields.forEach((field) => {
      if (field.trim() === "" || field === null) {
        errorMsg = "Please fill all fields<br />";
        isValid = false;
      }
    });

    if (!urlRegex.test(image)) {
      errorMsg += "Please enter a valid image URL";
      isValid = false;
    }

    setMsgBox("error", errorMsg);
    return isValid;
  }

  function setMsgBox(msgType, msg) {
    const errorBox = document.getElementById("error-box");
    if (msgType === "error") {
      errorBox.style.color = "red";
      errorBox.innerHTML = msg;
    } else {
      errorBox.style.color = "green";
      errorBox.innerHTML = msg;
    }
    return;
  }
  return (
    <div>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-70"></div>
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center ">
        <div className="flex flex-col bg-white-lightest p-4 rounded-lg">
          <div className="relative">
            <button
              onClick={onClose}
              className="bg-red-500 hover:bg-red-700 text-white font-bold rounded-full top-0 right-0 m-2 p-0 w-10 h-10 float-right"
            >
              X
            </button>
          </div>
          <div
            id="addItemForm"
            className="grid grid-cols-2 gap-4 text-center"
            style={{ gridTemplateColumns: "1fr 2fr" }}
          >
            <div className="ml-1 flex items-center justify-center">
              Image:
              <BsQuestionCircle
                className="text-gray-400 text-xs hover:text-gray-600"
                title="Enter the URL of the item image."
              />
            </div>
            <input
              type="text"
              id="image"
              className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 px-4 py-2"
              placeholder="Enter Image URL"
            />

            <div className="ml-1 flex items-center justify-center">
              Name:
              <BsQuestionCircle
                className="text-gray-400 text-xs hover:text-gray-600"
                title="Enter the URL of the item image."
              />
            </div>
            <input
              type="text"
              id="name"
              className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 px-4 py-2"
              placeholder="Enter Item Name"
            />
            <div className="ml-1 flex items-center justify-center">
              Description:
              <BsQuestionCircle
                className="text-gray-400 text-xs hover:text-gray-600"
                title="Enter the URL of the item image."
              />
            </div>
            <textarea
              id="description"
              rows="4"
              className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 px-4 py-2"
              placeholder="Enter Item Description"
            ></textarea>

            <div className="ml-1 flex items-center justify-center">
              Price:
              <BsQuestionCircle
                className="text-gray-400 text-xs hover:text-gray-600"
                title="Enter the URL of the item image."
              />
            </div>
            <input
              type="number"
              id="price"
              className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 px-4 py-2"
              placeholder="Enter Item Price"
              min={0}
            />

            <div className="ml-1 flex items-center justify-center">
              Current Quantity:
              <BsQuestionCircle
                className="text-gray-400 text-xs hover:text-gray-600"
                title="Enter the URL of the item image."
              />
            </div>
            <input
              type="number"
              id="currentQuantity"
              className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 px-4 py-2"
              placeholder="Enter Item Current Quantity"
              min={0}
            />

            <div className="ml-1 flex items-center justify-center">
              Minimum Quantity:
              <BsQuestionCircle
                className="text-gray-400 text-xs hover:text-gray-600"
                title="Enter the URL of the item image."
              />
            </div>
            <input
              type="number"
              id="minimumQuantity"
              className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 px-4 py-2"
              placeholder="Enter Item Minimum Quantity"
              min={0}
            />

            <button
              onClick={InsertItemToDB}
              className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg col-span-2 w-1/2 mx-auto"
            >
              Add Item
            </button>
            <p
              id="error-box"
              className="text-center col-span-2 text-red-600 font-bold"
            ></p>
          </div>
        </div>
      </div>
    </div>
  );
}
