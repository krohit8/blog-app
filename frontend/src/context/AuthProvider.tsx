import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useUserMe } from "@/react-query/queries";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Use React Query to fetch user data
  const { data: userData, refetch } = useUserMe();
  const user = userData?.user || null;

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setTokenState(savedToken);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (token && !user) {
      refetch();
    }
  }, [token, user, refetch]);

  const fetchUser = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const setToken = useCallback((newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
      setTokenState(newToken);
    } else {
      localStorage.removeItem("token");
      setTokenState(null);
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
