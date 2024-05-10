import { defineStore } from "pinia";
import { ref } from "vue";
import type { Gig } from "~/models/gig.model";
import type {
  PROPOSITION_STATUS,
  Proposition,
} from "~/models/proposition.model";
import type { User } from "~/models/user.model";

export interface LoadedGig extends Gig {
  user: User;
  propositions: Proposition[];
}

export const useGigStore = defineStore("gig", () => {
  const loadedGig = ref<LoadedGig>();
  const loadedGigs = ref<LoadedGig[]>([]);
  const loading = ref(true);
  const config = useRuntimeConfig();
  const authStore = useAuthStore();

  const { fetchApi } = useAccessToken(config.public.appServer);

  async function loadGig(title: string) {
    if (loadedGig.value?.title === title) return;

    loading.value = true;
    try {
      const gigResponse = await fetchApi(`gigs?title=${title}`);

      loadedGig.value = gigResponse.data[0];

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

  async function createGig(gig: Gig) {
    const rawResponse = await fetchApi(`gigs`, {
      method: "POST",
      body: {
        ...gig,
      },
    });

    loadedGigs.value.push(rawResponse.data);
    return rawResponse.data;
  }

  async function fetchGigs() {
    let data;
    try {
      const result = await fetchApi(`gigs`);

      data = result.data;
    } catch (err) {
      console.log(err);

      const token = useCookie("token");
      token.value = null;
    }

    loadedGigs.value = data;
    return loadedGigs.value;
  }

  async function updatePropositionStatus(
    propositionId: string,
    status: PROPOSITION_STATUS
  ) {
    try {
      const propositionResponse = await fetchApi(
        `propositions/${propositionId}`,
        { method: "PUT", body: { status } }
      );
      if (!loadedGig.value) return;

      const propositionIndex = loadedGig.value.propositions.findIndex(
        (item) => item._id === propositionId
      );
      loadedGig.value.propositions[propositionIndex].status =
        propositionResponse.data.status;
    } catch (err) {
      console.log(err);
    }
  }

  const isOwner = computed(() => {
    return loadedGig.value?.user._id === authStore.loggedUser?._id;
  });

  return {
    loadGig,
    loadedGig,
    loadedGigs,
    isOwner,
    createGig,
    fetchGigs,
    updatePropositionStatus,
  };
});
