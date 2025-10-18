import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext,type User } from "./AuthContext";
import { BACKEND_URL } from "../../config";
import axios from "axios";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = useCallback(async () => {
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/user/me`, {
        headers: {
          Authorization: token,
        },
      });
      setUser(response.data.user);
    } catch (error) {
      console.log("failed to fetch user", error);

    }
  }, [token]);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setTokenState(savedToken);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (token && !user) {
      fetchUser();
    }
  }, [fetchUser, token, user]);

  const setToken = useCallback((newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
      setTokenState(newToken);
    } else {
      localStorage.removeItem("token");
      setTokenState(null);
      setUser(null);
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
  }, [setToken]);

  const isAuthenticated = !!token;

  const contextValue = useMemo(
    () => ({
      token,
      loading,
      setToken,
      isAuthenticated,
      logout,
      user,
      fetchUser,
    }),
    [token, loading, setToken, isAuthenticated, logout, user, fetchUser]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
