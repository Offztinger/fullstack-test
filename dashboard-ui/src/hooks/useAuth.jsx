// src/hooks/useAuth.ts
import { useAuthStore } from "@/store/useAuthStore";

export const useAuth = () => {
  const url = import.meta.env.VITE_BACKEND_URL;

  const { token, setToken, user, setUser, logout } = useAuthStore();

  const login = async (email, password) => {
    try {
      const res = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Error al iniciar sesión");

      const data = await res.json();
      console.log("data", data);
      setToken(data.access_token);
      setUser(data.user);

      return data;
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  const register = async (email, password) => {
    try {
      const res = await fetch(`${url}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Error al registrarse");

      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Register error:", err);
      throw err;
    }
  };

  return {
    token,
    user,
    login,
    register,
    logout,
  };
};
