import React from "react";
import { VendorStatisticsCubes } from "./VendorStatisticsCubes";
import VendorOrderStatistics from "./VendorOrderStatistics";
import { Card } from "../../../common/Elements";
import { GetAllOrders } from "../../../backend/DataFetching/VendorOrdersHandler";
import VendorOrderTable from "../Tracking/VendorOrderTable";

export function TrackingPage() {
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await GetAllOrders();
        setOrders(response);
      } catch (error) {
        // Handle error, e.g., show an error message or log it
      }
    }
  
    fetchData();
  }, []);

  // I did here something like delegate
  function handleTableChange(updatedOrders) {
    if(updatedOrders == null || updatedOrders === undefined) return;
    setOrders(orders.concat(updatedOrders));
  }
  return (
    <>
      <Card title="Relevant issues">
        <VendorStatisticsCubes orders={orders} />{" "}
        {/* Change this later to relevant issues !!! */}
        <VendorOrderStatistics orders={orders} />
      </Card>

      <Card title="Orders from vendor">
        <VendorOrderTable orders={orders} onChange={handleTableChange} />
      </Card>

      <Card title="Orders from user - changeeeeeeeeeeeee content">
        <VendorOrderTable />
      </Card>
    </>
  );
}
