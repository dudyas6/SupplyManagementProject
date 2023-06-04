import React from "react";
import ItemCard from "./ItemCard";
import FilterComponent from "../../../common/FilterComponent";
import { Card } from "../../../common/Elements";
import AddItemPopup from "./AddItemPopup";
export default function CardsSection({ items, orders, handleChangeItems }) {
  const [showPopup, setShowPopup] = React.useState(false);

  function GenerateCards() {
    return items.map((item) => (
      <ItemCard
        key={item.ItemId}
        item={item}
        handleChangeItems={handleChangeItems}
      />
    ));
  }

  function onFilter(filters) {
    console.log(filters);
  }

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
        <FilterComponent orders={items} onFilter={onFilter} />
      </Card>
      {showPopup && <AddItemPopup />}
      <div className="flex flex-wrap justify-center mt-20 gap-10">
        {GenerateCards()}
      </div>
    </>
  );
}
