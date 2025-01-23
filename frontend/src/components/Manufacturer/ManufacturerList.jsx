import { useEffect, useState } from "react";
import ManufacturerService from "./ManufacturerService";
import { useUserContext } from "../../context/useContext";
import { ManufacturerCard } from "./ManufacturerCard";
import { useNavigate } from "react-router-dom";

export function ManufacturerList() {
  const [manufacturers, setManufacturers] = useState([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState(null);
  const { token, role } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchManufacturers() {
      const manufacturersData = await ManufacturerService.getAllManufacturers();
      setManufacturers(manufacturersData);
      console.log(manufacturersData);
    }
    fetchManufacturers();
  }, []);

  async function handleDelete() {
    const deleteCount = await ManufacturerService.deleteManufacturerById(
      selectedManufacturer._id,
      token
    );
    console.log(deleteCount);
    const manufacturersData = await ManufacturerService.getAllManufacturers();
    setManufacturers(manufacturersData);
    console.log(manufacturersData);
  }

  function handleSelectManufacturer(manufacturer) {
    setSelectedManufacturer((prevSelectedManufacturer) =>
      prevSelectedManufacturer?._id === manufacturer._id ? null : manufacturer
    );
  }

  async function handleCreate() {
    navigate("/manufacturers/create");
  }

  async function handleUpdate() {
    navigate(`/manufacturers/${selectedManufacturer._id}/update`);
  }

  async function handleDetails() {
    navigate(`/manufacturers/${selectedManufacturer._id}`);
  }

  return (
    <div className="flex-col max-h-screen overflow-hidden space-y-5">
      <p className="text-3xl uppercase text-center">Manufacturer list</p>

      <div className="flex flex-row justify-center space-x-10 w-full">
        {role === "admin" && (
          <button
            className={`px-5 py-2 text-white font-medium rounded-md uppercase ${setSelectedManufacturer ? "bg-red-500" : "bg-red-300"}`}
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
        {role === "admin" && (
          <button
            className={`px-5 py-2 text-white font-medium rounded-md uppercase ${setSelectedManufacturer ? "bg-orange-500" : "bg-orange-300"}`}
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
          className={`px-5 py-2 text-white font-medium rounded-md uppercase ${setSelectedManufacturer ? "bg-yellow-500" : "bg-yellow-300"}`}
          onClick={handleDetails}
        >
          Details
        </button>
      </div>

      <div className="w-full max-h-[80vh] overflow-y-scroll">
        <div className="flex flex-wrap mx-auto w-[90vw] justify-center">
          {manufacturers.map((manufacturer) => (
            <ManufacturerCard
              key={manufacturer._id}
              onSelectManufacturer={() =>
                handleSelectManufacturer(manufacturer)
              }
              imageUrl={manufacturer.imageUrl}
              isSelected={selectedManufacturer?._id === manufacturer._id}
              companyName={manufacturer.companyName}
              companyAddress={manufacturer.companyAddress}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
