import React, { useEffect, useState } from "react";
import ManufacturerService from "./ManufacturerService";
import { useUserContext } from "../../context/useContext";
import { ManufacturerCard } from "./ManufacturerCard";
import { useNavigate } from "react-router-dom";

export function ManufacturerList() {
  const [manufacturers, setManufacturers] = useState([]);
  const { token, role } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchManufacturers() {
      const manufacturersData = await ManufacturerService.getAllManufacturers();
      setManufacturers(manufacturersData);
    }
    fetchManufacturers();
  }, []);

  async function handleDelete(manufacturerId) {
    await ManufacturerService.deleteManufacturerById(manufacturerId, token);
    const updatedManufacturers =
      await ManufacturerService.getAllManufacturers();
    setManufacturers(updatedManufacturers);
  }

  function handleCreate() {
    navigate("/manufacturers/create");
  }

  function handleUpdate(manufacturerId) {
    navigate(`/manufacturers/${manufacturerId}/update`);
  }

  function handleDetails(manufacturerId) {
    navigate(`/manufacturers/${manufacturerId}`);
  }

  return (
    <div className="flex-col max-h-screen overflow-hidden space-y-5">
      <p className="text-3xl uppercase text-center">Manufacturer List</p>

      {role === "admin" && (
        <div className="flex justify-center mb-4">
          <button
            className="px-5 py-2 text-white font-medium bg-blue-500 rounded-md uppercase"
            onClick={handleCreate}
          >
            Create New Manufacturer
          </button>
        </div>
      )}

      <div className="w-full max-h-[80vh] overflow-y-scroll">
        <div className="flex flex-wrap mx-auto w-[90vw] justify-center">
          {manufacturers.map((manufacturer) => (
            <ManufacturerCard
              key={manufacturer._id}
              id={manufacturer._id}
              companyName={manufacturer.companyName}
              companyAddress={manufacturer.companyAddress}
              imageUrl={manufacturer.imageUrl}
              role={role}
              onDetails={() => handleDetails(manufacturer._id)}
              onUpdate={() => handleUpdate(manufacturer._id)}
              onDelete={() => handleDelete(manufacturer._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
