import { useEffect, useState } from "react";
import { useUserContext } from "../../context/useContext";
import UserService from "./UserService";

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const { token, role } = useUserContext();

  useEffect(() => {
    UserService.getAllUsers()
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  const deleteUser = async (id) => {
    try {
      await UserService.deleteUserById(id, token);
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Users</h2>
      <ul>
        {users.map(user => (
          <li
            key={user._id}
            className="flex justify-between items-center border-b py-2"
          >
            <span>{user.userName} ({user.role})</span>
            {role === "admin" && (
              <button
                onClick={() => deleteUser(user._id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
