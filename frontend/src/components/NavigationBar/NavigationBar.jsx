import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/useContext";

export function NavigationBar() {
  const { logOut, token } = useUserContext();
  const navigate = useNavigate();

  function handleBeers() {
    navigate(`/beers`);
  }
  function handleManufacturers() {
    navigate(`/manufacturers`);
  }

  return (
    <div>
      <div className="flex justify-between items-center px-8 py-4 bg-blue-500 shadow-md">
        <div className="flex space-x-4">
          <button
            className="px-5 py-2 text-white font-medium  uppercase transition"
            onClick={handleManufacturers}
          >
            Manufacturers
          </button>

          <button
            className="px-5 py-2 text-white font-medium uppercase"
            onClick={handleBeers}
          >
            Beers
          </button>
        </div>

        {token && <button
          className="px-5 py-2 text-white font-medium uppercase"
          onClick={logOut}
        >
          Log out
        </button>}
      </div>

      <div className="absolute bottom-1 right-4">
        {!token ? (
          <p className="p-2 font-bold  uppercase text-red-500 shadow-md">
            Logged out
          </p>
        ) : (
          <p className="p-2 font-bold uppercase text-green-500 shadow-md">
            Logged in
          </p>
        )}
      </div>
    </div>
  );
}
