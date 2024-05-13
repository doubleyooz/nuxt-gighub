import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "~/models/user.model";

export const useAuthStore = defineStore("auth", () => {
  const config = useRuntimeConfig();

  const { fetchApi, setSafeAccessToken, setAccessToken } = useAccessToken(
    config.public.appServer
  );
  const route = useRoute();
  const router = useRouter();
  const redirect =
    (route.query.redirect as string) || useCookie("redirect").value;

  const { linkWallet } = useMetamask(config.public.appServer);

  const loading = ref(false);
  const storedUser: Ref<User | null> = useCookie("loggedUser");

  const loggedUser = ref<User | null>(
    storedUser.value ? storedUser.value : null
  );

  const handleSignIn = async (email: string, password: string) => {
    loading.value = true;
    const encodedCredentials = btoa(`${email}:${password}`);

    // Set up the request options
    const requestOptions = {
      method: "GET", // or 'GET', depending on your API
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${encodedCredentials}`,
      },
      // If you need to send a body with your request, uncomment the following line
      // body: JSON.stringify({ /* your data here */ })
    };

    try {
      // Make the request to the login endpoint
      const response = await fetch(
        `${config.public.appServer}/sign-in`,
        requestOptions
      );

      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Login failed");
      }

      // If successful, you can process the response here
      const { data, metadata } = await response.json();
      console.log({ auth: data, metadata });
      setSafeAccessToken(metadata?.accessToken);
      loggedUser.value = data;
      // Redirect the user or perform other actions as needed
      if (redirect) {
        router.push(redirect);
        useCookie("redirect").value = null;
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle the error, e.g., show an error message to the user
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
    console.log(data);
    try {
      // Make the request to the login endpoint

      await fetchApi(`users`, {
        method: "POST",
        body: { ...data },
      });

      router.push("/login");
    } catch (error) {
      console.error("Error:", error);
      // Handle the error, e.g., show an error message to the user
    } finally {
      loading.value = false;
    }
  };

  const handleMetaSignIn = async () => {
    loading.value = true;

    try {
      // Make the request to the login endpoint
      const { user, address, accessToken } = await linkWallet();

      if (!(accessToken && user)) {
        router.push({ path: "/register" });
        return;
      }

      console.log(user);

      if (accessToken) setAccessToken(accessToken);
      if (user) loggedUser.value = { ...loggedUser.value, ...user };

      if (redirect) {
        router.push(redirect);
        useCookie("redirect").value = null;
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle the error, e.g., show an error message to the user
    } finally {
      loading.value = false;
    }
  };

  const loggedUserPicture = computed(() =>
    getImageUrl(
      config.public.imageServer,
      loggedUser.value?.picture?._id,
      loggedUser.value?.picture?.ext
    )
  );

  const logout = async () => {
    setAccessToken(null);
    loggedUser.value = null;

    console.log("logout");
  };

  watch(
    loggedUser,
    () => {
      console.log(loggedUser.value);
      storedUser.value = JSON.stringify(loggedUser.value);
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
