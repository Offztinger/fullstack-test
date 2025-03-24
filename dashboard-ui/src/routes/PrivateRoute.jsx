import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const PrivateRoute = ({ children }) => {
  const { checkAuth } = useAuth();
  const [isAuth, setIsAuth] = useState(null);

  const redirect = async () => {
    try {
      const res = await checkAuth();
      setIsAuth(res);
    } catch (error) {
      setIsAuth(false);
    }
  };

  useEffect(() => {
    redirect();
  }, []);

  if (isAuth === null) return null;
  return isAuth ? children : <Navigate to="/login" />;
};
