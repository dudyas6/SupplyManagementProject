import React from "react";
import VendorOrderRow from "./VendorOrderRow";
import {
  GenerateNewOrder,
  AutoChangeAllVendorOrdersStatus,
} from "../../../backend/DataFetching/VendorOrdersHandler";

export default function VendorOrderTable({ orders, onChange }) {
  const [isCreatingOrder, setIsCreatingOrder] = React.useState(false); // prevent override order

  const [sortConfig, setSortConfig] = React.useState({
    key: "",
    direction: "",
  });

  async function CreateNewOrder() {
    // the function create a new order
    // if a current order is in process - return (prevent override the row)

    if (isCreatingOrder) return;
    setIsCreatingOrder(true);
    const order = await GenerateNewOrder();
    onChange(order);  // will add just this order
    setIsCreatingOrder(false);
  }

  async function UpdateOrdersStatus() {
    await AutoChangeAllVendorOrdersStatus();
    onChange(null);  // will refresh all orders
  }
  function generateTableRows(ordersToRender) {
    if (
      ordersToRender == null ||
      ordersToRender === [undefined] ||
      !Array.isArray(ordersToRender)
    )
      return null;

    return ordersToRender.map((order) => (
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
        return [];
      }

      // the sort act
      const newOrders = [...orders].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
  
      onChange(newOrders)  // will refresh all orders according to this
      // generateTableRows(newOrders);

  }, [sortConfig]);

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
                      <th
                        className="w-1/12 px-2 py-2 border  cursor-pointer"
                        onClick={() => sortTable("OrderId")}
                      >
                        Order ID{" "}
                        {sortConfig.key === "OrderId" &&
                        sortConfig.direction === "asc"
                          ? "▲"
                          : "▼"}
                      </th>
                      <th
                        className="w-1/6 px-4 py-2 border  cursor-pointer"
                        onClick={() => sortTable("ItemName")}
                      >
                        Item Name{" "}
                        {sortConfig.key === "ItemName" &&
                        sortConfig.direction === "asc"
                          ? "▲"
                          : "▼"}
                      </th>
                      <th
                        className="w-1/5 px-4 py-2 border  cursor-pointer"
                        onClick={() => sortTable("PurchaseDate")}
                      >
                        Purchase date{" "}
                        {sortConfig.key === "PurchaseDate" &&
                        sortConfig.direction === "asc"
                          ? "▲"
                          : "▼"}
                      </th>
                      <th
                        className="w-1/6 px-6 py-2 border  cursor-pointer"
                        onClick={() => sortTable("Quantity")}
                      >
                        Quantity{" "}
                        {sortConfig.key === "Quantity" &&
                        sortConfig.direction === "asc"
                          ? "▲"
                          : "▼"}
                      </th>
                      <th 
                        className="w-1/4 px-6 py-2 border cursor-pointer"
                        onClick={() => sortTable("Status")}
                      >
                        Status{" "}
                        {sortConfig.key === "Status" &&
                        sortConfig.direction === "asc" 
                          ? "▲"
                          : "▼"}
                      </th>
                      <th
                        className="w-1/4 px-6 py-2 border  cursor-pointer"
                        onClick={() => sortTable("TotalPrice")}
                      >
                        Total Price{" "}
                        {sortConfig.key === "TotalPrice" &&
                        sortConfig.direction === "asc"
                          ? "▲"
                          : "▼"}
                      </th>{" "}
                      <th className="w-1/4 px-6 py-2 border ">Actions</th>{" "}
                      {/* Pending, shipping, recieve ? */}
                    </tr>
                  </thead>
                  <tbody>{generateTableRows(orders)}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
