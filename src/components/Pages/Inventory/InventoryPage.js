import React from "react";
import Table from "./Table";
import InventoryStatisticsCubes from "./InventoryStatisticsCubes";
import { Card } from "../../../common/Elements";
import { GetAllItems } from "../../../backend/DataFetching/ItemsHandler";

export function InventoryPage() {
  // The main of Inventory page
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await GetAllItems();
        setItems(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [items]);

  function handleTableChange(updatedOrders) {
    if (updatedOrders == null || updatedOrders === undefined) return;
    setItems(items.concat(updatedOrders));
  }

  return (
    <>
      <Card title="Relevant issues">
        <InventoryStatisticsCubes items={items} />
      </Card>

      <Card title="All inventory items">
        <Table items={items} onChange={handleTableChange} />
      </Card>
    </>
  );
}
