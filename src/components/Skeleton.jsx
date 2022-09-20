import React from "react";

export default function Skeleton() {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2">
      {Array.from({ length: 4 }).map(() => {
        return (
          <li className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow p-10">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-6 py-1">
                <div className="h-60 bg-gray-200 rounded"></div>
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-gray-200 rounded col-span-1 col-start-2"></div>
                    <div className="h-2 bg-gray-200 rounded col-span-1 col-start-2"></div>
                    <div className="h-2 bg-gray-200 rounded col-span-1 col-start-2"></div>
                  </div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
