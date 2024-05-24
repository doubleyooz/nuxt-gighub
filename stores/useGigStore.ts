import { defineStore } from "pinia";
import { ref } from "vue";
import type { Gig } from "~/models/gig.model";
import type { PROPOSAL_STATUS, Proposal } from "~/models/proposal.model";

export interface LoadedGig extends Gig {
  propositions: Proposal[];
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
      console.log({ loadedGig: loadedGig.value });
      loadedGig.value = gigResponse.data[0];

      const proposalsResponse = await fetchApi(
        `propositions?gigId=${loadedGig.value?._id}`
      );

      console.log({ proposalsResponse, loadedGig: loadedGig.value });
      if (loadedGig.value)
        loadedGig.value.propositions = proposalsResponse.data;
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

  async function fetchGigs({
    user,
    active,
  }: {
    user?: string;
    active?: boolean;
  } = {}) {
    let data;
    let query = "";
    const activeFilter = typeof active === "boolean";
    if (user) {
      query += `?user=${user}`;
      query += activeFilter ? `&active=${active}` : "";
    } else if (activeFilter) query += `?active=${active}`;
    try {
      const result = await fetchApi(`gigs${query}`);

      data = result.data;
    } catch (err) {
      console.log(err);

      const token = useCookie("token");
      token.value = null;
    }
    loadedGigs.value = data;
    return loadedGigs.value;
  }

  async function fetchProposals({
    user,
    status,
  }: {
    user?: string;
    status?: PROPOSAL_STATUS;
  }) {
    let data: Proposal[] = [];
    let query = "";
    if (user) {
      query += `?user=${user}`;
      query += status ? `&status=${status}` : "";
    } else if (status) query += `?status=${status}`;
    try {
      const result = await fetchApi(`propositions${query}`);

      data = result.data;
    } catch (err) {
      console.log(err);

      const token = useCookie("token");
      token.value = null;
    }
    console.log(data);

    return data;
  }

  async function updatePropositionStatus(
    propositionId: string,
    status: PROPOSAL_STATUS
  ) {
    console.log({ propositionId, status });
    try {
      const propositionResponse = await fetchApi(
        `propositions/${propositionId}`,
        { method: "PUT", body: { status } }
      );
      console.log(propositionResponse);
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
    return loadedGig.value?.user?._id === authStore.loggedUser?._id;
  });

  return {
    loadGig,
    loadedGig,
    loadedGigs,
    isOwner,
    createGig,
    fetchGigs,
    updatePropositionStatus,
    fetchProposals,
  };
});
