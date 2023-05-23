import React from "react";
import Table from "./Table";
import { StatisticsCubes } from "../Dashboard/AllPageComponents";
import { Card } from "../../../common/Elements";
import { GetAllItems } from "../../../backend/DataFetching/ItemsHandler";

export function InventoryPage() {
  // The main of Inventory page
  const [items, setItems] = React.useState([]);

  async function fetchOrders() {
    // gets items async
    setItems(await GetAllItems());
  }
  fetchOrders();


  return (
    <>
      <Card title="Relevant issues">
        <StatisticsCubes /> {/* Change this later to relevant issues !!! */}
      </Card>

      <Card title="All inventory items">
        <Table items={items} />
      </Card>
    </>
  );
}
