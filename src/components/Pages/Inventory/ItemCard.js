import React, { useState } from "react";

// This component represents a single item 
const ItemCard = ({ item }) => {
    
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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    console.log(isDropdownOpen);
  };
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="relative inline-block text-left justify-end px-4 pt-4 float-right">
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
          <div
            id="dropdown"
            className="z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute right-0 mt-2"
          >
            <ul className="py-2" aria-labelledby="dropdownButton">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Edit
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Delete
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
      <img className="p-8 rounded-t-lg  w-52 h-52 object-contain" src={ItemImage} alt="product" />
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {ItemName}
          </h5>
        </a>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{Description}</p>
        <div className="flex items-center mt-2.5 mb-5">
          <span className="bg-emerald-100 text-emerald-800 text-md font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-emerald-200 dark:text-emerald-800 ml-3">
            Current quantity: {CurrentQuantity}
          </span>
        </div>
        <div className="flex items-center mt-2.5 mb-5">
          <span className="bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
            Minimum quantity: {MinimumQuantity}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ${Price}
          </span>
          <a
            href="#"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create order
          </a>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
