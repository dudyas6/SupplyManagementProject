import React from "react";
import editImg from "../../../assets/icons/edit.png";
import deleteImg from "../../../assets/icons/delete.png";

import { DeleteOrder } from "../../../backend/DataFetching/VendorOrdersHandler";
export default function VendorOrderRow({ order, onChange }) {
  const rowColor =
    order.Status === "Pending"
      ? " bg-yellow-200"
      : order.Status === "Completed"
      ? "bg-green-100"
      : "bg-orange-100";

  async function handleDeleteButtonClick() {
    await DeleteOrder(order.OrderId);
    if (onChange) onChange(null);
  }

  return (
    <tr className={rowColor}>
      <td className="w-1/12 py-2 border">{order.OrderId}</td>
      <td className="w-1/4 py-2 border">{order.ItemName}</td>
      <td className="py-2 text-center border">{order.PurchaseDate}</td>
      <td className="py-2 text-center border">{order.Quantity}</td>
      <td className="py-2 text-center border">{order.Status}</td>
      <td className="py-2 text-center border">{order.TotalPrice}</td>
      {onChange && (
        <td className="flex items-center justify-center py-2 border">
          <button onClick={handleDeleteButtonClick}>
            <img className="w-10 h-10" src={deleteImg} alt="delete" />
          </button>
        </td>
      )}
    </tr>
  );
}
