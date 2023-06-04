import React, { useState } from "react";
import VendorOrderRow from "./VendorOrderRow";
import {
  GenerateNewOrder,
  AutoChangeAllVendorOrdersStatus,
} from "../../../backend/DataFetching/VendorOrdersHandler";
import FilterComponent from "../../../common/FilterComponent";
import FilterForm from "../../../common/FilterForm";
import { Card } from "../../../common/Elements";
import { StatusEnum } from "../../../backend/DataFetching/VendorOrdersHandler";

export default function VendorOrderTable({ orders, onChange }) {
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "",
  });
  const [filteredOrders, setFilteredOrders] = useState([]);

  const handleFilter = (filters) => {
    // When filter component change something
    console.log(filters);
    if (filters === null) {
      setFilteredOrders(orders); // clear filters
      return;
    }

    const filterItemName = filters["ItemName"];
    const filterPurchaseDate = filters["PurchaseDate"];
    const filterQuantityRange = filters["Quantity"];
    const filterStatus = filters["Status"];
    const filterTotalPrice = filters["TotalPrice"];

    const filteredOrders = orders.filter((order) => {
      // The actual filter
      var orderYearMonth =
        order.PurchaseDate.split("-")[0] +
        "-" +
        order.PurchaseDate.split("-")[1]; // remove the "day" attribute for better comparison
      return (
        (filterItemName ? order.ItemName.includes(filterItemName) : true) &&
        (filterPurchaseDate &&
        filterPurchaseDate["start"] &&
        filterPurchaseDate["end"]
          ? orderYearMonth >= filterPurchaseDate["start"] &&
            orderYearMonth <= filterPurchaseDate["end"]
          : true) &&
        (filterQuantityRange
          ? order.Quantity >= filterQuantityRange["start"] &&
            order.Quantity <= filterQuantityRange["end"]
          : true) &&
        (filterStatus ? order.Status.includes(filterStatus) : true) &&
        (filterTotalPrice
          ? order.TotalPrice >= filterTotalPrice["start"] &&
            order.TotalPrice <= filterTotalPrice["end"]
          : true)
      );
    });
    setFilteredOrders(filteredOrders); // change the orders so the page will render again with new info
  };

  async function CreateNewOrder() {
    // Function to create a new order
    // If a current order is in process, return (prevent overriding the row)

    if (isCreatingOrder) return;
    setIsCreatingOrder(true);
    const order = await GenerateNewOrder();
    onChange(order);
    setIsCreatingOrder(false);
  }

  async function UpdateOrdersStatus() {
    await AutoChangeAllVendorOrdersStatus();
    onChange(null);
  }

  function GenerateTableRows(ordersToRender) {
    if (
      ordersToRender == null ||
      ordersToRender === [undefined] ||
      !Array.isArray(ordersToRender)
    ) {
      return null;
    }
    // filteredOrders = orders after sort (if applied) and after filter (if applied)

    return filteredOrders.map((order) => (
      <VendorOrderRow key={order.OrderId} order={order} onChange={onChange} />
    ));
  }

  const sortTable = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  React.useEffect(() => {
    if (!orders || !Array.isArray(orders)) {
      console.log("Orders is not an array:", orders);
      return;
    }

    // Sort the orders
    const sortedOrders = [...orders].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setFilteredOrders(sortedOrders);
  }, [orders, sortConfig]);

  //-------------------------- FILTER -----------------------------
  const getMaxQuantity = () => {
    if (orders === undefined) return;
    const maxQuantity = orders.reduce(
      (max, order) => (order.Quantity > max ? order.Quantity : max),
      0
    );
    return maxQuantity;
  };

  const getMaxTotalPrice = () => {
    if (orders === undefined) return;

    const maxTotalPrice = orders.reduce(
      (max, order) => (order.TotalPrice > max ? order.TotalPrice : max),
      0
    );
    return maxTotalPrice;
  };

  function getAllOrdersNames() {
    const uniqueNames = new Set();
    orders.forEach((order) => {
      uniqueNames.add(order.ItemName);
    });
    return Array.from(uniqueNames);
  }

  const filterConfig = {
    ItemName: { type: "Dropdown", options: getAllOrdersNames() },
    PurchaseDate: "Date",
    Quantity: { type: "Range", min: 0, max: getMaxQuantity() },
    Status: { type: "Dropdown", options: Object.values(StatusEnum) },
    TotalPrice: { type: "Range", min: 0, max: getMaxTotalPrice() },
  };
  return (
    <>
      <div className="flex-1 p-3 overflow-hidden">
        <div className="flex flex-col items-center ">
          <div className="w-full mt-4 mb-2">
            <button
              onClick={CreateNewOrder}
              className="float-right m-5 px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700"
            >
              + Add Order
            </button>
            <button
              onClick={UpdateOrdersStatus}
              className="float-right m-5 px-4 py-2 font-bold text-white bg-violet-400 rounded-full hover:bg-violet-700"
            >
              Auto-update Orders
            </button>
          </div>
          <div className="flex flex-col flex-1 w-full mx-2">
            <div className="w-full mb-2 border border-gray-300 border-solid rounded shadow-sm">
              <div className="px-2 py-3 bg-gray-200 border-b border-gray-200 border-solid">
                Orders from vendor
              </div>
              <Card>
                {/* <FilterComponent orders={orders} onFilter={handleFilter} /> */}
                <FilterForm
                  data={orders}
                  onFilter={handleFilter}
                  filterConfig={filterConfig}
                />
              </Card>
              <div className="p-3">
                <table className="w-full rounded table-responsive">
                  <thead>
                    <tr>
                      <th
                        className="w-1/12 px-2 py-2 border cursor-pointer"
                        onClick={() => sortTable("OrderId")}
                      >
                        Order ID
                        {sortConfig.key === "OrderId" &&
                        sortConfig.direction === "asc" ? (
                          <span>▲</span>
                        ) : (
                          <span>▼</span>
                        )}
                      </th>
                      <th
                        className="w-1/6 px-4 py-2 border cursor-pointer"
                        onClick={() => sortTable("ItemName")}
                      >
                        Item Name
                        {sortConfig.key === "ItemName" &&
                        sortConfig.direction === "asc" ? (
                          <span>▲</span>
                        ) : (
                          <span>▼</span>
                        )}
                      </th>
                      <th
                        className="w-1/5 px-4 py-2 border cursor-pointer"
                        onClick={() => sortTable("PurchaseDate")}
                      >
                        Purchase date
                        {sortConfig.key === "PurchaseDate" &&
                        sortConfig.direction === "asc" ? (
                          <span>▲</span>
                        ) : (
                          <span>▼</span>
                        )}
                      </th>
                      <th
                        className="w-1/6 px-6 py-2 border cursor-pointer"
                        onClick={() => sortTable("Quantity")}
                      >
                        Quantity
                        {sortConfig.key === "Quantity" &&
                        sortConfig.direction === "asc" ? (
                          <span>▲</span>
                        ) : (
                          <span>▼</span>
                        )}
                      </th>
                      <th
                        className="w-1/4 px-6 py-2 border cursor-pointer"
                        onClick={() => sortTable("Status")}
                      >
                        Status
                        {sortConfig.key === "Status" &&
                        sortConfig.direction === "asc" ? (
                          <span>▲</span>
                        ) : (
                          <span>▼</span>
                        )}
                      </th>
                      <th
                        className="w-1/4 px-6 py-2 border cursor-pointer"
                        onClick={() => sortTable("TotalPrice")}
                      >
                        Total Price
                        {sortConfig.key === "TotalPrice" &&
                        sortConfig.direction === "asc" ? (
                          <span>▲</span>
                        ) : (
                          <span>▼</span>
                        )}
                      </th>
                      <th className="w-1/4 px-6 py-2 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody>{GenerateTableRows(filteredOrders)}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
