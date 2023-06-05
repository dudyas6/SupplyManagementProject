import React, { useState } from "react";
import { ErrorLabel, SuccessLabel } from "../../../common/LittleLabels";
import {
  DeleteItem,
  UpdateItem,
} from "../../../backend/DataFetching/ItemsHandler";
const ItemCard = ({ item, handleChangeItems }) => {
  const {
    ItemId,
    ItemImage,
    ItemName,
    Description,
    Price,
    CurrentQuantity,
    MinimumQuantity,
  } = item;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(item);
  const [errorText, setErrorText] = useState("");
  const [successMsg, setSuccessText] = useState("");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const onEdit = () => {
    toggleDropdown();
    setIsEditing(true);
  };

  const onDelete = () => {
    toggleDropdown();
    // Handle delete functionality
    DeleteItem(item.ItemId);
    handleChangeItems(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    // Handle save functionality
    const isNumber = /^[0-9]+$/;
    const isFloat = /^[0-9]*\.?[0-9]+$/;
    var error = "";

    if (!editedItem.ItemName.trim().length > 0)
      error += "\n> Item name cannot be empty";
    if (!editedItem.Description.trim().length > 0)
      error += "\n> Item Description cannot be empty";
    if (!isNumber.test(editedItem.MinimumQuantity))
      error += "\n> Minimum quantity is not a number";
    if (!isFloat.test(editedItem.Price)) error += "\n> Price must be float";

    if (error === "") {
      // good scenario
      var msg = "";

      const savedItem = await UpdateItem(editedItem.ItemId, editedItem);

      // find diffs
      if (item.ItemName !== editedItem.ItemName)
        msg += "\n> Item name has changed";
      if (item.Description !== editedItem.Description)
        msg += "\n> Description  has changed";
      if (item.MinimumQuantity !== editedItem.MinimumQuantity)
        msg += "\n> Minimum quantity has changed";
      if (item.Price !== editedItem.Price) msg += "\n> Price has changed";
      setSuccessText(msg);
      setTimeout(() => {
        setSuccessText("");
      }, 3000);
      handleChangeItems(null);
    } else {
      // show error
      setErrorText(error);
    }

    setIsEditing(false);
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-slate-100">
      <div className=" inline-block text-left justify-end px-4 pt-4 float-right">
        <button
          id="dropdownButton"
          type="button"
          onClick={toggleDropdown}
          className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
        >
          <span className="sr-only">Open dropdown</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
          </svg>
        </button>
        {isDropdownOpen && (
          <div className="relative ">
            <div
              id="dropdown"
              className="z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute right-0 mt-2"
            >
              <ul className="py-2" aria-labelledby="dropdownButton">
                <li>
                  <button
                    className="block font-semibold  w-full  px-4 py-2 text-sm text-gray-700 hover:bg-green-100 dark:hover:bg-green-600 dark:text-green-200 dark:hover:text-white"
                    onClick={onEdit}
                  >
                    Edit
                  </button>
                </li>
                <li>
                  <button
                    className="block font-semibold w-full px-4 py-2 text-sm text-red-600 hover:bg-red-100 dark:hover:bg-green-600 dark:text-green-200 dark:hover:text-white"
                    onClick={onDelete}
                  >
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      <img
        className="p-8 rounded-t-lg w-52 h-52 object-contain"
        src={ItemImage}
        alt="product"
      />
      <div className="px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {isEditing ? (
            <input
              type="text"
              name="ItemName"
              value={editedItem.ItemName}
              onChange={handleChange}
              className="block w-full px-2 py-1 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          ) : (
            ItemName
          )}
        </h5>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {isEditing ? (
            <textarea
              name="Description"
              value={editedItem.Description}
              onChange={handleChange}
              className="block w-full px-2 py-1 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          ) : (
            Description
          )}
        </p>
        <div className="flex items-center mt-2.5 mb-5">
          <span className="bg-emerald-100 text-emerald-800 text-md font-semibold px-2.5 py-0.5 rounded dark:bg-emerald-200 dark:text-emerald-800">
            Current quantity: {CurrentQuantity}
          </span>
        </div>
        <div className="flex items-center mt-2.5 mb-5">
          <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
            Minimum quantity:{" "}
            {isEditing ? (
              <input
                type="text"
                name="MinimumQuantity"
                value={editedItem.MinimumQuantity}
                onChange={handleChange}
                className="inline-block w-20 px-2 py-1 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            ) : (
              MinimumQuantity
            )}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            $
            {isEditing ? (
              <input
                type="text"
                name="Price"
                value={editedItem.Price}
                onChange={handleChange}
                className="inline-block w-20 px-2 py-1 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            ) : (
              Price
            )}
          </span>
          {isEditing ? (
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:bg-blue-800"
            >
              Save
            </button>
          ) : (
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create order
            </button>
          )}
        </div>
        {errorText !== "" && (
          <div className="mt-10">
            <ErrorLabel
              innerText={errorText}
              onClose={() => setErrorText("")}
            />
          </div>
        )}
        {successMsg !== "" && (
          <div className="mt-10">
            <SuccessLabel
              innerText={successMsg}
              onClose={() => setSuccessText("")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
