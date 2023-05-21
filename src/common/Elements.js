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
