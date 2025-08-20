import axios from "axios";

async function getAllAdmins() {
  const res = await axios.get("http://localhost:5001/users/admin-users");
  return res.data;
}

export default {
  getAllAdmins,
};
