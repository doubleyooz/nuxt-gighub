import { defineStore } from "pinia";
import { ref } from "vue";
import type { User, LooseUser } from "~/models/user.model";

export interface LoadedUser extends User {}
export const useUserStore = defineStore("user", () => {
  const config = useRuntimeConfig();

  const { fetchApi } = useAccessToken(config.public.appServer);

  const loadedUser = ref<LoadedUser>();

  const storedUser: Ref<User | null> = useCookie("loggedUser");

  const loggedUser = ref<User | null>(
    storedUser.value ? storedUser.value : null
  );

  async function loadUser(username: string) {
    if (loadedUser.value?.name === username) return;

    const result = await fetchApi(`users?name=${username}`);

    loadedUser.value = result.data[0];

    console.log({ result: loadedUser.value });
  }

  async function loadUsers({ name, email }: { name?: string; email?: string }) {
    let query = "";
    if (name) query += `?name=${name}`;
    else if (email) query += `?email=${email}`;
    const result: User[] = (await fetchApi(`users${query}`)).data;
    console.log({ result });
    return result || [];
  }

  async function setWallet(address: string | null) {
    if (!loadedUser.value) return;
    const response = await fetchApi(`users`, {
      method: "PUT",

      body: {
        wallet: address,
      },
    });

    loadedUser.value.wallet = response.data.address;
  }

  const isLoggedUser = computed(() => {
    console.log({ loggedUser: loggedUser.value, loadedUser: loadedUser.value });
    return loggedUser.value?.name === loadedUser.value?.name;
  });

  async function unloadUser() {
    loadedUser.value = undefined;
  }

  const userPicture = computed(() =>
    getImageUrl(
      config.public.imageServer,
      loadedUser.value?.picture._id,
      loadedUser.value?.picture.ext
    )
  );

  const updateLoggedUser = async (body: LooseUser) => {
    if (!isLoggedUser.value) return;
    try {
      const user: User = (
        await fetchApi(`users`, {
          method: "PUT",
          body: body,
        })
      ).data;

      loggedUser.value = { ...loggedUser.value, ...user };
      loadedUser.value = { ...loadedUser.value, ...user };
    } catch (error) {
      console.error("Error:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  watch(
    loggedUser,
    () => {
      console.log({ updatedLoggedUser: loggedUser.value });
      console.log({ updatedLoadedUser: loadedUser.value });
      storedUser.value = loggedUser.value;
    },
    { deep: true }
  );

  return {
    loadUser,
    loadUsers,
    isLoggedUser,
    userPicture,
    unloadUser,
    setWallet,
    loadedUser,
    updateLoggedUser,
  };
});
