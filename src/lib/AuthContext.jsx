import React, { createContext, useContext } from "react";

const defaultAuthState = {
  user: null,
  isAuthenticated: true,
  isLoadingAuth: false,
  isLoadingPublicSettings: false,
  authError: null,
  appPublicSettings: null,
  authChecked: true,
  logout: () => {},
  navigateToLogin: () => {},
  checkUserAuth: async () => {},
  checkAppState: async () => {},
};

const AuthContext = createContext(defaultAuthState);

export const AuthProvider = ({ children }) => {
  return <AuthContext.Provider value={defaultAuthState}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
