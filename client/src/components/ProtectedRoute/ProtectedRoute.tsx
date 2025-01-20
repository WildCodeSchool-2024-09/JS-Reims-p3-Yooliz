import type { ReactNode } from "react";
import { Navigate, useLocation, useOutletContext } from "react-router-dom";

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

  if (!auth?.user) {
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
