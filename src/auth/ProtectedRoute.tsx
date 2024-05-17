import { FC, ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthContext";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  allowedRoles,
  children,
}) => {
  const { isAuthenticated, role, loading } = useContext(AuthContext);

  console.log("ProtectedRoute - isAuthenticated:", isAuthenticated);
  console.log("ProtectedRoute - role:", role);
  console.log("ProtectedRoute - allowedRoles:", allowedRoles);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner/loader component
  }

  if (!isAuthenticated) {
    console.log("ProtectedRoute - Not authenticated, redirecting to login.");
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    console.log("ProtectedRoute - Role not allowed, redirecting to home.");
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
