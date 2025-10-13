import { useState } from "react";
import { useApi } from "../hooks/useApi";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const { request, endSession, endpoints } = useApi();
  const [authError, setAuthError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [foundUser, setFoundUser] = useState(null);
  const [userData, setUserData] = useState({});

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

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handleEmailSubmit = async () => {
    const { foundUser } = await verifyEmail(email);
    setFoundUser(foundUser);
  };

  const resetEmail = () => {
    setFoundUser(null);
  };

  async function access(formData, action) {
    try {
      setLoading(true);
      setAuthError(null);

      const data = await request(endpoints.auth[action], {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (data instanceof Error) throw data;

      localStorage.setItem("token", data.token);
      return { success: true };
    } catch (error) {
      setAuthError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    endSession();
    setAuthError(null);
    setEmail("");
    setFoundUser(null);
    setUserData({});
  }

  async function getUserData() {
    try {
      setLoading(true);
      setAuthError(null);

      const data = await request(endpoints.user.profile);
      if (data instanceof Error) throw data;

      setUserData(data);
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const value = {
    authError,
    loading,
    verifyEmail,
    access,
    logout,
    email,
    handleEmailChange,
    handleEmailSubmit,
    resetEmail,
    foundUser,
    getUserData,
    userData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
