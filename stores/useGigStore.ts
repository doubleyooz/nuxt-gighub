import { defineStore } from "pinia";
import { ref } from "vue";
import type { Gig } from "~/models/gig.model";

export const useGigStore = defineStore("gig", () => {
  const loadedGig = ref<Gig>();
  const loading = ref(true);
  const config = useRuntimeConfig();

  const { authHeaders, setAccessToken, refreshAccessToken } = useAccessToken(
    config.public.appServer
  );

  async function loadGig(title: string) {
    if (loadedGig.value?.title === title) return;

    loading.value = true;
    try {
      const result = await fetch(
        `${config.public.appServer}/gigs?title=${title}`,
        authHeaders()
      );
      const rawResponse = await result.json();
      loadedGig.value = rawResponse.data[0];

      setAccessToken(rawResponse.metadata?.accessToken);
      console.log({ result: loadedGig.value });
    } catch (err) {
      console.log(err);

      const token = useCookie("token");
      token.value = null;
    } finally {
      loading.value = false;
    }

    console.log({ result: loadedGig.value });
  }

  async function fetchGigs() {
    const {
      data: fetchedGigs,
      pending,
      error,
      refresh,
    } = await useFetch<{ data: Gig[]; metadata?: { accessToken: string } }>(
      `${config.public.appServer}/gigs`,
      {
        headers: authHeaders().headers,
      }
    );

    if (error.value) await refreshAccessToken();
    console.log(error.value);
    setAccessToken(fetchedGigs.value?.metadata?.accessToken);

    return fetchedGigs.value?.data || [];
  }

  return { loadGig, loadedGig, fetchGigs };
});
