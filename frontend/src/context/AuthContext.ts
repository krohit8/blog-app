import { createContext, useContext } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface authContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  loading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
  user: User | null;
  fetchUser: () => Promise<void>;
}
export const AuthContext = createContext<authContextType | undefined>(
  undefined,
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be within auth provider");
  }
  return context;
};
