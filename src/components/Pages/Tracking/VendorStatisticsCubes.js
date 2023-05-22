import React from "react";
import { Cube } from "../../../common/Elements";

// get data from server

// analyze data

// generate cubes

export const VendorStatisticsCubes = () => {
  return (
    <div className="flex flex-wrap justify-center">
        <Cube big="$199.4" small="Total Cost"/>
        <Cube big="256" small="Items in Stock"/>
        <Cube big="45" small="Pending Orders"/>
        <Cube big="18" small="Completed Orders"/>
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
