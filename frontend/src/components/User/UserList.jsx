import React, { useEffect, useState } from "react";
import { UserCard } from "./UserCard";
import UserService from "./UserService";

export function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const beersData = await UserService.getAllAdmins();
      setUsers(beersData);
    }
    fetchUsers();
  }, []);

  return (
    <div className="flex-col max-h-screen overflow-hidden space-y-5">
      <p className="text-3xl uppercase text-center">Admins list</p>

      <div className="w-full max-h-[80vh] overflow-y-scroll">
        <div className="flex flex-wrap mx-auto w-[90vw] justify-center">
          {users.map((user) => (
            <UserCard
              key={user._id}
              id={user._id}
              userName={user.userName}
              email={user.email}
              userRole={user.role}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
