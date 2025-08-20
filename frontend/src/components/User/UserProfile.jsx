import React, { useEffect, useState } from "react";
import UserService from "./UserService";
import { useUserContext } from "../../context/useContext";

export function UserProfile() {
  const [profile, setProfile] = useState([]);
  const { token } = useUserContext();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const profileData = await UserService.getYourProfile(token);
        setProfile(profileData);
      } catch (err) {
        console.error("Greška kod dohvaćanja profila:", err);
      }
    }
    if (token) {
      fetchProfile();
    }
  }, [token]);

  return (
    <div className="flex flex-col h-screen justify-center">
      <p className="text-3xl uppercase text-center mb-5">{profile.userName}</p>
      <p className="text-xl text-center mb-10">{profile.email}</p>
      <p className="text-xl text-center mb-10">{profile.role}</p>
    </div>
  );
}
