import React from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { InsertNewItem } from "../../../backend/DataFetching/ItemsHandler";

export default function AddItemPopup({
  onAccept,
  onClose,
  onChange,
  delegateItem,
}) {
  var image, name, description, price, currentQuantity, minimumQuantity;

  const handleOverlayClick = (e) => {
    e.stopPropagation();
  };
  
  function InsertProcess() {
    image = document.getElementById("image").value;
    name = document.getElementById("name").value;
    description = document.getElementById("description").value;
    price = document.getElementById("price").value;
    currentQuantity = document.getElementById("currentQuantity").value;
    minimumQuantity = document.getElementById("minimumQuantity").value;

    if (
      !validateAllInputs(
        image,
        name,
        description,
        price,
        currentQuantity,
        minimumQuantity
      )
    )
      return;

    // Insert in DB
    const item = InsertNewItem(
      {
        ItemImage: image,
        ItemName: name,
        Description: description,
        Price: price,
        CurrentQuantity: currentQuantity,
        MinimumQuantity: minimumQuantity,
      },
      thenFunc
    );
    return item;
  }

  async function InsertWrap() {
    const item = await InsertProcess();
    onChange(item);
  }

  function thenFunc() {
    let msg = "Item inserted to database successfully";
    setMsgBox("success", msg);
    setTimeout(() => {
      onAccept(true);
      onClose();
    }, 2000);
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
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-70"></div>
      <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center ">
        <div className="flex flex-col p-4 rounded-lg bg-white-lightest">
          <div className="relative">
            <button
              onClick={onClose}
              className="top-0 right-0 float-right w-10 h-10 p-0 m-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700"
            >
              X
            </button>
          </div>
          <div
            id="addItemForm"
            className="grid grid-cols-2 gap-4 text-center"
            style={{ gridTemplateColumns: "1fr 2fr" }}
          >
            <div className="flex items-center justify-center ml-1">
              Image:
              <BsQuestionCircle
                className="text-xs text-gray-400 hover:text-gray-600"
                title="Enter the URL of the item image."
              />
            </div>
            <input
              type="text"
              id="image"
              className="px-4 py-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Image URL"
            />

            <div className="flex items-center justify-center ml-1">
              Name:
              <BsQuestionCircle
                className="text-xs text-gray-400 hover:text-gray-600"
                title="Enter the URL of the item image."
              />
            </div>
            <input
              type="text"
              id="name"
              className="px-4 py-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Item Name"
            />
            <div className="flex items-center justify-center ml-1">
              Description:
              <BsQuestionCircle
                className="text-xs text-gray-400 hover:text-gray-600"
                title="Enter the URL of the item image."
              />
            </div>
            <textarea
              id="description"
              rows="4"
              className="px-4 py-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Item Description"
            ></textarea>

            <div className="flex items-center justify-center ml-1">
              Price:
              <BsQuestionCircle
                className="text-xs text-gray-400 hover:text-gray-600"
                title="Enter the URL of the item image."
              />
            </div>
            <input
              type="number"
              id="price"
              className="px-4 py-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Item Price"
              min={0}
            />

            <div className="flex items-center justify-center ml-1">
              Current Quantity:
              <BsQuestionCircle
                className="text-xs text-gray-400 hover:text-gray-600"
                title="Enter the URL of the item image."
              />
            </div>
            <input
              type="number"
              id="currentQuantity"
              className="px-4 py-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Item Current Quantity"
              min={0}
              value={0}
              disabled={true}
            />

            <div className="flex items-center justify-center ml-1">
              Minimum Quantity:
              <BsQuestionCircle
                className="text-xs text-gray-400 hover:text-gray-600"
                title="Enter the URL of the item image."
              />
            </div>
            <input
              type="number"
              id="minimumQuantity"
              className="px-4 py-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Item Minimum Quantity"
              min={0}
            />

            <button
              onClick={InsertWrap}
              className="w-1/2 col-span-2 px-4 py-2 mx-auto mt-4 font-bold text-white bg-green-500 rounded-lg hover:bg-green-700"
            >
              Add Item
            </button>
            <p
              id="error-box"
              className="col-span-2 font-bold text-center text-red-600"
            ></p>
          </div>
        </div>
      </div>
    </div>
  );
}
