import { useState, useEffect } from "react";
import ManufacturerService from "./ManufacturerService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function ManufacturerDetails() {
  const { manufacturerId } = useParams();
  const [manufacturer, setManufacturer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchManufacturer() {
      const manufacturerData =
        await ManufacturerService.getManufacturerById(manufacturerId);
      console.log(manufacturerData);
      setManufacturer(manufacturerData);
    }
    fetchManufacturer();
  }, []);

  return (
    <div className="flex flex-col h-screen justify-center">
      <p className="text-3xl uppercase text-center mb-5">
        {manufacturer?.companyName}
      </p>
      <p className="text-xl text-center mb-10">{manufacturer?.description}</p>

      <div className="flex flex-row justify-center items-center">
        <img className="h-fit w-1/4 mr-10" src={manufacturer?.imageUrl} />
        <div className="text-left">
          <div className="flex">
            <p className="text-xl uppercase font-bold mr-5">
              YEAR OF ESTABLISHMENT:
            </p>
            <p className="text-xl">
              {manufacturer && manufacturer?.yearEstablished}
            </p>
          </div>

          <div className="flex">
            <p className="text-xl uppercase font-bold mr-5">Firm address:</p>
            <p className="text-xl">{manufacturer?.companyAddress}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
