import React from "react";

export default function TableRow({ index, item }) {
  const rowColor = index % 2 === 0 ? "bg-gray-200" : "bg-white";
  return (
    <tr className={rowColor}>
      <td className="border px-4 py-2">{item.name}</td>
      <td className="border px-4 py-2">{item.description}</td>
      <td className="border px-4 py-2">{item.price}</td>
      <td className="border px-4 py-2">{item.currentQuantity}</td>
      <td className="border px-4 py-2">{item.minimumQuantity}</td>
      <td className="border px-4 py-2      items-center justify-center">
        <a href='# ' className="bg-teal-300 cursor-pointer rounded p-1 mx-1 text-white">
          <i class="fas fa-eye"></i>
        </a>
        <a href='# ' class="bg-teal-300 cursor-pointer rounded p-1 mx-1 text-white">
          <i class="fas fa-edit"></i>
        </a>
        <a href='# ' class="bg-teal-300 cursor-pointer rounded p-1 mx-1 text-red-500">
          <i class="fas fa-trash"></i>
        </a>
      </td>
    </tr>
  );
}
