import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );
  const [role, setRole] = useState(() => localStorage.getItem("role") || null);
  const [toasts, setToasts] = useState([]);

  // ---- LOGIN ----
  const login = (userRole) => {
    setIsLoggedIn(true);
    setRole(userRole);
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("role", userRole);

    // ✅ Correct success toast
    showToast("success", "Login successful!");
  };

  // ---- LOGOUT ----
  const logout = () => {
    setIsLoggedIn(false);
    setRole(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");

    // 🔴 Red toast for logout
    showToast("error", "Logged out successfully!");
  };

  // ---- TOAST HANDLER ----
  const showToast = (type, message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);

    // Auto remove after 5s
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  };

  // ---- PROTECT ACTION (for View button etc.) ----
  const requireLogin = (actionName) => {
    if (!isLoggedIn) {
      showToast("error", "Please login first!"); // 🔴 red popup instead of alert
      return false;
    }
    return true;
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, role, login, logout, showToast, requireLogin }}
    >
      {children}

      {/* ✅ Toast Container */}
      <div style={styles.toastContainer}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            style={{
              ...styles.toast,
              ...(toast.type === "error" ? styles.error : styles.success),
            }}
          >
            {toast.type === "error" ? "❌ " : "✅ "}
            {toast.message}
          </div>
        ))}
      </div>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

const styles = {
  toastContainer: {
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: 1000,
  },
  toast: {
    width: "300px",
    padding: "12px 18px",
    borderRadius: "6px",
    marginBottom: "10px",
    color: "#fff",
    fontWeight: "bold",
    boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
    animation: "fadeIn 0.3s ease-in-out",
  },
  success: {
    backgroundColor: "green",
  },
  error: {
    backgroundColor: "red", // 🔴 red popup
  },
  info: {
    backgroundColor: "blue", // 🔵
  },
  warning: {
    backgroundColor: "orange", // 🟠
  }
}