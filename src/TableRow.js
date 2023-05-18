import React from "react";
import plusImg from "./assets/icons/plus.png";
import minusImg from "./assets/icons/minus.png";
import editImg from "./assets/icons/edit.png";

export default function TableRow({ index, item }) {
  const rowColor = index % 2 === 0 ? "bg-gray-200" : "bg-white";
  let url =
    "https://randomwordgenerator.com/img/picture-generator/53e3d4424d50ab14f1dc8460962e33791c3ad6e04e507440762e7ad39045c7_640.jpg";
  return (
    <tr className={rowColor}>
      <td className="border py-2 flex justify-center items-center">
        <img src={url} alt="product" className="w-10 h-10" />
      </td>
      <td className="border py-2">{item.name}</td>
      <td className="border w-1/2 py-2">{item.description}</td>
      <td className="border py-2 text-center">{item.price}</td>
      <td className="border py-2 text-center">{item.currentQuantity}</td>
      <td className="border py-2 text-center">{item.minimumQuantity}</td>
      <td className="border py-2 flex items-center justify-center">
        <button>
          <img className='w-10 h-10' src={editImg} alt="edit" />
        </button>
      </td>
    </tr>
  );
}
