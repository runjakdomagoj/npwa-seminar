import React, { useEffect, useState } from "react";
import UserService from "./UserService";
import { UserCard } from "./UserCard";
import { useNavigate } from "react-router-dom";

export function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      const usersData = await UserService.getAllUsers();
      setUsers(usersData);
    }
    fetchUsers();
  }, []);

  function handleUpdate(userId) {
    navigate(`/users/${userId}/update`);
  }

  function handleDetails(userId) {
    navigate(`/users/${userId}`);
  }

  return (
    <div className="flex-col max-h-screen overflow-hidden space-y-5">
      <p className="text-3xl uppercase text-center">User List</p>

      <div className="w-full max-h-[80vh] overflow-y-scroll">
        <div className="flex flex-wrap mx-auto w-[90vw] justify-center">
          {users.map((user) => (
            <UserCard
              key={user._id}
              id={user._id}
              userName={user.userName}
              email={user.email}
              userRole={user.role}
              onDetails={() => handleDetails(user._id)}
              onUpdate={() => handleUpdate(user._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
