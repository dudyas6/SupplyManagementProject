import React from "react";
import { Cube, WideCubeWithClick } from "../../../common/Elements";
import { GetCompletedAndNotAddedOrders, AddCompletedOrdersToWarehouse } from "../../../backend/DataFetching/VendorOrdersHandler";
// generate cubes
export const VendorStatisticsCubes = ({ orders, onChange }) => {
  const [totOrders, setOrders] = React.useState(0);
  const [totCost, setCost] = React.useState(0.0);
  const [totQuantity, setQuantity] = React.useState(0);
  const [totPending, setPending] = React.useState(0);
  const [completedOrdersNotAdded, setCompletedOrdersNotAdded] = React.useState(
    []
  );

  async function WaitToGetFilteredOrders() {
    setCompletedOrdersNotAdded(await GetCompletedAndNotAddedOrders());
  }
  React.useEffect(() => {
    WaitToGetFilteredOrders();

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

  async function onChangePipe(){
    await AddCompletedOrdersToWarehouse();
    onChange(null);
  }

  var i = 0;
  return (
    <>
      <div className="flex flex-wrap justify-center">
        <Cube inx={i++} big={totOrders} small="Orders" />
        <Cube
          inx={i++}
          big={`${parseFloat(totCost).toFixed(2)}$`}
          small="Total Cost"
        />
        <Cube inx={i++} big={totQuantity} small="Purchased Quantity" />
        <Cube inx={i++} big={totPending} small="Pending Orders" />
      </div>
      <div className="flex flex-wrap justify-center ">
        {completedOrdersNotAdded.length !== 0 && (
          <WideCubeWithClick
            inx={i++}
            big={completedOrdersNotAdded.length}
            small="Pending warehouse addition for completed orders"
            additionText="Click to update"
            onClick={onChangePipe}
          />
        )}
      </div>
    </>
  );
};
