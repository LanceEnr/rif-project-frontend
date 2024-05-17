import { createContext, useState, FC, ReactNode, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextProps {
  isAuthenticated: boolean;
  role: string;
  loading: boolean;
  login: (token: string, role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  role: "",
  loading: true,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    console.log("useEffect - token:", token);
    console.log("useEffect - storedRole:", storedRole);
    if (token) {
      try {
        const decodedToken = jwtDecode(token) as any;
        const userRole = decodedToken?.roles?.[0]; // Assuming roles is an array
        console.log("useEffect - decodedToken:", decodedToken);
        if (userRole && new Date(decodedToken.exp * 1000) > new Date()) {
          console.log("useEffect - setting authenticated");
          setIsAuthenticated(true);
          setRole(userRole);
        } else {
          console.log("useEffect - token expired or role missing");
          localStorage.removeItem("token");
          localStorage.removeItem("role");
        }
      } catch (error) {
        console.error("Invalid token format", error);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
      }
    }
    setLoading(false);
  }, []);

  const login = (token: string, userRole: string) => {
    console.log("login - token:", token);
    console.log("login - userRole:", userRole);
    localStorage.setItem("token", token);
    localStorage.setItem("role", userRole);
    setIsAuthenticated(true);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setRole("");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, role, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
