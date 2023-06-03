import React, { useEffect } from "react";
import { useState } from "react";
import TableRow from "./TableRow";
import AddItemPopup from "./AddItemPopup";
import { YesNoDialog, PopupWithInput } from "../../../common/Elements";
import { CreateNewVendorOrder } from "../../../backend/DataFetching/VendorOrdersHandler";
import ItemCard from "./ItemCard";

export default function Table({ items, orders, onChange }) {
  const [isAddItemClicked, setIsAddItemClicked] = useState(false);
  const [isAddItemConfirmed, setIsAddItemConfirmed] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [showInputDialog, setShowInputDialog] = useState(false);
  const [tempItem, setTempItem] = useState(null); // [item, setItem

  // "pipe" to another popup to create the order.
  const onSubmitConfirmation = () => {
    setShowConfirmationDialog(false);
    setShowInputDialog(true);
  };

  const handlePopupSubmit = (quantity) => {
    console.log(quantity);

    setShowInputDialog(false);

    // TODO: validate quantity
    console.log(tempItem);
    // create new order
    CreateNewVendorOrder(tempItem.ItemName, quantity, tempItem.Price);
  };

  function onChangePipe(addedItem) {
    // setTempItem(addedItem);
    onChange(addedItem);
  }

  function addItemPopupHandle() {
    setIsAddItemClicked(!isAddItemClicked);
  }

  useEffect(() => {
    if (isAddItemConfirmed) {
      setShowConfirmationDialog(true);
      setIsAddItemConfirmed(false);
    }
  }, [isAddItemConfirmed]);

  function generateTableRows() {
    return items.map((item, index) => (
      <TableRow
        key={item.ItemId}
        index={index}
        item={item}
        order={orders.filter((order) => order.ItemName === item.ItemName)}
        newOrderPopup={setShowConfirmationDialog}
        delegateItem={setTempItem}
        onChange={onChangePipe}
      ></TableRow>
    ));
  }

  return (
    <>
      {isAddItemClicked && (
        <AddItemPopup
          onClose={addItemPopupHandle}
          onAccept={setIsAddItemConfirmed}
          onChange={onChangePipe}
        ></AddItemPopup>
      )}
      {showConfirmationDialog && (
        <YesNoDialog
          messageToShow={`Do you want to create a new order?`} // if we can have the item.... for ${tempItem.ItemName}?`}
          onClose={() => setShowConfirmationDialog(false)}
          onSubmit={onSubmitConfirmation}
        />
      )}
      {showInputDialog && (
        <PopupWithInput
          messageToShow={`Please enter quantity to order: `}
          onClose={() => setShowInputDialog(false)}
          onSubmit={handlePopupSubmit}
        />
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
                <div className="table-responsive">
                  <table className="w-full rounded">
                    <thead>
                      <tr className="text-white bg-grey-dark text-normal">
                        <th className="px-2 border">Image</th>
                        <th className="px-2 border">Name</th>
                        <th className="px-4 border">Description</th>
                        <th className="px-4 text-center border">Price</th>
                        <th className="px-4 text-center border">
                          Current Quantity
                        </th>
                        <th className="px-4 text-center border">
                          Minimum Quantity
                        </th>
                        <th className="px-4 text-center border">
                          Pending Order
                        </th>
                        <th className="px-4 text-center border">Actions</th>
                      </tr>
                    </thead>
                    <tbody>{generateTableRows()}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
