import React, { useRef } from "react";

export function Card({ title, children }) {
  return (
    <div className="max-w-fitxl rounded overflow-hidden shadow-lg mt-8">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <div className="text-gray-700 text-base">{children}</div>
      </div>
    </div>
  );
}

const colors = ["bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-red-500"];
const bgColors = ["bg-blue-600", "bg-green-600", "bg-yellow-600", "bg-red-600"];
let i = 0;

export function Cube({ inx, big, small }) {
  const colorIndex = inx % colors.length;
  const bgColorIndex = inx % bgColors.length;

  return (
    <div
      className={`w-40 h-40 m-4 ${colors[colorIndex]} rounded-md shadow-md hover:${bgColors[bgColorIndex]}`}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <span className="text-3xl font-bold text-white">{big}</span>
        <span className="text-base text-gray-200">{small}</span>
      </div>
    </div>
  );
}
