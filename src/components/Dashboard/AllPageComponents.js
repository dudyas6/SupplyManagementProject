import React from "react";

export const StatisticsCubes = () => {
  return (
    <div className="flex flex-wrap justify-center">
      <div className="w-40 h-40 m-4 bg-blue-500 rounded-md shadow-md hover:bg-blue-600">
        <div className="flex flex-col items-center justify-center h-full">
          <span className="text-3xl font-bold text-white">$199.4</span>
          <span className="text-base text-gray-200">Total Cost</span>
        </div>
      </div>

      <div className="w-40 h-40 m-4 bg-green-500 rounded-md shadow-md hover:bg-green-600">
        <div className="flex flex-col items-center justify-center h-full">
          <span className="text-3xl font-bold text-white">256</span>
          <span className="text-base text-gray-200">Items in Stock</span>
        </div>
      </div>

      <div className="w-40 h-40 m-4 bg-yellow-500 rounded-md shadow-md hover:bg-yellow-600">
        <div className="flex flex-col items-center justify-center h-full">
          <span className="text-3xl font-bold text-white">36</span>
          <span className="text-base text-gray-200">Pending Orders</span>
        </div>
      </div>

      <div className="w-40 h-40 m-4 bg-red-500 rounded-md shadow-md hover:bg-red-600">
        <div className="flex flex-col items-center justify-center h-full">
          <span className="text-3xl font-bold text-white">18</span>
          <span className="text-base text-gray-200">Completed Orders</span>
        </div>
      </div>
    </div>
  );
};

export const RefillTable = () => {
  return (
    <table className="table text-grey-darkest">
      <thead className="text-white bg-grey-dark text-normal">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Item</th>
          <th scope="col">Last Stock</th>
          <th scope="col">Current Stock</th>
          <th scope="col">Change</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Product A</td>
          <td>100</td>
          <td>85</td>
          <td>
            <span className="text-red-500">
              <i className="fas fa-arrow-down"></i>15%
            </span>
          </td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Product B</td>
          <td>250</td>
          <td>300</td>
          <td>
            <span className="text-green-500">
              <i className="fas fa-arrow-up"></i>20%
            </span>
          </td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Product C</td>
          <td>50</td>
          <td>40</td>
          <td>
            <span className="text-red-500">
              <i className="fas fa-arrow-down"></i>10%
            </span>
          </td>
        </tr>
        <tr>
          <th scope="row">4</th>
          <td>Product D</td>
          <td>120</td>
          <td>130</td>
          <td>
            <span className="text-green-500">
              <i className="fas fa-arrow-up"></i>8%
            </span>
          </td>
        </tr>
        <tr>
          <th scope="row">5</th>
          <td>Product E</td>
          <td>80</td>
          <td>75</td>
          <td>
            <span className="text-red-500">
              <i className="fas fa-arrow-down"></i>6%
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export const StockGraph = () => {
  return (
    <div className="bg-white rounded shadow">
      <h2 className="px-4 py-3 border-b">Stock Preparation Graph</h2>
      {
        // TODO: Add graph later!
      }
    </div>
  );
};
