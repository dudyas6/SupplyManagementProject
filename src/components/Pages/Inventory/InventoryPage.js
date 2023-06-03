import React from "react";
import Table from "./Table";
import InventoryStatisticsCubes from "./InventoryStatisticsCubes";
import { Card } from "../../../common/Elements";
import { GetAllItems } from "../../../backend/DataFetching/ItemsHandler";
import { GetAllOrders } from "../../../backend/DataFetching/VendorOrdersHandler";
import CardsSection from "./CardsSection";

export function InventoryPage() {
  // The main of Inventory page
  const [items, setItems] = React.useState([]);
  const [orders, setOrders] = React.useState([]);

  async function fetchData() {
    try {
      const ItemsResponse = await GetAllItems();
      setItems(ItemsResponse);
      const ordersRespone = await GetAllOrders();
      setOrders(ordersRespone);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  async function handleTableChange(updatedOrders) {
    if (updatedOrders === null || updatedOrders === undefined) {
      await fetchData();
    } else if (updatedOrders.length > 1) setItems(updatedOrders);
    else setItems(items.concat(updatedOrders));
  }

  return (
    <>
      <Card title="Warehouse Statistics">
        <InventoryStatisticsCubes items={items} />
      </Card>

      <Card title="Warehouse Inventory">
        {/* <Table items={items} orders={orders} onChange={handleTableChange} /> */}
        <CardsSection items={items} />
      </Card>
    </>
  );
}
