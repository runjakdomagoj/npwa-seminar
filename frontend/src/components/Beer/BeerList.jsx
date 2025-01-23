import { useEffect, useState } from "react";
import { BeerCard } from "./BeerCard";
import BeerService from "./BeerService";
import { useUserContext } from "../../context/useContext";
import { useNavigate } from "react-router-dom";

export function BeerList() {
  const [beers, setBeers] = useState([]);
  const [selectedBeer, setSelectedBeer] = useState(null);
  const { token, role } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBeers() {
      let beersData = await BeerService.getAllBeers();
      beersData = beersData.sort((a, b) =>
        a.manufacturer.companyName > b.manufacturer.companyName
          ? 1
          : b.manufacturer.companyName > a.manufacturer.companyName
            ? -1
            : 0
      );

      setBeers(beersData);
    }
    fetchBeers();
  }, []);

  async function handleDelete() {
    const deleteCount = await BeerService.deleteBeerById(
      selectedBeer._id,
      token
    );
    console.log(deleteCount);
    const beersData = await BeerService.getAllBeers();
    setBeers(beersData);
    console.log(beersData);
  }

  async function handleCreate() {
    navigate("/beers/create");
  }

  async function handleUpdate() {
    navigate(`/beers/${selectedBeer._id}/update`);
  }

  async function handleDetails() {
    navigate(`/beers/${selectedBeer._id}`);
  }

  function handleSelectBeer(beer) {
    setSelectedBeer((prevSelectedBeer) =>
      prevSelectedBeer?._id === beer._id ? null : beer
    );
  }

  return (
    <div className="flex-col max-h-screen overflow-hidden space-y-5">
      <p className="text-3xl uppercase text-center">Beer list</p>

      <div className="flex flex-row justify-center space-x-10 w-full">
        {role === "admin" && (
          <button
            className={`px-5 py-2 text-white font-medium rounded-md uppercase ${selectedBeer ? "bg-red-500" : "bg-red-300"}`}
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
        {role === "admin" && (
          <button
            className={`px-5 py-2 text-white font-medium rounded-md uppercase ${selectedBeer ? "bg-orange-500" : "bg-orange-300"}`}
            onClick={handleUpdate}
          >
            Update
          </button>
        )}
        {role === "admin" && (
          <button
            className="px-5 py-2 text-white font-medium bg-blue-500 rounded-md uppercase"
            onClick={handleCreate}
          >
            Create
          </button>
        )}
        <button
          className={`px-5 py-2 text-white font-medium rounded-md uppercase ${selectedBeer ? "bg-yellow-500" : "bg-yellow-300"}`}
          onClick={handleDetails}
        >
          Details
        </button>
      </div>

      <div className="w-full max-h-[80vh] overflow-y-scroll">
        <div className="flex flex-wrap mx-auto w-[90vw] justify-center">
          {beers.map((item, index) => (
            <BeerCard
              key={item._id}
              onSelectBeer={() => handleSelectBeer(item)}
              isSelected={selectedBeer?._id === item._id}
              id={item.id}
              name={item.name}
              price={item.price}
              imageUrl={item.imageUrl}
              manufacturerName={item.manufacturer.companyName}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
