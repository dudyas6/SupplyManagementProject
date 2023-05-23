import React from "react";
import { VendorStatisticsCubes } from "./VendorStatisticsCubes";
import VendorOrderStatistics from "./VendorOrderStatistics";
import { Card } from "../../../common/Elements";
import { GetAllOrders } from "../../../backend/DataFetching/VendorOrdersHandler";
import VendorOrderTable from "../Tracking/VendorOrderTable";

export function TrackingPage() {
  const [orders, setOrders] = React.useState([]);

  async function fetchOrders() {
    const response = await GetAllOrders();
    setOrders(response);
  }
  fetchOrders();

  // TODO: "UpdateItems"

  return (
    <>
      <Card title="Relevant issues">
        <VendorStatisticsCubes orders={orders} />{" "}
        {/* Change this later to relevant issues !!! */}
        <VendorOrderStatistics orders={orders} />
      </Card>

      <Card title="Orders from vendor">
        <VendorOrderTable orders={orders} />
      </Card>

      <Card title="Orders from user - changeeeeeeeeeeeee content">
        <VendorOrderTable />
      </Card>
    </>
  );
}
