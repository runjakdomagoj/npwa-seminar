import { BeerDetails } from "./components/Beer/BeerDetails";
import { ManufacturerDetails } from "./components/Manufacturer/ManufacturerDetails";
import { BeerForm } from "./components/Beer/BeerForm";
import { BeerList } from "./components/Beer/BeerList";
import { Login } from "./components/Login/Login";
import { ManufacturerList } from "./components/Manufacturer/ManufacturerList";
import { ProtectedRoute } from "./components/Protected/ProtectedRoute";
import { SignUp } from "./components/SignUp/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ManufacturerForm } from "./components/Manufacturer/ManufacturerForm";
import { NavigationBar } from "./components/NavigationBar/NavigationBar";
import { useUserContext } from "./context/useContext";
import { ChangePassword } from "./components/ChangePassword/ChangePassword";

function App() {
  const { role } = useUserContext();
  return (
    <>
      <NavigationBar />
      <div>
        <Routes>
          <Route
            path="/beers"
            element={
              <ProtectedRoute>
                <BeerList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manufacturers"
            element={
              <ProtectedRoute>
                <ManufacturerList />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/beers/create"
            element={
              <ProtectedRoute>
                {role === "admin" && <BeerForm />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/beers/:beerId/update"
            element={
              <ProtectedRoute>
                {role === "admin" && <BeerForm />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/beers/:beerId/"
            element={
              <ProtectedRoute>
                <BeerDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manufacturers/:manufacturerId/"
            element={
              <ProtectedRoute>
                <ManufacturerDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manufacturers/create"
            element={
              <ProtectedRoute>
                {role === "admin" && <ManufacturerForm />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/manufacturers/:manufacturerId/update"
            element={
              <ProtectedRoute>
                {role === "admin" && <ManufacturerForm />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/change-password"
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
