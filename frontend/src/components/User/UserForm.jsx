import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../context/useContext";
import { useNavigate } from "react-router-dom";
import UserService from "./UserService";

export function UserForm() {
  const { userId } = useParams();
  const { token } = useUserContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: async () => await fetchUser() });
  const onSubmit = async (data) => {
    console.log(data);
    const updatedUser = await UserService.updateUserById(
      userId,
      {
        userName: data.userName,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
      },
      token
    );
    console.log(updatedUser);
    navigate(`/users/${userId}`);
  };

  async function fetchUser() {
    const user = await UserService.getUserById(userId);
    return user;
  }

  return (
    <div className="max-w-96 mx-auto">
      <p className="text-3xl uppercase text-center">User form</p>

      <form
        className="flex flex-col space-y-5 max-h-[90vh] overflow-y-scroll"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label className="text-2xl">Username</label>
          <input
            className="bg-slate-200 p-2"
            {...register("userName", { required: true })}
          />
          {errors.userName && (
            <span className="text-red-600">Username is required!</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">First name</label>
          <input
            className="bg-slate-200 p-2"
            {...register("firstName", { required: true })}
          />
          {errors.firstName && (
            <span className="text-red-600">First name is required!</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">Last name</label>
          <input
            className="bg-slate-200 p-2"
            {...register("lastName", { required: true })}
          />
          {errors.lastName && (
            <span className="text-red-600">Last name is required!</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">Email</label>
          <input
            className="bg-slate-200 p-2"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-600">Email is required!</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">Role</label>
          <select {...register("role", { required: true })}>
            <option value={"admin"}>Admin</option>
            <option value={"user"}>User</option>
          </select>
          {errors.role && (
            <span className="text-red-600">Role is required!</span>
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
