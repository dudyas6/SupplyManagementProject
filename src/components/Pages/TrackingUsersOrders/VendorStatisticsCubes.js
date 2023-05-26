import React from "react";
import { Cube } from "../../../common/Elements";

// get data from server

// analyze data

// generate cubes
export const VendorStatisticsCubes = ({ orders }) => {
    const [totOrders, setOrders] = React.useState(0);
    const [totCost, setCost] = React.useState(0.0);
    const [totQuantity, setQuantity] = React.useState(0);
    const [totPending, setPending] = React.useState(0);
  
    React.useEffect(() => {
      let totalOrders = 0;
      let totalCost = 0.0;
      let totalQuantity = 0;
      let totalPending = 0;
  
      Object.keys(orders).forEach((orderKey) => {
        const order = orders[orderKey];
        totalOrders += 1;
        totalCost += order.TotalPrice;
        totalQuantity += order.Quantity;
        if (order.Status === "Pending") {
          totalPending += 1;
        }
      });
      
      setOrders(totalOrders);
      setCost(totalCost);
      setQuantity(totalQuantity);
      setPending(totalPending);
    }, [orders]);
    var i = 0
    return (
       
      <div className="flex flex-wrap justify-center">
        <Cube inx={i++} big={totOrders} small="Orders" />
        <Cube inx={i++}  big={`${parseFloat(totCost).toFixed(2)}$`} small="Total Cost" />
        <Cube inx={i++} big={totQuantity} small="Purchased quantity" />
        <Cube inx={i++} big={totPending} small="Pending Orders" />
      </div>
    );
  };