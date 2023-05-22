import React from "react";

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
