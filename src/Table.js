import React from "react";
import TableRow from "./TableRow";
import AddItemPopup from "./AddItemPopup";  

export default function Table() {
  const [table, setTable] = React.useState([]);
  const [isAddItemClicked, setIsAddItemClicked] = React.useState(false);

  function fillTable() {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const tableData = data.products.map((product) => {
          const item = new SingleProduct(
            product.id,
            product.title,
            product.description,
            product.price,
            product.stock,
            product.stock - product.stock / 2
          );
          return item;
        });
        setTable(tableData);
      });
  }

  function addItemPopupHandle() {
    setIsAddItemClicked(!isAddItemClicked);
  }

  function generateTableRows() {
    return table.map((item, index) => (
      <TableRow key={item.id} index={index} item={item}></TableRow>
    ));
  }

  React.useEffect(() => {
    fillTable();
  }, []);

  return (
    <>
      { isAddItemClicked? <AddItemPopup onClose={addItemPopupHandle}></AddItemPopup> : ""}
      <div className="flex-1 p-3 overflow-hidden">
        <div className="flex flex-col items-center ">
          <div className="mt-4 mb-2 w-full">
            <button href='about' className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full float-right">
              + Add Item
            </button>
          </div>
          <div class="flex flex-1  flex-col md:flex-row lg:flex-row mx-2">
            <div class="mb-2 border-solid border-gray-300 rounded border shadow-sm w-full">
              <div class="bg-gray-200 px-2 py-3 border-solid border-gray-200 border-b">
                Insert Warehouse Name Here
              </div>
              <div class="p-3">
                <table class="table-responsive w-full rounded">
                  <thead>
                    <tr>
                      <th class="border w-1/8 px-4 py-2 ">Image</th>
                      <th class="border w-1/6 px-4 py-2">Name</th>
                      <th class="border w-1/2 px-4 py-2">Description</th>
                      <th class="border w-1/8 px-6 py-2">Price</th>
                      <th class="border w-1/8 px-4 py-2 text-center">Current Quantity</th>
                      <th class="border w-1/8 px-4 py-2 text-center">Minimum Quantity</th>
                      <th class="border w-1/8 px-4 py-2">Actions</th>
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

class SingleProduct {
  constructor(id, name, description, price, currentQuantity, minimumQuantity) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.currentQuantity = currentQuantity;
    this.minimumQuantity = minimumQuantity;
  }
}
