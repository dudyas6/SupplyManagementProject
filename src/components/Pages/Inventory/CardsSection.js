import React, { useState } from "react";
import ItemCard from "./ItemCard";
import FilterForm from "../../../common/FilterForm";
import { Card } from "../../../common/Elements";
import AddItemPopup from "./AddItemPopup";
import { StatusEnum } from "../../../backend/DataFetching/VendorOrdersHandler";
import { CreateNewVendorOrder } from "../../../backend/DataFetching/VendorOrdersHandler";
import { ErrorDialog } from "../../../common/Elements";
import { CreateOrderPopup } from "../../../common/Elements";

export default function CardsSection({ items, orders, handleChangeItems }) {
  const [showPopup, setShowPopup] = React.useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [product, setProduct] = useState(null);
  const [showCreateItemPopup, setShowCreateItemPopup] = useState(false);

  function GenerateCards() {
    const itemsToIterate = filteredItems ? filteredItems : items;
    return itemsToIterate.map((item) => (
      <ItemCard
        key={item.ItemId}
        item={item}
        itemOrders={orders.filter((order) => {
          return order.ItemName === item.ItemName;
        })}
        isOrderCreated={setIsOrderCreated}
        showErrorPopupHandle={showErrorPopupHandle}
        setShowCreateItemPopupHandle={setShowCreateItemPopupHandle}
        handleChangeItems={handleChangeItems}
      />
    ));
  }

  function FilterByOrderInProgress() {
    if (buttonClicked) {
      // Remove all filters
      setFilteredItems(items);
      return;
    }
    const itemsToWorkWith = filteredItems ? filteredItems : items;
    const itemsAfterFilter = [];
    for (const item of itemsToWorkWith) {
      const itemOrders = orders.filter((order) => {
        return (
          order.ItemName === item.ItemName &&
          (order.Status !== StatusEnum.COMPLETED ||
            (order.Status === StatusEnum.COMPLETED &&
              order.IsAddedToWarehouse === false))
        );
      });
      if (itemOrders.length > 0) {
        itemsAfterFilter.push(item);
      }
    }
    if (itemsAfterFilter.length > 0) setFilteredItems(itemsAfterFilter);
  }

  const handleFilter = (filters) => {
    // when filter component change something

    if (filters === null) {
      setFilteredItems(items); // clear filters
      return;
    }

    const filterItemName = filters["ItemName"];
    const filterQuantityRange = filters["CurrentQuantity"];
    const filterPrice = filters["Price"];

    const itemsAfterFilter = items.filter((item) => {
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

    setFilteredItems(itemsAfterFilter);
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

  function addItemPopupHandle() {
    setShowPopup(!showPopup);
  }

  function showErrorPopupHandle(msg) {
    setErrorMsg(msg);
    setShowErrorPopup(!showErrorPopup);
  }

  function setShowCreateItemPopupHandle(item) {
    setProduct(item);
    setShowCreateItemPopup(!showCreateItemPopup);
  }

  async function handleCreateOrderRequest(item, orderAmount, itemPrice) {
    const order = await CreateNewVendorOrder(item, orderAmount, itemPrice);
    return order.OrderId;
  }

  return (
    <>
      <div className="w-full mt-4 mb-2 inline-block">
        <button
          onClick={() => setShowPopup(true)}
          className="float-right m-5 px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700"
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
        <div className="flex flex-wrap justify-center mt-10">
          <button
            onClick={() => {
              setButtonClicked(!buttonClicked);
              FilterByOrderInProgress();
            }}
            className={`${
              buttonClicked
                ? "hover:bg-yellow-100 bg-yellow-400"
                : "bg-yellow-100 hover:bg-yellow-400"
            } text-yellow-800 text-md font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-400 border border-yellow-400`}
          >
            Show items with active order
          </button>
        </div>
      </Card>
      {showPopup && (
        <AddItemPopup
          onClose={addItemPopupHandle}
          handleChangeItems={handleChangeItems}
        />
      )}
      {showErrorPopup && (
        <ErrorDialog messageToShow={errorMsg} onClose={setShowErrorPopup} />
      )}
      {showCreateItemPopup && (
        <CreateOrderPopup
          onClose={setShowCreateItemPopup}
          onSubmit={handleCreateOrderRequest}
          handleChangeItems={handleChangeItems}
          item={product}
        />
      )}
      <div className="flex flex-wrap justify-center mt-20 gap-10">
        {GenerateCards()}
      </div>
    </>
  );
}
