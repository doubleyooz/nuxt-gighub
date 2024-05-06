import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "~/models/user.model";

export interface LoadedUser extends User {}
export const useUserStore = defineStore("user", () => {
  const loadedUser = ref<LoadedUser>();
  const config = useRuntimeConfig();

  const { authHeaders, setAccessToken } = useAccessToken(
    config.public.appServer
  );

  async function loadUser(username: string) {
    console.log({
      loadedUser: loadedUser.value,
      username,
      bool: loadedUser.value?.name === username,
    });
    if (loadedUser.value?.name === username) return;

    const result = await fetch(
      `${config.public.appServer}/users?name=${username}`,
      authHeaders()
    );

    if (!result.ok) {
      console.log("here");
      setAccessToken(null);
      throw new Error(`HTTP error! status: ${result.status}`);
    }

    loadedUser.value = (await result.json()).data[0];

    console.log({ result: loadedUser.value });

    console.log({ result: loadedUser.value });
  }

  async function setWallet(address: string | null) {
    if (!loadedUser.value) return;
    const response = await fetch(`${config.public.appServer}/users`, {
      headers: { ...authHeaders().headers },
      method: "PUT",

      body: JSON.stringify({
        wallet: address,
      }),
      credentials: "include",
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error("Message token failed");
    }

    loadedUser.value.wallet = address;
  }

  async function unloadUser() {
    loadedUser.value = undefined;
  }

  return { loadUser, unloadUser, setWallet, loadedUser };
});
