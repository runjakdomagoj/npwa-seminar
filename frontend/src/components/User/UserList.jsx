import React, { useEffect, useState } from "react";
import UserService from "./UserService";
import { UserCard } from "./UserCard";
import { useNavigate } from "react-router-dom";

export function UserList() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      const usersData = await UserService.getAllUsers();
      setUsers(usersData);
      setFilteredUsers(usersData);
    }
    fetchUsers();
  }, []);

  function handleUpdate(userId) {
    navigate(`/users/${userId}/update`);
  }

  function handleDetails(userId) {
    navigate(`/users/${userId}`);
  }

  useEffect(() => {
    //console.log(selectedRole)
    if (selectedRole == "All") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter(
          (user) => user.role.toLowerCase() === selectedRole.toLowerCase()
        )
      );
    }
  }, [selectedRole, users]);

  return (
    <div className="flex-col max-h-screen overflow-hidden space-y-5">
      <p className="text-3xl uppercase text-center">User List</p>

      <div className="flex justify-center mb-4">
        <select
          className="px-4 py-2 border rounded-md"
          onChange={(e) => setSelectedRole(e.target.value)}
          value={selectedRole}
        >
          <option value="All">All</option>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      <div className="w-full max-h-[80vh] overflow-y-scroll">
        <div className="flex flex-wrap mx-auto w-[90vw] justify-center">
          {filteredUsers.map((user) => (
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
