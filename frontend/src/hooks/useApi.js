import { useCallback } from "react";

const API_CONFIG = {
  baseUrl: "/api",
  endpoints: {
    auth: {
      check: "/auth/check-email",
      signup: "/auth/signup",
      login: "/auth/login",
    },
    user: {
      profile: "/user/profile",
    },
  },
  defaultHeaders: {
    "Content-Type": "application/json",
  },
};

export const useApi = () => {
  const request = useCallback(async (endpoint, options = {}) => {
    const { headers = {}, ...restOptions } = options;
    const url = getApiUrl(endpoint);
    const requestHeaders = getHeaders(headers);

    try {
      const response = await fetch(url, {
        ...restOptions,
        headers: requestHeaders,
      });

      if (response.status === 401) {
        const newToken = await refreshToken();

        if (newToken.error)
          throw new Error(newToken.error || "API request failed");

        const retryResponse = await fetch(url, {
          ...restOptions,
          headers: {
            ...requestHeaders,
            Authorization: `Bearer ${newToken}`,
          },
        });

        if (!retryResponse.ok) {
          await endSession();
          return;
        }

        localStorage.setItem("token", newToken);
        return await retryResponse.json();
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "API request failed");
      }

      return await response.json();
    } catch (error) {
      return error;
    }
  }, []);

  const getApiUrl = (endpoint) => {
    let url = `${API_CONFIG.baseUrl}${endpoint}`;
    return url;
  };

  const getHeaders = (additionalHeaders = {}) => {
    const token = localStorage.getItem("token");
    const headers = {
      ...API_CONFIG.defaultHeaders,
      ...additionalHeaders,
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  };

  const refreshToken = async () => {
    const response = await fetch(`${API_CONFIG.baseUrl}/auth/refresh-token`);

    if (!response.ok) {
      const error = await response.json();
      return { error: error.error };
    }

    const { token } = await response.json();
    return token;
  };

  const endSession = async () => {
    await fetch(`${API_CONFIG.baseUrl}/auth/logout`);
    localStorage.removeItem("token");
    window.location.href = "/auth";
  };

  return {
    request,
    endSession,
    endpoints: API_CONFIG.endpoints,
  };
};
