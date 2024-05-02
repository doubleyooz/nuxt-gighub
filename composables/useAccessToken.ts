export const useAccessToken = (baseUrl: string) => {
  const authHeaders = () => {
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${useCookie("token").value}`,
      } as HeadersInit,
    };
  };

  const setAccessToken = (token: string | undefined | null) => {
    useCookie("token").value = token;
  };

  const setSafeAccessToken = (token: string | undefined | null) => {
    if (!token) return;
    useCookie("token").value = token;
  };

  const refreshAccessToken = async () => {
    const response = await fetch(`${baseUrl}/refresh-token`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error("Refresh token failed");
    }

    // If successful, you can process the response here
    const data = await response.json();
    console.log({ refresh: data });
  };

  const verifyAccessToken = async () => {
    try {
      const response = await fetch(`${baseUrl}/me`, {
        headers: authHeaders().headers,
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Verify token failed");
      }

      // If successful, you can process the response here
      const data = await response.json();
      console.log({ refresh: data });
    } catch (err) {
      console.log({ err });
      await refreshAccessToken();
    }
  };

  return {
    authHeaders,
    setAccessToken,
    setSafeAccessToken,
    refreshAccessToken,
    verifyAccessToken,
  };
};
