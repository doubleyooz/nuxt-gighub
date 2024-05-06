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
    refreshAccessToken,
  } = useAccessToken(config.public.appServer);

  async function loadGig(title: string) {
    if (loadedGig.value?.title === title) return;

    loading.value = true;
    try {
      const gigResult = await fetch(
        `${config.public.appServer}/gigs?title=${title}`,
        authHeaders()
      );

      if (!gigResult.ok) {
        setAccessToken(null);
        throw new Error(`HTTP error! status: ${gigResult.status}`);
      }
      const gigResponse = await gigResult.json();
      console.log(gigResponse);
      loadedGig.value = gigResponse.data[0];

      setSafeAccessToken(gigResponse.metadata?.accessToken);

      const propositionsResult = await fetch(
        `${config.public.appServer}/propositions?gigId=${loadedGig.value?._id}`,
        authHeaders()
      );
      if (!propositionsResult.ok) {
        setAccessToken(null);
        throw new Error(`HTTP error! status: ${propositionsResult.status}`);
      }
      const propositionsResponse = await propositionsResult.json();
      console.log({ propositionsResponse, loadedGig: loadedGig.value });
      if (loadedGig.value)
        loadedGig.value.propositions = propositionsResponse.data;

      setSafeAccessToken(gigResponse.metadata?.accessToken);
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
      const result = await fetch(
        `${config.public.appServer}/gigs`,
        authHeaders()
      );

      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }
      const rawResponse = await result.json();

      setSafeAccessToken(rawResponse.metadata?.accessToken);
      console.log(rawResponse);
      data = rawResponse.data;
    } catch (err) {
      console.log(err);
      await refreshAccessToken();
    }
    console.log({ data });
    return data || [];
  }

  const isOwner = computed(() => {
    return loadedGig.value?.user._id === authStore.loggedUser?._id;
  });

  return { loadGig, loadedGig, isOwner, fetchGigs };
});
