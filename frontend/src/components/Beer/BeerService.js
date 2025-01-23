import axios from "axios";

async function getAllBeers() {
  const res = await axios.get("http://localhost:5001/beers");
  return res.data;
}

async function createBeer(beerData, token) {
  const res = await axios.post(`http://localhost:5001/beers`, beerData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

async function updateBeerById(beerId, beerData, token) {
  const res = await axios.put(
    `http://localhost:5001/beers/${beerId}`,
    beerData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
}

async function getBeerById(beerId) {
  const res = await axios.get(`http://localhost:5001/beers/${beerId}`);
  return res.data;
}

async function deleteBeerById(beerId, token) {
  const res = await axios.delete(`http://localhost:5001/beers/${beerId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export default {
  getAllBeers,
  getBeerById,
  deleteBeerById,
  createBeer,
  updateBeerById,
};
