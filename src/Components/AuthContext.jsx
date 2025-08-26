import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const login = (username, password) => {
    if (username.toLowerCase() === "admin" && password === "123") {
      setIsLoggedIn(true);
      setRole("admin");
      return "Admin Login Successful ✅";
    } else if (username.toLowerCase() === "user" && password === "123") {
      setIsLoggedIn(true);
      setRole("user");
      return "User Login Successful ✅";
    } else {
      return "Invalid Credentials ❌";
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
