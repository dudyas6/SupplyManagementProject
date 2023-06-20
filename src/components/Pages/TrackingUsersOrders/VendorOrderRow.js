import React from "react";
import editImg from "../../../assets/icons/edit.png";

export default function VendorOrderRow({ order }) {
  const rowColor =
    order.Status === "Pending"
      ? " bg-yellow-200"
      : order.Status === "Completed"
      ? "bg-green-100"
      : "bg-orange-100";

  return (
    <tr className={rowColor}>
      <td className="w-1/12 py-2 border">{order.OrderId}</td>
      <td className="w-1/4 py-2 border">{order.ItemName}</td>
      <td className="py-2 text-center border">{order.PurchaseDate}</td>
      <td className="py-2 text-center border">{order.Quantity}</td>
      <td className="py-2 text-center border">{order.Status}</td>
      <td className="py-2 text-center border">{order.TotalPrice}</td>
    </tr>
  );
}
