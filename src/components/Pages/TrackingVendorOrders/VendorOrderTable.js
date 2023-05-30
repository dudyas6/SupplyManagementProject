import React from "react";
import VendorOrderRow from "./VendorOrderRow";
import { StatusEnum } from "../../../backend/DataFetching/VendorOrdersHandler";
import {
  GenerateNewOrder,
  AutoChangeAllVendorOrdersStatus,
} from "../../../backend/DataFetching/VendorOrdersHandler";
export default function VendorOrderTable({ orders, onChange }) {
  const [isCreatingOrder, setIsCreatingOrder] = React.useState(false);
  const [sortConfig, setSortConfig] = React.useState({
    key: "",
    direction: "",
  });
  const [filterText, setFilterText] = React.useState("");
  const [filteredOrders, setFilteredOrders] = React.useState([]);
  const [filterConfig, setFilterConfig] = React.useState({});

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

  function GenerateStatusOptions() {
    return StatusEnum.map((status) => {
      console.log(status);
      return <option value={status}>{status}</option>;
    });
  }

  function generateTableRows(ordersToRender) {
    if (
      ordersToRender == null ||
      ordersToRender === [undefined] ||
      !Array.isArray(ordersToRender)
    ) {
      return null;
    }
    // apply multiple filters

    const filteredOrders = ordersToRender.filter((order) => {
      console.log(
        "1: " + filterConfig.OrderId,
        "2: " + filterConfig.ItemName,
        "quan: " + filterConfig.Quantity
      );
      return (
        (filterConfig.OrderId
          ? order.OrderId === filterConfig.OrderId
          : true) &&
        (filterConfig.ItemName
          ? order.ItemName.includes(filterConfig.ItemName)
          : true) &&
        (filterConfig.PurchaseDate
          ? order.PurchaseDate.includes(filterConfig.PurchaseDate)
          : true) &&
        (filterConfig.Quantity
          ? order.Quantity === filterConfig.Quantity
          : true) &&
        (filterConfig.Status
          ? order.Status.includes(filterConfig.Status)
          : true) &&
        (filterConfig.TotalPrice
          ? order.TotalPrice.includes(filterConfig.TotalPrice)
          : true)
      );
    });

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

  const filterOrders = (text) => {
    const filtered = orders.filter((order) =>
      order.ItemName.toLowerCase().includes(text.toLowerCase())
    );
    setFilterText(text);
    setFilteredOrders(filtered);
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

    // Filter the sorted orders if there's a filter text
    const filtered = filterText
      ? sortedOrders.filter((order) =>
          order.ItemName.toLowerCase().includes(filterText.toLowerCase())
        )
      : sortedOrders;

    setFilteredOrders(filtered);
  }, [orders, sortConfig, filterText]);

  return (
    <>
      <div className="flex-1 p-3 overflow-hidden">
        <div className="flex flex-col items-center ">
          <div className="w-full mt-4 mb-2">
            <button
              onClick={CreateNewOrder}
              className="float-right px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700"
            >
              + Add Order
            </button>
            <button
              onClick={UpdateOrdersStatus}
              className="float-right px-4 py-2 font-bold text-white bg-violet-400 rounded-full hover:bg-violet-700"
            >
              Auto-update Orders
            </button>
          </div>
          <div className="flex flex-col flex-1 w-full mx-2">
            <div className="w-full mb-2 border border-gray-300 border-solid rounded shadow-sm">
              <div className="px-2 py-3 bg-gray-200 border-b border-gray-200 border-solid">
                Orders from vendor
              </div>
              <div className="p-3">
                <table className="w-full rounded table-responsive">
                  <thead>
                    <tr>
                      <th className="w-1/12 px-2 py-2 border cursor-pointer" onClick={() => sortTable("OrderId")}>
                        Order ID
                        {sortConfig.key === "OrderId" &&
                        sortConfig.direction === "asc" ? (
                          <span>▲</span>
                        ) : (
                          <span>▼</span>
                        )}
                      </th>
                      <th className="w-1/6 px-4 py-2 border cursor-pointer" onClick={() => sortTable("ItemName")}>
                        Item Name
                        {sortConfig.key === "ItemName" &&
                        sortConfig.direction === "asc" ? (
                          <span>▲</span>
                        ) : (
                          <span>▼</span>
                        )}
                      </th>
                      <th className="w-1/5 px-4 py-2 border cursor-pointer" onClick={() => sortTable("PurchaseDate")}>
                        Purchase date
                        {sortConfig.key === "PurchaseDate" &&
                        sortConfig.direction === "asc" ? (
                          <span>▲</span>
                        ) : (
                          <span>▼</span>
                        )}
                      </th>
                      <th className="w-1/6 px-6 py-2 border cursor-pointer" onClick={() => sortTable("Quantity")}
                      >
                        Quantity
                        {sortConfig.key === "Quantity" &&
                        sortConfig.direction === "asc" ? (
                          <span>▲</span>
                        ) : (
                          <span>▼</span>
                        )}
                        <br />
                        <button
                          onClick={() =>
                            setFilterConfig({ ...filterConfig, Quantity: 4 })
                          }
                          className="text-xs underline"
                        >
                          Filter
                        </button>
                      </th>
                      <th className="w-1/4 px-6 py-2 border cursor-pointer" onClick={() => sortTable("Status")}
                      >
                        Status
                        
                        {sortConfig.key === "Status" &&
                        sortConfig.direction === "asc" ? (
                          <span>▲</span>
                        ) : (
                          <span>▼</span>
                        )}
                        <div>
                          <select
                            className="form-control"
                            aria-label="Floating label select example"
                           
                          >
                            <option value="choose" disabled selected="selected">
                              -- Select status --
                            </option>
                            {GenerateStatusOptions}
                          </select>
                        </div>
                      </th>
                      <th className="w-1/4 px-6 py-2 border cursor-pointer" onClick={() => sortTable("TotalPrice")}
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
                    <tr>
                      <th className="w-1/12 px-2 py-2 border">
                        <input
                          type="text"
                          value={filterText}
                          onChange={(e) => filterOrders(e.target.value)}
                          className="w-full px-2 py-1 rounded"
                          placeholder="Filter"
                        />
                      </th>
                      <th className="w-1/6 px-4 py-2 border">
                        {/* Add filter input here */}
                        <input
                          type="text"
                          value={filterText}
                          onChange={(e) => filterOrders(e.target.value)}
                          className="w-full px-2 py-1 rounded"
                          placeholder="Filter"
                        />
                      </th>
                      <th className="w-1/5 px-4 py-2 border">
                        {/* Add filter input here */}
                        <input
                          type="text"
                          value={filterText}
                          onChange={(e) => filterOrders(e.target.value)}
                          className="w-full px-2 py-1 rounded"
                          placeholder="Filter"
                        />
                      </th>
                      <th className="w-1/6 px-6 py-2 border">
                        {/* Add filter input here */}
                        <input
                          type="text"
                          value={filterText}
                          onChange={(e) => filterOrders(e.target.value)}
                          className="w-full px-2 py-1 rounded"
                          placeholder="Filter"
                        />
                      </th>
                      <th className="w-1/4 px-6 py-2 border">
                        {/* Add filter input here */}
                        <input
                          type="text"
                          value={filterText}
                          onChange={(e) => filterOrders(e.target.value)}
                          className="w-full px-2 py-1 rounded"
                          placeholder="Filter"
                        />
                      </th>
                      <th className="w-1/4 px-6 py-2 border">
                        {/* Add filter input here */}
                        <input
                          type="text"
                          value={filterText}
                          onChange={(e) => filterOrders(e.target.value)}
                          className="w-full px-2 py-1 rounded"
                          placeholder="Filter"
                        />
                      </th>
                      <th className="w-1/4 px-6 py-2 border"></th>
                    </tr>
                  </thead>
                  <tbody>{generateTableRows(filteredOrders)}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
