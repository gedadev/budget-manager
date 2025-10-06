import { useCallback } from "react";

const API_CONFIG = {
  baseUrl: "/api",
  endpoints: {
    auth: {
      check: "/auth/check-email",
      signup: "/auth/signup",
      login: "/auth/login",
    },
  },
  defaultHeaders: {
    "Content-Type": "application/json",
  },
};

export const useApi = () => {
  const getApiUrl = useCallback((endpoint) => {
    let url = `${API_CONFIG.baseUrl}${endpoint}`;
    return url;
  }, []);

  const getHeaders = useCallback((additionalHeaders = {}) => {
    const token = localStorage.getItem("authToken");
    const headers = {
      ...API_CONFIG.defaultHeaders,
      ...additionalHeaders,
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }, []);

  const request = useCallback(
    async (endpoint, options = {}) => {
      const { headers = {}, ...restOptions } = options;
      const url = getApiUrl(endpoint);
      const requestHeaders = getHeaders(headers);

      try {
        const response = await fetch(url, {
          ...restOptions,
          headers: requestHeaders,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "API request failed");
        }

        return await response.json();
      } catch (error) {
        return error;
      }
    },
    [getApiUrl, getHeaders]
  );

  return {
    request,
    endpoints: API_CONFIG.endpoints,
  };
};
