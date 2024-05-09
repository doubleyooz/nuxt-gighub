export default defineNuxtRouteMiddleware(async (to, _from) => {
  const config = useRuntimeConfig();
  const { logout } = useAuthStore();
  const { unloadUser } = useUserStore();

  const currentToken = useCookie("token");
  console.log({ currentToken: currentToken.value });
  if (currentToken.value) return;

  const response = await fetch(`${config.public.appServer}/refresh-token`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  // Check if the request was successful
  if (!response.ok) {
    unloadUser();
    //logout();
    useCookie("redirect", { path: "/", maxAge: 900 }).value = to.fullPath;
    return navigateTo("/login?redirect=" + to.fullPath, { replace: true });
  }

  // If successful, you can process the response here
  const data = await response.json();

  if (data?.metadata) currentToken.value = data.metadata?.accessToken;

  console.log({ refresh: data });
  return;
});
