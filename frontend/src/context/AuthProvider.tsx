import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setTokenState] = useState<string | null>(null);
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setTokenState(savedToken);
      }
      setLoading(false)
    }, []);
  
    const setToken = (newToken: string | null) => {
      if (newToken) {
        localStorage.setItem("token", newToken);
        setTokenState(newToken)
      } else {
        localStorage.removeItem("token");
        setTokenState(null);
      }
    };
    const logout = () => {
      setToken(null);
    };
    const isAuthenticated = !!token;
    return (
      <AuthContext.Provider
        value={{
          token,
          loading,
          setToken,
          isAuthenticated,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };