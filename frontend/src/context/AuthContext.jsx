import { createContext, useState } from "react";
import { useApi } from "../hooks/useApi";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { request, endpoints } = useApi();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function verifyEmail(email) {
    try {
      setLoading(true);
      setError(null);

      const data = await request(endpoints.auth.check, {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      if (data instanceof Error) throw data;

      return { foundUser: data.foundUser };
    } catch (error) {
      setError(error.message);
      return { foundUser: null };
    } finally {
      setLoading(false);
    }
  }

  async function access(formData, action) {
    try {
      setLoading(true);
      setError(null);

      const data = await request(endpoints.auth[action], {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (data instanceof Error) throw data;

      localStorage.setItem("authToken", data.token);
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  }

  const value = {
    error,
    loading,
    verifyEmail,
    access,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
