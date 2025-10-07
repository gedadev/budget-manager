import { createContext, useState } from "react";
import { useApi } from "../hooks/useApi";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { request, endpoints } = useApi();
  const [authError, setAuthError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function verifyEmail(email) {
    try {
      setLoading(true);
      setAuthError(null);

      const data = await request(endpoints.auth.check, {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      if (data instanceof Error) throw data;

      return { foundUser: data.foundUser };
    } catch (error) {
      setAuthError(error.message);
      return { foundUser: null };
    } finally {
      setLoading(false);
    }
  }

  async function access(formData, action) {
    try {
      setLoading(true);
      setAuthError(null);

      const data = await request(endpoints.auth[action], {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (data instanceof Error) throw data;

      localStorage.setItem("authToken", data.token);
      return { success: true };
    } catch (error) {
      setAuthError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  const value = {
    authError,
    loading,
    verifyEmail,
    access,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
