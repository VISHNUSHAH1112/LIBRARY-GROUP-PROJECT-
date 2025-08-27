import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 🔹 Step 1: localStorage se value read karo (agar available ho)
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );
  const [role, setRole] = useState(
    () => localStorage.getItem("role") || ""
  );

  const login = (username, password) => {
    if (username.toLowerCase() === "admin" && password === "123") {
      setIsLoggedIn(true);
      setRole("admin");

      // 🔹 Step 2: login hone par localStorage me save karo
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("role", "admin");

      return "Admin Login Successful ✅";
    } else if (username.toLowerCase() === "user" && password === "123") {
      setIsLoggedIn(true);
      setRole("user");

      // 🔹 Step 2: login hone par localStorage me save karo
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("role", "user");

      return "User Login Successful ✅";
    } else {
      return "Invalid Credentials ❌";
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setRole("");

    // 🔹 Step 3: logout hone par localStorage clear karo
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
  };

  // 🔹 Step 4: (Optional) agar state change ho to sync karo
  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    localStorage.setItem("role", role);
  }, [isLoggedIn, role]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
