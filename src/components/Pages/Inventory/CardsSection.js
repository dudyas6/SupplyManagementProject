import React from "react";
import ItemCard from "./ItemCard";
import FilterComponent from "../../../common/FilterComponent";
import { Card } from "../../../common/Elements";
export default function CardsSection({ items, orders, onChange }) {
  function GenerateCards() {
    return items.map((item) => <ItemCard item={item} />);
  }
  function onFilter() {}
  return (
    <>
      <Card>
        <FilterComponent orders={undefined} onFilter={onFilter} />
      </Card>
      <div className="flex flex-wrap justify-center mt-20 gap-10">
        {GenerateCards()}
      </div>
    </>
  );
}
