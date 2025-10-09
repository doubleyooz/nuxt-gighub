export default defineNuxtRouteMiddleware(async (to, _from) => {
  const config = useRuntimeConfig();
  const { logout } = useAuthStore();
  const { unloadUser } = useUserStore();

  const currentToken = useCookie<string | null>('token', { path: '/', maxAge: 60 * 60 * 24 * 7 }); // 7 days expiry, typed

  console.log({ currentToken: currentToken.value });

  if (currentToken.value) return;

  const { data, error } = await useFetch<{ metadata?: { accessToken?: string } }>(`/refresh-token`, {
    baseURL: config.public.appServer,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  // Check if the request was successful
  if (error.value || !data.value?.metadata) {
    unloadUser();
    //logout();
    useCookie('redirect', { path: '/', maxAge: 900 }).value = to.fullPath;
    return navigateTo({ path: '/login', query: { redirect: to.fullPath }, replace: true });
  }

  // If successful, you can process the response here

  currentToken.value = data.value?.metadata?.accessToken || null;

  console.log({ refresh: data });
});
