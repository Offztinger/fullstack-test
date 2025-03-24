import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const PrivateRoute = ({ children }) => {
  const { checkAuth } = useAuth();
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const result = checkAuth();
    setIsAuth(result);
  }, []);

  if (isAuth === null) return null;
  return isAuth ? children : <Navigate to="/login" />;
};
