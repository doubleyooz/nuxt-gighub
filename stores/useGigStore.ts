import { defineStore } from "pinia";
import { ref } from "vue";
import type { Gig } from "~/models/gig.model";
import type { Proposition } from "~/models/proposition.model";
import type { User } from "~/models/user.model";

export interface LoadedGig extends Gig {
  user: User;
  propositions: Proposition[];
}

export const useGigStore = defineStore("gig", () => {
  const loadedGig = ref<LoadedGig>();
  const loading = ref(true);
  const config = useRuntimeConfig();
  const authStore = useAuthStore();

  const {
    authHeaders,
    setSafeAccessToken,
    setAccessToken,

    fetchApi,
  } = useAccessToken(config.public.appServer);

  async function loadGig(title: string) {
    if (loadedGig.value?.title === title) return;

    loading.value = true;
    try {
      const gigResult = await fetchApi(`gigs?title=${title}`);

      loadedGig.value = gigResult.data[0];

      const propositionsResponse = await fetchApi(
        `propositions?gigId=${loadedGig.value?._id}`
      );

      console.log({ propositionsResponse, loadedGig: loadedGig.value });
      if (loadedGig.value)
        loadedGig.value.propositions = propositionsResponse.data;
    } catch (err) {
      console.log(err);

      const token = useCookie("token");
      token.value = null;
    } finally {
      loading.value = false;
    }

    console.log({ loadedGig: loadedGig.value });
  }

  async function fetchGigs() {
    let data;
    try {
      const result = await fetchApi(`gigs`);

      console.log(result);
      data = result.data;
    } catch (err) {
      console.log(err);

      const token = useCookie("token");
      token.value = null;
    }
    console.log({ data });
    return data || [];
  }

  const isOwner = computed(() => {
    return loadedGig.value?.user._id === authStore.loggedUser?._id;
  });

  return { loadGig, loadedGig, isOwner, fetchGigs };
});
