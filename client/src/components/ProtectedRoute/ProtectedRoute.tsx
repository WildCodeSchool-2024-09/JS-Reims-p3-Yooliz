import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useOutletContext } from "react-router-dom";
import "./ProtectedRoute.css";

type User = {
  id: number;
  email: string;
  isAdmin: boolean;
};

type Auth = {
  auth: {
    user: User;
  } | null;
  setAuth: (auth: { user: User } | null) => void;
};

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { auth } = useOutletContext<Auth>();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/login`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (response.ok) {
          await response.json();
          setIsAuthenticated(true);
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-auth">Vérification de l'authentification...</div>
    );
  }

  if (!auth?.user && !isAuthenticated) {
    return (
      <Navigate
        to="/authentication"
        state={{
          redirectTo: location.pathname,
          vehicleData: location.state?.vehicleData,
          habitsData: location.state?.habitsData,
          optionsData: location.state?.optionsData,
        }}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
