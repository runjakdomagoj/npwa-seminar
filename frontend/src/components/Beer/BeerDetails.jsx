import { useState, useEffect } from "react";
import BeerService from "./BeerService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function BeerDetails() {
  const { beerId } = useParams();
  const [beer, setBeer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBeer() {
      const beerData = await BeerService.getBeerById(beerId);
      console.log(beerData);
      setBeer(beerData);
    }
    fetchBeer();
  }, []);

  return (
    <div className="flex flex-col h-screen justify-center">
      <p className="text-3xl uppercase text-center mb-5">{beer?.name}</p>
      <p className="text-xl text-center mb-10">{beer?.description}</p>

      <div className="flex flex-row justify-center items-center">
        <img className="h-fit w-1/4 mr-10" src={beer?.imageUrl} />
        <div className="text-left">
          <div className="flex">
            <p className="text-xl uppercase font-bold mr-5">Price:</p>
            <p className="text-xl">{beer?.price}€</p>
          </div>

          <div className="flex">
            <p className="text-xl uppercase font-bold mr-5">
              Alcohol percentage:
            </p>
            <p className="text-xl">{beer?.alcoholPercentage}%</p>
          </div>

          <p className="text-xl uppercase font-bold">Ingredients:</p>
          <div className="flex flex-row justify-center mb-5">
            {beer?.ingredients.map((item) => (
              <p key={beer._id + item} className="text-xl text-center mr-2">
                {item},
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
