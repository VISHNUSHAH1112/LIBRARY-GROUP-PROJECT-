import { createContext, useContext, useState } from "react";

// ✅ AuthContext banaya
const AuthContext = createContext();

// ✅ Provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // <-- yeh add kiya
  const [role, setRole] = useState(""); // <-- yeh add kiya (admin/user role store karne ke liye)

  // ✅ Login function
  const login = (username, password) => {
    // <-- yeh pura function add kiya
    if (username.toLowerCase() === "admin" && password === "admin") {
      setIsLoggedIn(true);
      setRole("admin");
      return "Admin Login Successful ✅";
    } else if (username.toLowerCase() === "user" && password === "user") {
      setIsLoggedIn(true);
      setRole("user");
      return "User Login Successful ✅";
    } else {
      return "Invalid Credentials ❌";
    }
  };

  // ✅ Logout function
  const logout = () => {
    // <-- yeh add kiya
    setIsLoggedIn(false);
    setRole("");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
      {/* children ko wrap kiya */}
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom Hook (Navbar aur dusre jagah use karne ke liye)
// <-- yeh add kiya
export const useAuth = () => useContext(AuthContext);
