import React from "react";
import { Card } from "../../../common/Elements";
import { GetOrderOfAllUsers } from "../../../backend/DataFetching/UsersOrdersHandler";
import UserOrderTable from "./UserOrderTable";
import { Helmet } from "react-helmet";

export function TrackingPageUser() {
  const [orders, setOrders] = React.useState([]);

  async function fetchData() {
    try {
      const response = await GetOrderOfAllUsers();
      setOrders(response);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  // I did here something like delegate
  async function handleTableChange(updatedOrders) {
    if (updatedOrders == null || updatedOrders === undefined) await fetchData();
    else 
      if (updatedOrders.length > 1) setOrders(updatedOrders);
      else setOrders(orders.concat(updatedOrders));
  }

  
  
  return (
    <>
     <Helmet>
        <title>FastTrack - Track Users Orders</title>
      </Helmet>
      <Card title="Orders from users">
        <UserOrderTable orders={orders} onChange={handleTableChange} />
      </Card>
    </>
  );
}


