import React from "react";

export default function VendorOrderStatistics({ orders }) {
  const [totOrders, setOrders] = React.useState(0);
  const [totCompleted, setCompleted] = React.useState(0);
  

  React.useEffect(() => {
    let  totalCompleted = 0;
    Object.keys(orders).forEach((orderKey) => {
      const order = orders[orderKey];
      if (order.Status === "Completed") {
        totalCompleted += 1;
      }
    });
    setCompleted(totalCompleted);
    setOrders(orders.length);
  }, [orders]);
  let precantage = (totCompleted / totOrders) * 100;
  return <ProgressBar first={precantage} />;
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
          className="py-1 text-xs leading-none text-center text-white bg-teal-500"
          style={{ width: `${first}%` }} >
          Completed orders: {first}%
        </div>
      </div>
    </div>
  );
}
