import React from "react";
import TableRow from "./TableRow";
import AddItemPopup from "./AddItemPopup";
import { DeleteOrder } from "../../../backend/DataFetching/VendorOrdersHandler";
export default function Table({items}) {
  const [isAddItemClicked, setIsAddItemClicked] = React.useState(false);


  function addItemPopupHandle() {
    DeleteOrder(11,()=>{return;})
    setIsAddItemClicked(!isAddItemClicked);
  }

  function generateTableRows() {
    return items.map((item, index) => (
      <TableRow key={item.ItemId} index={index} item={item}></TableRow>
    ));
  }

  return (
    <>
      {isAddItemClicked && (
        <AddItemPopup onClose={addItemPopupHandle} ></AddItemPopup>
      )}
      <div className="flex-1 p-3 overflow-hidden">
        <div className="flex flex-col items-center ">
          <div className="w-full mt-4 mb-2">
            <button
              onClick={addItemPopupHandle}
              className="float-right px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700"
            >
              + Add Item
            </button>
          </div>
          <div className="flex flex-col flex-1 w-full mx-2">
            <div className="w-full mb-2 border border-gray-300 border-solid rounded shadow-sm">
              <div className="px-2 py-3 bg-gray-200 border-b border-gray-200 border-solid">
                Haifa Store Inventory
              </div>
              <div className="p-3">
                <table className="w-full rounded table-responsive">
                  <thead className="text-white bg-grey-dark text-norma">
                    <tr>
                      <th className="px-4 py-2 border w-1/8 ">Image</th>
                      <th className="w-1/6 px-4 py-2 border">Name</th>
                      <th className="w-1/2 px-4 py-2 border">Description</th>
                      <th className="px-6 py-2 border w-1/8">Price</th>
                      <th className="px-4 py-2 text-center border w-1/8">
                        Current Quantity
                      </th>
                      <th className="px-4 py-2 text-center border w-1/8">
                        Minimum Quantity
                      </th>
                      <th className="px-4 py-2 border w-1/8">Actions</th>
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
