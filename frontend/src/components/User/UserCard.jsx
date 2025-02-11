import React from "react";
import { useUserContext } from "../../context/useContext";

export function UserCard({
  userName,
  email,
  userRole,
  onDetails,
  onUpdate,
}) {
  const { role } = useUserContext();
  return (
    <div className="w-96 max-w-96 min-w-96 p-5 mr-2 mb-2 space-y-5 rounded-lg bg-white shadow-md hover:cursor-pointer hover:bg-slate-200">
      <div className="flex-col">
        <div className="flex justify-between space-x-5">
          <p className="w-fit flex-auto uppercase text-md text-left text-ellipsis overflow-hidden text-nowrap">
            {userName}
          </p>
        </div>
        <p className="w-fit text-clip overflow-hidden text-sm text-nowrap flex-auto text-gray-400">
          {email}
        </p>
        <p className="w-fit text-clip overflow-hidden text-sm text-nowrap flex-auto text-gray-400">
          {userRole}
        </p>
      </div>
      <div className="flex flex-col space-y-2 mt-3">
        <button
          className="px-3 py-2 text-white font-medium bg-yellow-500 rounded-md"
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
          </>
        )}
      </div>
    </div>
  );
}
