import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "~/models/user.model";

export const useAuthStore = defineStore("auth", () => {
  const config = useRuntimeConfig();

  const route = useRoute();
  const router = useRouter();
  const redirect =
    (route.query.redirect as string) || useCookie("redirect").value;

  const loading = ref(false);
  const accessToken = useCookie("token");

  const loggedUser = ref<User>();

  const setAccessToken = (str: string | null) => {
    accessToken.value = str;
  };

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
      setAccessToken(metadata?.accessToken);
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

  return {
    setAccessToken,
    accessToken,
    handleSignIn,
    loading,
    loggedUser,
  };
});
