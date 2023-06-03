import { useEffect, useState } from "react";
import { Range } from "react-range";
import { StatusEnum } from "../backend/DataFetching/VendorOrdersHandler";

function FilterForm({ orders, onFilter, onClear }) {
  var maxTotalPrice = 10000, //getMaxTotalPrice(),
    maxQuantity = 500; //getMaxQuantity();

  const [itemName, setItemName] = useState("");
  const [purchaseDateStart, setPurchaseDateStart] = useState("");
  const [purchaseDateEnd, setPurchaseDateEnd] = useState("");
  const [quantityRange, setQuantityRange] = useState([0, maxQuantity]);
  const [status, setStatus] = useState("");
  const [totalPriceRange, setTotalPriceRange] = useState([0, maxTotalPrice]);

  // Un comment to activate a button
  //   const handleFilter = (e) => {
  //     e.preventDefault();
  //     const filters = {
  //       itemName,
  //       purchaseDateStart,
  //       purchaseDateEnd,
  //       quantityRange,
  //       status,
  //       totalPriceRange,
  //     };
  //     onFilter(filters);
  //   };

  useEffect(() => {
    // when the filter changes - apply it on place
    const filters = {
      itemName,
      purchaseDateStart,
      purchaseDateEnd,
      quantityRange,
      status,
      totalPriceRange,
    };
    onFilter(filters);
  }, [
    itemName,
    purchaseDateStart,
    purchaseDateEnd,
    quantityRange,
    status,
    totalPriceRange,
  ]);

  const handleClear = () => {
    setItemName("");
    setPurchaseDateStart("");
    setPurchaseDateEnd("");
    setQuantityRange([0, maxQuantity]);
    setStatus("");
    setTotalPriceRange([0, maxTotalPrice]);
    onFilter(null); // TODO: Activate this
  };

  function GenerateStatusOptions() {
    // return all enum statuses as options (for dropbox filter)
    return Object.keys(StatusEnum).map((statusKey) => {
      return (
        <option value={StatusEnum[statusKey]}>{StatusEnum[statusKey]}</option>
      );
    });
  }

  //   function getMaxQuantity(){
  //     // Logic to get the maximum quantity from orders array

  //     const maxQuantity = orders.reduce(
  //       (max, order) => (order.quantity > max ? order.quantity : max),
  //       0
  //     );
  //     console.log(maxQuantity)

  //     return maxQuantity;
  //   };

  //   function getMaxTotalPrice(){
  //     // Logic to get the maximum total price from orders array
  //     const maxTotalPrice = orders.reduce(
  //       (max, order) => (order.totalPrice > max ? order.totalPrice : max),
  //       0
  //     );
  //     return maxTotalPrice;
  //   };

  return (
    <form
      // onSubmit={handleFilter}
      className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 flex-wrap"
    >
      <div className="flex flex-col md:flex-row md:items-center flex-grow">
        <label className="mr-2 font-bold">Item Name:</label>
        <select
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">All</option>
        </select>
      </div>
      <div className="flex flex-col md:flex-row md:items-center flex-grow">
        <label className="mr-2 font-bold">Purchase Date:</label>
        <input
          type="month"
          value={purchaseDateStart}
          onChange={(e) => setPurchaseDateStart(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <span className="mx-2">to</span>
        <input
          type="month"
          value={purchaseDateEnd}
          onChange={(e) => setPurchaseDateEnd(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col md:flex-row md:items-center flex-grow">
        <label className="mr-2 font-bold">Quantity:</label>
        <div className="flex space-x-2 items-center">
          <div className="w-12 text-center">{quantityRange[0]}</div>
          <Range
            values={quantityRange}
            step={1}
            min={0}
            max={maxQuantity}
            onChange={(values) => setQuantityRange(values)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="h-2 bg-gray-300 rounded"
                style={{
                  width: "200px",
                  marginLeft: "calc(var(--thumb-size) / 2)",
                  marginRight: "calc(var(--thumb-size) / 2)",
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                className="w-4 h-4 bg-blue-500 rounded-full cursor-pointer"
              />
            )}
            renderValue={({ value }) => (
              <div className="w-12 text-center">{value}</div>
            )}
          />
          <div className="w-12 text-center">{quantityRange[1]}</div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center flex-grow">
        <label className="mr-2 font-bold">Status:</label>
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
          }}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">All</option>
          {GenerateStatusOptions()}
        </select>
      </div>
      <div className="flex flex-col md:flex-row md:items-center flex-grow">
        <label className="mr-2 font-bold">Total Price:</label>
        <div className="flex space-x-2 items-center">
          <div className="w-12 text-center">{totalPriceRange[0]}</div>
          <Range
            values={totalPriceRange}
            step={0.1}
            min={0}
            max={maxTotalPrice}
            onChange={(values) => setTotalPriceRange(values)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="h-2 bg-gray-300 rounded"
                style={{
                  width: "200px",
                  marginLeft: "calc(var(--thumb-size) / 2)",
                  marginRight: "calc(var(--thumb-size) / 2)",
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                className="w-4 h-4 bg-blue-500 rounded-full cursor-pointer"
              />
            )}
            renderValue={({ value }) => (
              <div className="w-12 text-center">{value}</div>
            )}
          />
          <div className="w-12 text-center">{totalPriceRange[1]}</div>
        </div>
      </div>

      <div className="flex justify-center md:justify-start">
        {/* <button
      type="submit"
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Filter
    </button> */}
        <button
          type="button"
          onClick={handleClear}
          className="px-4 py-2 bg-gray-500 text-white rounded ml-4"
        >
          Clear All
        </button>
      </div>
    </form>
  );
}

export default FilterForm;
