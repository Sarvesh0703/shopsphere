import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("shopsphere-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email, password) => {
    const savedUser = localStorage.getItem("shopsphere-account");

    if (!savedUser) {
      return {
        success: false,
        message: "Account not found. Please register first.",
      };
    }

    const account = JSON.parse(savedUser);

    if (
      account.email !== email ||
      account.password !== password
    ) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    localStorage.setItem(
      "shopsphere-user",
      JSON.stringify({
        name: account.name,
        email: account.email,
      })
    );

    setUser({
      name: account.name,
      email: account.email,
    });

    return { success: true };
  };

  const register = (name, email, password) => {
    const account = {
      name,
      email,
      password,
    };

    localStorage.setItem(
      "shopsphere-account",
      JSON.stringify(account)
    );

    localStorage.setItem(
      "shopsphere-user",
      JSON.stringify({
        name,
        email,
      })
    );

    setUser({
      name,
      email,
    });

    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("shopsphere-user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);