import axios from "axios";
import { useForm } from "react-hook-form";
import { useUserContext } from "../../context/useContext";

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setUserSession } = useUserContext();
  const onSubmit = async (data) => {
    const response = await axios.post("http://localhost:5001/users/login", {
      userName: data.userName,
      password: data.password,
    });
    console.log(response);
    setUserSession(response.data);
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
            className="bg-slate-200 p-2"
            {...register("userName", { required: true })}
          />
          {errors.userName && (
            <span className="text-red-600">Username is required!</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">Password</label>
          <input
            type="password"
            className="bg-slate-200 p-2"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-600">Password is required!</span>
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
