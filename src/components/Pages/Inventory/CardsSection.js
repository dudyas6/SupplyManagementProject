import React, { useState } from "react";
import ItemCard from "./ItemCard";
import FilterForm from "../../../common/FilterForm";
import { Card } from "../../../common/Elements";
import AddItemPopup from "./AddItemPopup";
export default function CardsSection({ items, handleChangeItems }) {
  const [showPopup, setShowPopup] = React.useState(false);
  const [filteredOrders, setFilteredOrders] = useState([]);

  function GenerateCards() {
    const itemsToIterate = filteredOrders ? filteredOrders : items;
    return itemsToIterate.map((item) => (
      <ItemCard
        key={item.ItemId}
        item={item}
        handleChangeItems={handleChangeItems}
      />
    ));
  }

  const handleFilter = (filters) => {
    // when filter component change something

    if (filters === null) {
      setFilteredOrders(items); // clear filters
      return;
    }

    const filterItemName = filters["ItemName"];
    const filterQuantityRange = filters["CurrentQuantity"];
    const filterPrice = filters["Price"];

    const filteredOrders = items.filter((item) => {
      // The actual filter

      return (
        (filterItemName ? item.ItemName.includes(filterItemName) : true) &&
        (filterQuantityRange
          ? item.CurrentQuantity >= filterQuantityRange["start"] &&
            item.CurrentQuantity <= filterQuantityRange["end"]
          : true) &&
        (filterPrice
          ? item.Price >= filterPrice["start"] &&
            item.Price <= filterPrice["end"]
          : true)
      );
    });

    setFilteredOrders(filteredOrders);
  };

  const getMaxCurrentQuantity = () => {
    if (items === undefined) return;
    const maxCurrentQuantity = items.reduce(
      (max, item) => (item.CurrentQuantity > max ? item.CurrentQuantity : max),
      0
    );
    return maxCurrentQuantity;
  };
  const getMaxPrice = () => {
    if (items === undefined) return;
    const maxPrice = items.reduce(
      (max, item) => (item.Price > max ? item.Price : max),
      0
    );
    return maxPrice;
  };
  function getAllItemsNames() {
    const uniqueNames = new Set();
    items.forEach((item) => {
      uniqueNames.add(item.ItemName);
    });
    return Array.from(uniqueNames);
  }

  const filterConfig = {
    ItemName: { type: "Dropdown", options: getAllItemsNames() },
    CurrentQuantity: { type: "Range", min: 0, max: getMaxCurrentQuantity() },
    Price: { type: "Range", min: 0, max: getMaxPrice() },
  };
  return (
    <>
      <div className="w-full mt-4 mb-2 inline-block">
        <button
          onClick={() => setShowPopup(true)}
          className="float-right w-52 h-24 px-4 py-2 font-bold text-white bg-green-500 rounded-3xl hover:bg-green-700"
        >
          + Create Item
        </button>
      </div>
      <Card>
        {/* <FilterComponent data={items} onFilter={onFilter} /> */}
        <FilterForm
          data={items}
          onFilter={handleFilter}
          filterConfig={filterConfig}
        />
      </Card>
      {showPopup && <AddItemPopup />}
      <div className="flex flex-wrap justify-center mt-20 gap-10">
        {GenerateCards()}
      </div>
    </>
  );
}
