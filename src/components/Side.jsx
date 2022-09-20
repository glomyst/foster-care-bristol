import { XCircleIcon } from "@heroicons/react/20/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PieChart, Pie } from "recharts";

export default function Side({ favourites, handleFavourite, chartData }) {
  return (
    <div>
      <h2 className="mb-5 font-bold">Favourites</h2>

      {favourites.length > 0 && (
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <PieChart width={400} height={400}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      <ul className="grid grid-cols-1 gap-4">
        {favourites.map((favourite, i) => (
          <li
            key={i}
            className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
          >
            <div className="flex w-full items-center justify-between space-x-6 p-4">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text-sm font-medium text-gray-900">
                    {favourite?.ward_name}
                  </h3>
                  <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                    {favourite?.foster_care_placements_number_of_children}{" "}
                    Children
                  </span>
                </div>
                <p className="mt-1 truncate text-sm text-gray-500 text-left">
                  {favourite?.period}
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center rounded-full border border-transparent bg-red-200 p-0 text-red-500 shadow-sm hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                onClick={() => handleFavourite(favourite)}
              >
                <XCircleIcon className="h-8 w-8" aria-hidden="true" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {favourites.length === 0 && (
        <div className="grid justify-items-stretch p-5 border-dashed border-4 rounded-lg">
          <HeartIcon className="h-10 w-10 justify-self-center text-gray-300" />{" "}
          <div className="justify-self-center text-sm text-gray-300">
            Nothing in Favourites
          </div>
        </div>
      )}
    </div>
  );
}
