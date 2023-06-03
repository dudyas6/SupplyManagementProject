import React from "react";
import ItemCard from "./ItemCard";
import FilterComponent from "../../../common/FilterComponent";
import { Card } from "../../../common/Elements";
export default function CardsSection({ items, orders, handleChangeItems }) {
  function GenerateCards() {
    return items.map((item) => <ItemCard key={item.ItemId} item={item} handleChangeItems={handleChangeItems} />);
  }

  function onFilter(filters) {
    console.log(filters)
  }

  return (
    <>
      <Card>
        <FilterComponent orders={items} onFilter={onFilter}  />
      </Card>
      <div className="flex flex-wrap justify-center mt-20 gap-10">
        {GenerateCards()}
      </div>
    </>
  );
}
