import axios from "axios";
async function getAllUsers() {
  const res = await axios.get("http://localhost:5001/users/non-admins");
  return res.data;
}

export default {
  getAllUsers,
};
