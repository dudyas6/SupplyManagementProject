import React from "react";

export default function VendorOrderStatistics() {
  return <ProgressBar />;
}

function ProgressBar() {
  return (
    <div className="w-full">
      <div className="w-full shadow bg-grey-light">
        <div className="py-1 text-xs leading-none text-center text-white bg-blue-500 w-52">
          45%
        </div>
      </div>

      <div className="w-full mt-2 shadow bg-grey-light">
        <div className="py-1 text-xs leading-none text-center text-white bg-teal-500 w-52">
          Completed orders 52%
        </div>
      </div>
    </div>
  );
}
