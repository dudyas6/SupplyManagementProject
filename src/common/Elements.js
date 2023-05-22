import React from "react";

export function Card({ title, children }) {
  return (
    <div class="max-w-fitxl rounded overflow-hidden shadow-lg mt-8">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{title}</div>
        <p class="text-gray-700 text-base">{children}</p>
      </div>
    </div>
  );
}

var i = 0
const colors = ["bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-red-500"]
const bg_colors = ["bg-blue-600", "bg-green-600", "bg-yellow-600", "bg-red-600"]
export function Cube({big, small}){
  return (
    <div className={`w-40 h-40 m-4 ${colors[(i)%4]} rounded-md shadow-md hover:${bg_colors[(i++)%(colors.length)]}`}>
        <div className="flex flex-col items-center justify-center h-full">
          <span className="text-3xl font-bold text-white">{big}</span>
          <span className="text-base text-gray-200">{small}</span>
        </div>
      </div>
  )
}