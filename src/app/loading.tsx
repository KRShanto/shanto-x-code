import React from "react";

export default function Loading() {
  return (
    <div className="grid w-full grid-cols-1 gap-5 p-5 md:grid-cols-3 xl:p-0">
      {[1, 2, 3, 4, 5]?.map((_, index) => {
        return (
          <div
            className="dark:bg-graident-dark w-full cursor-pointer space-y-5 rounded-md border p-5 ring-green-500 transition-all hover:ring-2 first:md:col-span-3 first:lg:col-span-2"
            key={index}
          >
            <div className="relative h-72 w-full sm:w-full md:h-64 xl:h-96"></div>
            <div className="space-y-2">
              <p className="h-5 bg-gray-500 text-sm dark:text-gray-400"></p>
              <p className="h-10 bg-gray-500 text-sm dark:text-gray-400"></p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
