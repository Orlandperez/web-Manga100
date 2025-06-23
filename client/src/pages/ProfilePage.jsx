import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get("/api/profile", { withCredentials: true })
      .then(res => setProfile(res.data));
  }, []);

  if (!profile) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Perfil</h2>
      <p>Usuario: {profile.username}</p>
      <p>Email: {profile.email}</p>
      <p>Rol: {profile.role}</p>
    </div>
  );
}