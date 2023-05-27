import React from "react";
import Table from "./Table";
import { StatisticsCubes } from "../Dashboard/AllPageComponents";
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
        // Handle error, e.g., show an error message or log it
      }
    }

    fetchData();
  }, [items]);

  function handleTableChange(updatedOrders) {
    console.log(updatedOrders)
    if (updatedOrders == null || updatedOrders === undefined) return;
    console.log("updatedOrders")

    setItems(items.concat(updatedOrders));
  }

  return (
    <>
      <Card title="Relevant issues">
        <StatisticsCubes items={items} />{" "}
        {/* Change this later to relevant issues !!! */}
      </Card>

      <Card title="All inventory items">
        <Table items={items} onChange={handleTableChange} />
      </Card>
    </>
  );
}
