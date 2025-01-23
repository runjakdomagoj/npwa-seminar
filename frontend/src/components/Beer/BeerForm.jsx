import { useForm } from "react-hook-form";
import BeerService from "./BeerService";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../context/useContext";
import { useNavigate } from "react-router-dom";

export function BeerForm() {
  const { beerId } = useParams();
  const { token } = useUserContext();
  const [manufacturers, setManufacturers] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: async () => await fetchBeer() });
  const onSubmit = async (data) => {
    if (beerId) {
      const updatedBeer = await BeerService.updateBeerById(
        beerId,
        {
          name: data.name,
          description: data.description,
          price: data.price,
          alcoholPercentage: data.alcoholPercentage,
          imageUrl: data.imageUrl,
          manufacturer: data.manufacturer,
          //ingredients: data.ingredients.split(","),
        },
        token
      );
      console.log(updatedBeer);
      navigate(`/beers/${beerId}`);
    } else {
      const createdBeer = await BeerService.createBeer(
        {
          name: data.name,
          description: data.description,
          price: data.price,
          alcoholPercentage: data.alcoholPercentage,
          imageUrl: data.imageUrl,
          manufacturer: data.manufacturer,
          //ingredients: data.ingredients.split(","),
        },
        token
      );
      console.log(createdBeer);
      navigate(`/beers/${createdBeer._id}`);
    }
  };

  async function fetchBeer() {
    if (!beerId) {
      return {};
    }
    const beer = await BeerService.getBeerById(beerId);
    beer.ingredients = beer.ingredients.join(",");
    return beer;
  }

  useEffect(() => {
    async function fetchManufacturers() {
      const manufacturers = await axios.get(
        "http://localhost:5001/manufacturers"
      );
      console.log(manufacturers.data);
      setManufacturers(manufacturers.data);
    }
    fetchManufacturers();
  }, []);

  return (
    <div className="max-w-96 mx-auto">
      <p className="text-3xl uppercase text-center">Beer form</p>

      <form
        className="flex flex-col space-y-5 max-h-[90vh] overflow-y-scroll"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label className="text-2xl">Name</label>
          <input
            className="bg-slate-200 p-2"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-red-600">Name is required!</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">Description</label>
          <textarea
            className="bg-slate-200 p-2"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <span className="text-red-600">Description is required!</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">Price</label>
          <input
            type="number"
            className="bg-slate-200 p-2"
            {...register("price", { required: true })}
          />
          {errors.price && (
            <span className="text-red-600">Price is required!</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">Alcohol percentage</label>
          <input
            type="number"
            className="bg-slate-200 p-2"
            {...register("alcoholPercentage", { required: true })}
          />
          {errors.alcoholPercentage && (
            <span className="text-red-600">
              Alcohol percentage is required!
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">Ingredients (comma seperated)</label>
          <textarea
            className="bg-slate-200 p-2"
            {...register("ingredients", { required: true })}
          />
          {errors.ingredients && (
            <span className="text-red-600">Ingredients are required!</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">Image url</label>
          <input
            className="bg-slate-200 p-2"
            {...register("imageUrl", { required: true })}
          />
          {errors.imageUrl && (
            <span className="text-red-600">Image url are required!</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">Manufacturer</label>

          <select {...register("manufacturer", { required: true })}>
            {manufacturers.map((item) => (
              <option key={item._id} value={item._id}>
                {item.companyName}
              </option>
            ))}
          </select>

          {errors.manufacturer && (
            <span className="text-red-600">Manufacturer is required!</span>
          )}
        </div>

        <input
          className="bg-blue-500 p-2 font-medium text-white upercase"
          type="submit"
        />
      </form>
    </div>
  );
}
