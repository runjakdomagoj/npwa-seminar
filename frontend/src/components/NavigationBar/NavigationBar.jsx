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
      <button
        className={`px-5 py-2 fixed top-3 left-3 text-white font-medium rounded-md uppercase bg-amber-500`}
        onClick={handleManufacturers}
      >
        Manufacturers
      </button>

      <button
        className={`px-5 py-2 fixed top-3 right-3 text-white font-medium rounded-md uppercase bg-amber-500`}
        onClick={handleBeers}
      >
        Beers
      </button>

      {!token ? (
        <p
          className={`px-5 py-2 fixed bottom-3 left-3  font-bold rounded-md uppercase text-red-500`}
        >
          Currently logged out
        </p>
      ) : (
        <p
          className={`px-5 py-2 fixed bottom-3 left-3  font-bold rounded-md uppercase text-green-500`}
        >
          Currently logged in
        </p>
      )}

      <button
        className={`px-5 py-2 fixed bottom-3 right-3 text-white font-medium rounded-md uppercase bg-amber-500`}
        onClick={() => logOut()}
      >
        Log out
      </button>
    </div>
  );
}
