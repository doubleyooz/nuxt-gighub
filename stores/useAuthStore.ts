import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { User } from "~/models/user.model";

export const useAuthStore = defineStore("auth", () => {
  const config = useRuntimeConfig();

  const { fetchApi, setSafeAccessToken, setAccessToken } = useAccessToken(
    config.public.appServer
  );
  const { linkWallet } = useMetamask(config.public.appServer);

  const loading = ref(false);

  const storedUser = useCookie<User | null>("loggedUser", {
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "strict",
    encode: (value) => JSON.stringify(value),
    decode: (value) => (value ? JSON.parse(value) : null),
  });

  const loggedUser = ref<User | null>(storedUser.value ?? null);


  const handleSignIn = async (email: string, password: string, redirectPath?: string) => {
    loading.value = true;
    const encodedCredentials = btoa(`${email}:${password}`);


    try {
      // Make the request to the login endpoint
      const { data, error } = await useFetch<{ data: User, metadata?: { accessToken?: string } }>(
        '/sign-in',
        {
          baseURL: config.public.appServer,
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'Authorization': `Basic ${encodedCredentials}`,
          },
          credentials: 'include',
        }
      );

      // Check if the request was successful
      if (error.value || !data.value) {
        throw new Error('Login failed');
      }

      // If successful, you can process the response here      
      console.log({ auth: data.value, metadata: data.value.metadata });

      setSafeAccessToken(data.value.metadata?.accessToken);
      loggedUser.value = data.value.data;
      storedUser.value = data.value.data;

      // Redirect the user or perform other actions as needed
      if (redirectPath) {
        return navigateTo(redirectPath);
      } else {
        return navigateTo('/');
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle the error, e.g., show an error message to the user
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const handleSignUp = async (data: {
    email: string;
    password: string;
    name: string;
  }) => {
    loading.value = true;

    try {
      // Make the request to the login endpoint

      await fetchApi(`users`, {
        method: "POST",
        body: { ...data },
      });

      return navigateTo('/login');
    } catch (error) {
      console.error("Error:", error);
      // Handle the error, e.g., show an error message to the user
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const handleMetaSignIn = async (redirectPath?: string) => {
    loading.value = true;

    try {
      // Make the request to the login endpoint
      const { user, accessToken } = await linkWallet();

      if (!(accessToken && user)) {
        return navigateTo('/register');
      }

      console.log({ user });

      if (accessToken) setAccessToken(accessToken);
          if (user) {
        loggedUser.value = { ...loggedUser.value, ...user };
        storedUser.value = loggedUser.value;
      }
      return navigateTo(redirectPath ?? '/');
     
    } catch (error) {
      console.error("Error:", error);
      // Handle the error, e.g., show an error message to the user
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const loggedUserPicture = computed(() => {
    return getImageUrl(
      config.public.imageServer,
      loggedUser.value?.picture?._id,
      loggedUser.value?.picture?.ext
    );
  });

  const logout = async () => {
    setAccessToken(null);
    loggedUser.value = null;
    storedUser.value = null;
    console.log("logout");
  };

  watch(
    loggedUser,
    (newUser) => {
      console.log({ loggedUser: newUser });
      storedUser.value = newUser;
    },
    { deep: true }
  );

  return {
    handleSignIn,
    handleSignUp,
    handleMetaSignIn,
    loading,
    logout,
    loggedUserPicture,
    loggedUser,
  };
});
