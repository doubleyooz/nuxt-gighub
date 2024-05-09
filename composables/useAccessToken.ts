export const useAccessToken = (baseUrl: string) => {
  const router = useRouter();
  const route = useRoute();
  type httpMethod = "GET" | "POST" | "DELETE" | "PUT";
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
      setAccessToken(null);

      const redirectPath =
        (route.query.redirect as string) || useCookie("redirect").value;
      if (redirectPath) {
        router.push(redirectPath);
        useCookie("redirect").value = null;
      } else {
        router.push("/");
      }

      throw new Error("Refresh token failed");
    }

    // If successful, you can process the response here
    const data = await response.json();
    setSafeAccessToken(data.metadata?.accessToken);
    console.log({ refresh: data });
  };

  const fetchApi = async (
    path: string,
    options: { method: httpMethod; body?: object } = {
      method: "GET",
    }
  ) => {
    try {
      const apiResponse = await fetch(`${baseUrl}/${path}`, {
        method: options.method,
        body: JSON.stringify(options.body),
        headers: authHeaders().headers,
      });

      // Check if the request was successful
      if (!apiResponse.ok) {
        throw new Error("Fetch data failed");
      }
      const response = await apiResponse.json();
      setSafeAccessToken(response.metadata?.accessToken);
      return { data: response.data };
    } catch (err) {
      await refreshAccessToken();
      const apiResponse = await fetch(`${baseUrl}/${path}`, authHeaders());

      // Check if the request was successful
      if (!apiResponse.ok) {
        throw new Error("Fetch data failed");
      }
      const response = await apiResponse.json();
      setSafeAccessToken(response.metadata?.accessToken);
      return { data: response.data };
    }
  };

  return {
    authHeaders,
    setAccessToken,
    setSafeAccessToken,
    refreshAccessToken,
    fetchApi,
  };
};
