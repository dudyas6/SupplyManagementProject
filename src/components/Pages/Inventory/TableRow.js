import React from "react";
import editImg from "../../../assets/icons/edit.png";

export default function TableRow({ index, item }) {
  const rowColor = index % 2 === 0 ? "bg-gray-200" : "bg-white";
  return (
    <tr className={rowColor}>
      <td className="flex items-center justify-center py-2 border">
        <img src={item.ItemImage} alt="product" className="w-10 h-10" />
      </td>
      <td className="py-2 border">{item.ItemName}</td>
      <td className="w-1/2 py-2 border">{item.Description}</td>
      <td className="py-2 text-center border">{item.Price}</td>
      <td className="py-2 text-center border">{item.CurrentQuantity}</td>
      <td className="py-2 text-center border">{item.MinimumQuantity}</td>
      <td className="flex items-center justify-center py-2 border">
        <button>
          <img className='w-10 h-10' src={editImg} alt="edit" />
        </button>
      </td>
    </tr>
  );
}
