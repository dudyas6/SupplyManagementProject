import React, { useEffect } from "react";

export default function InventoryStatisticsCubes({ items }) {
  let totalRevenue = 0;
  let totalItems = 0;
  let totalUnderMinimum = 0;
  let totalRequiresAttention = 0;
  let requiresAttention = false;

  function calculateStatistics() {
    items.forEach((item) => {
      requiresAttention = item.CurrentQuantity > item.MinimumQuantity * 4 ? true : false;
      totalRevenue += item.Price * item.CurrentQuantity;
      totalItems += item.CurrentQuantity;
      if (item.CurrentQuantity < item.MinimumQuantity) {
        totalUnderMinimum++;
      }
      if (requiresAttention === true) {
        totalRequiresAttention++;
      }
    });
  }

  calculateStatistics();

  return (
    <div className="flex flex-wrap justify-center">
      <div className="w-40 h-40 m-4 bg-blue-500 rounded-md shadow-md hover:bg-blue-600">
        <div className="flex flex-col items-center justify-center h-full">
          <span  className="text-3xl font-bold text-white">{totalItems}</span>
          <span className="text-base text-gray-200">Total Stock</span>
        </div>
      </div>

      <div className="w-40 h-40 m-4 bg-green-500 rounded-md shadow-md hover:bg-green-600">
        <div className="flex flex-col items-center justify-center h-full">
          <span className="text-3xl font-bold text-white">{totalRevenue}$</span>
          <span className="text-base text-gray-200">Expected Revenue</span>
        </div>
      </div>

      <div className="w-40 h-40 m-4 bg-yellow-500 rounded-md shadow-md hover:bg-yellow-600">
        <div className="flex flex-col items-center justify-center h-full">
          <span className="text-3xl font-bold text-white">
            {totalRequiresAttention}
          </span>
          <span className="text-base text-gray-200">Requires Attention</span>
        </div>
      </div>

      <div className="w-40 h-40 m-4 bg-red-500 rounded-md shadow-md hover:bg-red-600">
        <div className="flex flex-col items-center justify-center h-full">
          <span className="text-3xl font-bold text-white">
            {totalUnderMinimum}
          </span>
          <span className="text-base text-gray-200">Under Minimum</span>
        </div>
      </div>
    </div>
  );
}
