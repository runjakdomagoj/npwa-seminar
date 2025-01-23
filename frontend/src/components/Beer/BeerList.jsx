import React, { useEffect, useState } from "react";
import { BeerCard } from "./BeerCard";
import BeerService from "./BeerService";
import { useUserContext } from "../../context/useContext";
import { useNavigate } from "react-router-dom";

export function BeerList() {
  const [beers, setBeers] = useState([]);
  const { token, role } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBeers() {
      const beersData = await BeerService.getAllBeers();
      setBeers(
        beersData.sort((a, b) =>
          a.manufacturer.companyName.localeCompare(b.manufacturer.companyName)
        )
      );
    }
    fetchBeers();
  }, []);

  async function handleDelete(beerId) {
    await BeerService.deleteBeerById(beerId, token);
    const updatedBeers = await BeerService.getAllBeers();
    setBeers(updatedBeers);
  }

  function handleCreate() {
    navigate("/beers/create");
  }

  function handleUpdate(beerId) {
    navigate(`/beers/${beerId}/update`);
  }

  function handleDetails(beerId) {
    navigate(`/beers/${beerId}`);
  }

  return (
    <div className="flex-col max-h-screen overflow-hidden space-y-5">
      <p className="text-3xl uppercase text-center">Beer list</p>

      {role === "admin" && (
        <div className="flex justify-center mb-4">
          <button
            className="px-5 py-2 text-white font-medium bg-blue-500 rounded-md uppercase"
            onClick={handleCreate}
          >
            Create New Beer
          </button>
        </div>
      )}

      <div className="w-full max-h-[80vh] overflow-y-scroll">
        <div className="flex flex-wrap mx-auto w-[90vw] justify-center">
          {beers.map((beer) => (
            <BeerCard
              key={beer._id}
              id={beer._id}
              name={beer.name}
              price={beer.price}
              imageUrl={beer.imageUrl}
              manufacturerName={beer.manufacturer.companyName}
              role={role}
              onDetails={() => handleDetails(beer._id)}
              onUpdate={() => handleUpdate(beer._id)}
              onDelete={() => handleDelete(beer._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
