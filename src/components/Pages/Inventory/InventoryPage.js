import React from "react";
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
    if (updatedItems === null || updatedItems === undefined) {
      await fetchData();  // for delete / update
      return;
    } else if (updatedItems.length > 1) setItems(updatedItems);  // for filtering change
    else setItems(items.concat(updatedItems)); // for add
  }

  return (
    <>
      <Card title="Warehouse Statistics">
        <InventoryStatisticsCubes items={items} />
      </Card>

      <Card title="Warehouse Inventory">       
        <CardsSection items={items} orders={orders} handleChangeItems={handleChangeItems} />
      </Card>
    </>
  );
}
