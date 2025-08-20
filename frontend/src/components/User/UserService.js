import axios from "axios";

async function getYourProfile(token) {
  const res = await axios.get("http://localhost:5001/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export default {
  getYourProfile,
};
