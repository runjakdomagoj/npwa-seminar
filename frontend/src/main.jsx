import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./input.css";
import App from "./App.jsx";
import UserSessionProvider from "./context/useContext";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <UserSessionProvider>
        <App />
      </UserSessionProvider>
    </Router>
  </StrictMode>
);
