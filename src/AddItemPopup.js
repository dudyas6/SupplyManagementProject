import React from "react";

export default function AddItemPopup({ onClose }) {
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
          <div id="addItemForm" className="grid grid-cols-2 gap-4 text-center">
            <label
              htmlFor="image"
              className="border-yellow-50 text-sm font-medium mt-2"
            >
              Image:
            </label>
            <input
              type="text"
              id="image"
              className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 px-4 py-2"
              placeholder="Enter Image URL"
            />

            <label htmlFor="name" className="text-sm font-medium mt-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 px-4 py-2"
              placeholder="Enter Item Name"
            />

            <label htmlFor="description" className="text-sm font-medium mt-2">
              Description:
            </label>
            <textarea
              id="description"
              rows="4"
              className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 px-4 py-2"
              placeholder="Enter Item Description"
            ></textarea>

            <label htmlFor="price" className="text-sm font-medium mt-2">
              Price:
            </label>
            <input
              type="number"
              id="price"
              className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 px-4 py-2"
              placeholder="Enter Item Price"
            />

            <label
              htmlFor="currentQuantity"
              className="text-sm font-medium mt-2"
            >
              Current Quantity:
            </label>
            <input
              type="number"
              id="currentQuantity"
              className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 px-4 py-2"
              placeholder="Enter Item Current Quantity"
            />

            <label
              htmlFor="minimumQuantity"
              className="text-sm font-medium mt-2"
            >
              Minimum Quantity:
            </label>
            <input
              type="number"
              id="minimumQuantity"
              className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 px-4 py-2"
              placeholder="Enter Item Minimum Quantity"
            />

            <button className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg col-span-2 w-1/2 mx-auto">
              Add Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
