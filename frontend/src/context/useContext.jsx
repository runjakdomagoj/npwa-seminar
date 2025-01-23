import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const userContext = createContext(null);

export function useUserContext() {
  return useContext(userContext);
}

export default function UserSessionProvider({ children }) {
  const [token, SetToken] = useState(window.localStorage.getItem("token"));
  const [role, SetRole] = useState(window.localStorage.getItem("role"));

  const navigate = useNavigate();

  const setUserSession = (userSession) => {
    window.localStorage.setItem("token", userSession.token);
    window.localStorage.setItem("role", userSession.role);
    SetToken(userSession.token);
    SetRole(userSession.role);
    navigate("/beers");
  };

  const logOut = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("role");
    SetToken(null);
    SetRole(null);
    navigate("/login");
  };

  return (
    <userContext.Provider value={{ token, role, setUserSession, logOut }}>
      {children}
    </userContext.Provider>
  );
}
