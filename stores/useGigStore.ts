import { defineStore } from "pinia";
import { ref } from "vue";
import type { Gig } from "~/models/gig.model";
import type { User } from "~/models/user.model";

export interface LoadedGig extends Gig {
  user: User;
}

export const useGigStore = defineStore("gig", () => {
  const loadedGig = ref<LoadedGig>();
  const loading = ref(true);
  const config = useRuntimeConfig();

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
      const result = await fetch(
        `${config.public.appServer}/gigs?title=${title}`,
        authHeaders()
      );

      if (!result.ok) {
        setAccessToken(null);
        throw new Error(`HTTP error! status: ${result.status}`);
      }
      const rawResponse = await result.json();
      loadedGig.value = rawResponse.data[0];

      setSafeAccessToken(rawResponse.metadata?.accessToken);

      const userResult = await fetch(
        `${config.public.appServer}/users/${rawResponse.data[0].userId}`,
        authHeaders()
      );
      if (!userResult.ok) {
        setAccessToken(null);
        throw new Error(`HTTP error! status: ${userResult.status}`);
      }
      const rawResponse2 = await userResult.json();
      console.log({ rawResponse2, loadedGig: loadedGig.value });
      if (loadedGig.value) loadedGig.value.user = rawResponse2.data;

      setSafeAccessToken(rawResponse.metadata?.accessToken);
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

  return { loadGig, loadedGig, fetchGigs };
});
