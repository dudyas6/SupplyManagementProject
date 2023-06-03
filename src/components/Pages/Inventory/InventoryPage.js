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

  async function handleChangeItems(updatedItems) {
    console.log(updatedItems);
    if (updatedItems === null || updatedItems === undefined) {
      await fetchData();
    } else if (updatedItems.length > 1) setItems(updatedItems);
    else setItems(items.concat(updatedItems));
  }

  return (
    <>
      <Card title="Warehouse Statistics">
        <InventoryStatisticsCubes items={items} />
      </Card>

      <Card title="Warehouse Inventory">
        {/* <Table items={items} orders={orders} onChange={handleChangeItems} /> */}
        <CardsSection items={items} handleChangeItems={handleChangeItems}/>
      </Card>
    </>
  );
}
