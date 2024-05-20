import React, { createContext, useState, FC, ReactNode, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

interface AuthContextProps {
  isAuthenticated: boolean;
  role: string;
  loading: boolean;
  user: { firstname: string; lastname: string; email: string } | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  role: "",
  loading: true,
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ firstname: string; lastname: string; email: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token) as any;
        const userRole = decodedToken?.roles?.[0];
        if (userRole && new Date(decodedToken.exp * 1000) > new Date()) {
          setIsAuthenticated(true);
          setRole(userRole);
          setUser({
            firstname: decodedToken.firstname,
            lastname: decodedToken.lastname,
            email: decodedToken.email,
          });
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Invalid token format", error);
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const decodedToken = jwtDecode(token) as any;
    const userRole = decodedToken?.roles?.[0];
    setIsAuthenticated(true);
    setRole(userRole);
    setUser({
      firstname: decodedToken.firstname,
      lastname: decodedToken.lastname,
      email: decodedToken.email,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setRole("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, loading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
