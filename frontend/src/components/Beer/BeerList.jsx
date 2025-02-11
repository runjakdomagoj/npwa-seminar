import React, { useEffect, useState } from "react";
import { BeerCard } from "./BeerCard";
import BeerService from "./BeerService";
import { useUserContext } from "../../context/useContext";
import { useNavigate } from "react-router-dom";
import ManufacturerService from "../Manufacturer/ManufacturerService"

export function BeerList() {
  const [beers, setBeers] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [filteredBeers, setFilteredBeers] = useState([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState(null);
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
      setFilteredBeers(beersData)
    }
    async function fetchManufacturers() {
      let manufacturersData = await ManufacturerService.getAllManufacturers();
      setManufacturers(manufacturersData);
    }
    fetchBeers();
    fetchManufacturers()
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

  useEffect(() => {
    console.log(selectedManufacturer);
    if (selectedManufacturer == "") {
      setFilteredBeers(beers);
    } else {
      const filteredBeers = beers.filter(
        (beers) =>
          beers.manufacturer.companyName == selectedManufacturer,
      );
      setFilteredBeers(filteredBeers);
    }
  }, [selectedManufacturer]);

  return (
    <div className="flex-col max-h-screen overflow-hidden space-y-5">
      <p className="text-3xl uppercase text-center">Beer list</p>

      <select onChange={(e) => setSelectedManufacturer(e.target.value)}>
        <option value=""></option>
        {manufacturers.map((manufacturer) => (
          <option value={manufacturer.companyName} key={manufacturer._id}>
            {manufacturer.companyName}
          </option>
        ))}
      </select>

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
          {filteredBeers.map((beer) => (
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
