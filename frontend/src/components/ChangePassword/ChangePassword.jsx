import axios from "axios";
import { useForm } from "react-hook-form";
import { useUserContext } from "../../context/useContext";
import { useNavigate } from "react-router-dom";

export function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { token } = useUserContext();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const response = await axios.put(
        `http://localhost:5001/users/change-password/${data.userName}`,
      {
        password: data.password,
        newPassword: data.newPassword,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(response);
  };

  return (
    <div className="max-w-96 mx-auto">
      <p className="text-3xl uppercase text-center">Login</p>

      <form
        className="flex flex-col space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label className="text-2xl">Username</label>
          <input
            autoComplete={"on"}
            className="bg-slate-100 p-2"
            {...register("userName", { required: true })}
          />
          {errors.userName && (
            <span className="text-red-600">Username is required!</span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-2xl">Current password</label>
          <input
            type="password"
            className="bg-slate-100 p-2"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-600">Password is required!</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">New password</label>
          <input
            type="password"
            className="bg-slate-100 p-2"
            {...register("newPassword", { required: true })}
          />
          {errors.newPassword && (
            <span className="text-red-600">Password is required!</span>
          )}
        </div>

        <input
          className="bg-blue-500 p-2 font-medium text-white uppercase"
          type="submit"
          value="Change your password"
        />
      </form>
    </div>
  );
}
