import { useAuthStore } from "@/store/useAuthStore";
import { setCookie, getCookie } from "@/utils/cookies";
import toast from "react-hot-toast";

const TOKEN_KEY = "AUTH_TOKEN";
const EXPIRATION_KEY = "EXPIRATION_TOKEN";

export const useAuth = () => {
  const url = import.meta.env.VITE_BACKEND_URL;

  const {
    token,
    setToken,
    user,
    setUser,
    logout: zustandLogout,
  } = useAuthStore();

  const login = async (email, password) => {
    const res = await fetch(`${url}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error = await res.json();
      toast.error(error.message);
      throw new Error("Error al iniciar sesión");
    }

    const data = await res.json();

    setToken(data.access_token);
    setUser(data.user);

    localStorage.setItem(TOKEN_KEY, data.access_token);
    setCookie(EXPIRATION_KEY, "false", 1);

    return data;
  };

  const register = async (data) => {
    const res = await fetch(`${url}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      toast.error("Error al registrarse.");
      throw new Error("Error al registrarse.");
    }

    toast.success("Usuario registrado correctamente.");
    return res.json();
  };

  const logout = () => {
    zustandLogout();
    localStorage.removeItem(TOKEN_KEY);
    setCookie(EXPIRATION_KEY, "true");
  };

  const checkAuth = async () => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const expired = !getCookie(EXPIRATION_KEY);

    const res = await fetch(`${url}/auth/profile`, {
      method: "GET",
      headers: { Authorization: `Bearer ${storedToken}` },
    });

    if (!res.ok) {
      logout();
      throw new Error("Error al verificar la sesión.");
    }

    setUser(await res.json());

    if (!storedToken || expired) {
      logout();
      return false;
    }

    setToken(storedToken);
    return true;
  };

  return {
    token,
    user,
    login,
    register,
    logout,
    checkAuth,
  };
};
