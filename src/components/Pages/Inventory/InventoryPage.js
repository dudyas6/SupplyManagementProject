import React from "react";
import Table from "./Table";
import InventoryStatisticsCubes from "./InventoryStatisticsCubes";
import { Card } from "../../../common/Elements";
import { GetAllItems} from "../../../backend/DataFetching/ItemsHandler";
import { GetAllOrders } from "../../../backend/DataFetching/VendorOrdersHandler";

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

  // React.useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const ItemsResponse = await GetAllItems();
  //       setItems(ItemsResponse);
  //       const ordersRespone = await GetAllOrders();
  //       setOrders(ordersRespone);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   fetchData();
  // }, []);

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
        <Table items={items} orders={orders} onChange={handleTableChange} />
      </Card>
    </>
  );
}
