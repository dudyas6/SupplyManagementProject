import React from "react";
import editImg from "./assets/icons/edit.png";

export default function TableRow({ index, item }) {
  const rowColor = index % 2 === 0 ? "bg-gray-200" : "bg-white";
  return (
    <tr className={rowColor}>
      <td className="border py-2 flex justify-center items-center">
        <img src={item.ItemImage} alt="product" className="w-10 h-10" />
      </td>
      <td className="border py-2">{item.ItemName}</td>
      <td className="border w-1/2 py-2">{item.Description}</td>
      <td className="border py-2 text-center">{item.Price}</td>
      <td className="border py-2 text-center">{item.CurrentQuantity}</td>
      <td className="border py-2 text-center">{item.MinimumQuantity}</td>
      <td className="border py-2 flex items-center justify-center">
        <button>
          <img className='w-10 h-10' src={editImg} alt="edit" />
        </button>
      </td>
    </tr>
  );
}
