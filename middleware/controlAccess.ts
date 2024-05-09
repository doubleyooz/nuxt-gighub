export default defineNuxtRouteMiddleware(async (to, _from) => {
  const config = useRuntimeConfig();

  const { logout } = useAuthStore();
  const { unloadUser } = useUserStore();

  const currentToken = useCookie("token");
  if (currentToken.value) return navigateTo("/");

  const response = await fetch(`${config.public.appServer}/refresh-token`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await response.json();
  console.log({
    controlAccess: response.status,
    response: data,
  });
  // Check if the request was successful
  if (!response.ok) {
    //unloadUser();
    logout();
    return;
  }

  // If successful, you can process the response here
  // const data = await response.json();

  if (data?.metadata) currentToken.value = data.metadata?.accessToken;

  return navigateTo("/");
});
