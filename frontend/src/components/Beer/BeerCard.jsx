import React from "react";

export function BeerCard({
  id,
  name,
  price,
  manufacturerName,
  imageUrl,
  onDetails,
  onUpdate,
  onDelete,
  role,
}) {
  return (
    <div className="w-64 max-w-64 min-w-64 p-5 mr-2 mb-2 space-y-5 rounded-lg hover:cursor-pointer hover:bg-slate-200 bg-white shadow-md">
      <img className="w-full block" src={imageUrl} alt="Beer image" />
      <div className="flex-col">
        <div className="flex justify-between space-x-5">
          <p className="w-fit flex-auto uppercase text-md text-left text-ellipsis overflow-hidden text-nowrap">
            {name}
          </p>
          <p className="w-fit flex-auto text-md text-right text-nowrap">
            {price}€
          </p>
        </div>
        <p className="w-fit text-clip overflow-hidden text-sm text-nowrap flex-auto text-gray-400">
          {manufacturerName}
        </p>
      </div>
      <div className="flex flex-col space-y-2 mt-3">
        <button
          className="px-3 py-2 text-white font-medium bg-yellow-300 rounded-md"
          onClick={onDetails}
        >
          Details
        </button>
        {role === "admin" && (
          <>
            <button
              className="px-3 py-2 text-white font-medium bg-orange-500 rounded-md"
              onClick={onUpdate}
            >
              Update
            </button>
            <button
              className="px-3 py-2 text-white font-medium bg-red-500 rounded-md"
              onClick={onDelete}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
