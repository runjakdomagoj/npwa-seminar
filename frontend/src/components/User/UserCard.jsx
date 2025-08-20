import React from "react";

export function UserCard({ id, userName, email, userRole }) {
  return (
    <div className="w-64 max-w-64 min-w-64 p-5 mr-2 mb-2 space-y-5 rounded-lg hover:cursor-pointer hover:bg-slate-200 bg-white shadow-md">
      <div className="flex-col">
        <div className="flex justify-between space-x-5">
          <p className="w-fit flex-auto uppercase text-md text-left text-ellipsis overflow-hidden text-nowrap">
            {userName}
          </p>
          <p className="w-fit flex-auto text-md text-right text-nowrap">
            {email}
          </p>
        </div>
        <p className="w-fit text-clip overflow-hidden text-sm text-nowrap flex-auto text-gray-400">
          {userRole}
        </p>
      </div>
    </div>
  );
}
