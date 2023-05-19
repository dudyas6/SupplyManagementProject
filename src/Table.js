import React from "react";
import TableRow from "./TableRow";
import AddItemPopup from "./AddItemPopup";  
import axios from "axios";

export default function Table() {
  const [table, setTable] = React.useState([]);
  const [isAddItemClicked, setIsAddItemClicked] = React.useState(false);

  function fillTable() {
    axios
    .get(`http://localhost:3001/api/getAllItems`)
    .then((response) => {
      const tableData = response.data.map((product) => {
        const item = new SingleItem(
          product.ItemImage,
          product.ItemId,
          product.ItemName,
          product.Description,
          product.Price,
          product.CurrentQuantity,
          product.MinimumQuantity
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
    console.log(table);
    return table.map((item, index) => (
      <TableRow key={item.ItemId} index={index} item={item}></TableRow>
    ));
  }

  React.useEffect(() => {
    console.log("useEffect");
    fillTable();
  }, []);

  return (
    <>
      { isAddItemClicked? <AddItemPopup onClose={addItemPopupHandle}></AddItemPopup> : ""}
      <div className="flex-1 p-3 overflow-hidden">
        <div className="flex flex-col items-center ">
          <div className="mt-4 mb-2 w-full">
            <button onClick={addItemPopupHandle} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full float-right">
              + Add Item
            </button>
          </div>
          <div className="flex flex-1 w-full flex-col mx-2">
            <div className="mb-2 border-solid border-gray-300 rounded border shadow-sm w-full">
              <div className="bg-gray-200 px-2 py-3 border-solid border-gray-200 border-b">
                Haifa Store Inventory
              </div>
              <div className="p-3">
                <table className="table-responsive w-full rounded">
                  <thead>
                    <tr>
                      <th className="border w-1/8 px-4 py-2 ">Image</th>
                      <th className="border w-1/6 px-4 py-2">Name</th>
                      <th className="border w-1/2 px-4 py-2">Description</th>
                      <th className="border w-1/8 px-6 py-2">Price</th>
                      <th className="border w-1/8 px-4 py-2 text-center">Current Quantity</th>
                      <th className="border w-1/8 px-4 py-2 text-center">Minimum Quantity</th>
                      <th className="border w-1/8 px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                      {generateTableRows()}
                  </tbody>
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
  constructor(ItemImage, ItemId, ItemName, Description, Price, CurrentQuantity, MinimumQuantity) {
    this.ItemImage = ItemImage;
    this.ItemId = ItemId;
    this.ItemName = ItemName;
    this.Description = Description;
    this.Price = Price;
    this.CurrentQuantity = CurrentQuantity;
    this.MinimumQuantity = MinimumQuantity;
  }
}
