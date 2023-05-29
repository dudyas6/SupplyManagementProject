import React from "react";
import { StatusEnum } from "../../../backend/DataFetching/VendorOrdersHandler";

export default function VendorOrderStatistics({ orders }) {
  const [totOrders, setOrders] = React.useState(0);
  const [totPending, setTotPending] = React.useState(0);
  const [totInProgress, setTotInProgress] = React.useState(0);
  const [totCompleted, setTotCompleted] = React.useState(0);

  React.useEffect(() => {
    let totalPending = 0;
    let totalInProgress = 0;
    let totalCompleted = 0;

    orders.forEach((order) => {
      if (order.Status ===  StatusEnum.COMPLETED) {
        totalCompleted += 1;
      } else if (order.Status === StatusEnum.INPROGRESS) {
        totalInProgress += 1;
      } else if (order.Status === StatusEnum.PENDING) {
        totalPending += 1;
      }
    });

    setOrders(orders.length);
    setTotPending(totalPending);
    setTotInProgress(totalInProgress);
    setTotCompleted(totalCompleted);
  }, [orders]);

  const percentageCompleted = (totCompleted / totOrders) * 100;
  const percentagePending = (totPending / totOrders) * 100;
  const percentageCancelled = (totInProgress / totOrders) * 100;

  return <ProgressBar first={percentageCompleted.toFixed(2)} />;
}

function ProgressBar({ first }) {
  /*

    <div className="w-full">
      <div className="w-full shadow bg-grey-light">
        <div className="py-1 text-xs leading-none text-center text-white bg-teal-500 w-52">
          {first}%
        </div>
      </div>
  */

      return (
    <div className="w-full">
      <div className="w-full mt-2 shadow bg-grey-light">
        <div
          className="py-1 text-lg leading-none text-center text-white bg-teal-500"
          style={{ width: `${first}%` }} >
          Completed orders: {first}%
        </div>
      </div>
    </div>
  );
}

