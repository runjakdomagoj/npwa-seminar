import axios from "axios";

const API_URL = "http://localhost:5001/users";

async function getAllUsers() {
  const res = await axios.get(API_URL);
  return res.data;
}

async function deleteUserById(id, token) {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export default {
  getAllUsers,
  deleteUserById,
};
