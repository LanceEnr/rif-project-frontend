import React, { FC, useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthContext";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated, role, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    if (role === "ROLE_ADMIN") {
      return <Navigate to="/admin" />;
    } else if (role === "ROLE_USER") {
      return <Navigate to="/" />;
    }
  }

  return <>{children}</>;
};

export default PublicRoute;
