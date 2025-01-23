import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../context/useContext";
import { useNavigate } from "react-router-dom";
import ManufacturerService from "./ManufacturerService";

export function ManufacturerForm() {
  const { manufacturerId } = useParams();
  const { token } = useUserContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: async () => await fetchManufacturer() });
  const onSubmit = async (data) => {
    console.log(data);
    if (manufacturerId) {
      const createdManufacturer =
        await ManufacturerService.updateManufacturerById(
          manufacturerId,
          {
            companyName: data.companyName,
            companyAddress: data.companyAddress,
            yearEstablished: data.yearEstablished,
            description: data.description,
            price: data.price,
            imageUrl: data.imageUrl,
          },
          token
        );
      console.log(createdManufacturer);
      navigate(`/manufacturers/${manufacturerId}`);
    } else {
      const createdManufacturer = await ManufacturerService.createManufacturer(
        {
          companyName: data.companyName,
          companyAddress: data.companyAddress,
          yearEstablished: data.yearEstablished,
          description: data.description,
          price: data.price,
          imageUrl: data.imageUrl,
        },
        token
      );
      console.log(createdManufacturer);
      navigate(`/manufacturers/${createdManufacturer._id}`);
    }
  };

  async function fetchManufacturer() {
    if (!manufacturerId) {
      return {};
    }
    const manufacturer =
      await ManufacturerService.getManufacturerById(manufacturerId);
    console.log(manufacturer);
    return manufacturer;
  }

  return (
    <div className="max-w-96 mx-auto">
      <p className="text-3xl uppercase text-center">Manufacturer form</p>

      <form
        className="flex flex-col space-y-5 max-h-[90vh] overflow-y-scroll"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label className="text-2xl">Company name</label>
          <input
            className="bg-slate-200 p-2"
            {...register("companyName", { required: true })}
          />
          {errors.companyName && (
            <span className="text-red-600">Company name is required!</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">Company address</label>
          <input
            className="bg-slate-200 p-2"
            {...register("companyAddress", { required: true })}
          />
          {errors.companyAddress && (
            <span className="text-red-600">Company address is required!</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">Year established</label>
          <input
            className="bg-slate-200 p-2"
            {...register("yearEstablished", { required: true })}
          />
          {errors.yearEstablished && (
            <span className="text-red-600">Year established is required!</span>
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
          <label className="text-2xl">Image url</label>
          <input
            className="bg-slate-200 p-2"
            {...register("imageUrl", { required: true })}
          />
          {errors.imageUrl && (
            <span className="text-red-600">Image url are required!</span>
          )}
        </div>

        <input
          className="bg-blue-500 p-2 font-medium text-white upercase"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
}
