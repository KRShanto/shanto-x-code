import React from "react";

export default function Loading() {
  return (
    <div className="animate-pulse space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="bg-graident-dark h-10 w-56 rounded-md"></h1>
        <h1 className="bg-graident-dark h-10 w-48 rounded-md"></h1>
      </div>
      <div className="bg-graident-dark h-96 rounded-md border"></div>
    </div>
  );
}
