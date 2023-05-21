import React from "react";
import axios from "axios";
import VendorOrderRow from "./VendorOrderRow";

export default function VendorOrderTable() {
  const [table, setTable] = React.useState([]);
  const [isAddItemClicked, setIsAddItemClicked] = React.useState(false);

  function GetTableData() {
    axios
      .get(`http://localhost:3001/orders/vendor/get/`)
      .then((response) => {
        const tableData = response.data.map((order) => {
          const item = new SingleItem(
            order.ItemID,
            order.ItemName,
            order.PurchaseDate,
            order.Quantity,
            order.Status,
            order.TotalPrice
          );
          return item;
        });
        setTable(tableData);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addItemPopupHandle() {
    setIsAddItemClicked(!isAddItemClicked);
  }

  function generateTableRows() {
    return table.map((order, index) => (
      <VendorOrderRow key={order.ItemID} order={order}></VendorOrderRow>
    ));
  }

  React.useEffect(() => {
    GetTableData();
  }, []);

  return (
    <>
   
      <div className="flex-1 p-3 overflow-hidden">
        <div className="flex flex-col items-center ">
          <div className="w-full mt-4 mb-2">
            <button
              onClick={addItemPopupHandle}
              className="float-right px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700"
            >
              + Add Order
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
                      <th className="w-1/12 px-2 py-2 border ">Item ID</th>
                      <th className="w-1/6 px-4 py-2 border">Item Name</th>
                      <th className="w-1/5 px-4 py-2 border">Purchase date</th>
                      <th className="w-1/6 px-6 py-2 border">Quantity</th>
                      <th className="w-1/4 px-6 py-2 border">Status</th>{" "}
                      <th className="w-1/4 px-6 py-2 border">Total Price</th>{" "}
                      <th className="w-1/4 px-6 py-2 border">Actions</th>{" "}
                      {/* Pending, shipping, recieve ? */}
                    </tr>
                  </thead>
                  <tbody>{generateTableRows()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

class SingleItem {
  constructor(ItemID, ItemName, PurchaseDate, Quantity, Status, TotalPrice) {
    this.ItemID = ItemID;
    this.ItemName = ItemName;
    this.PurchaseDate = PurchaseDate;
    this.Quantity = Quantity;
    this.Status = Status;
    this.TotalPrice = TotalPrice;
  }
}
