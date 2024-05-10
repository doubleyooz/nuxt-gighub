<template>
  <div v-if="selectedProposition" class="flex flex-col mx-4 gap-5">
    <gigs-cards-proposition
      :offer="selectedProposition.budget"
      :days="selectedProposition.deadline"
      :username="selectedProposition.user?.name || 'username'"
      :description="selectedProposition.description"
      :status="selectedProposition.status"
      expanded
    />

    <div
      v-if="isOwner && selectedProposition"
      class="flex gap-3 w-full justify-center"
    >
      <app-button
        text="Accept"
        :disabled="selectedProposition.status === 1"
        @click="updatePropositionStatus(selectedProposition!._id, 2)"
      />
      <app-button
        text="Reject"
        variant="error"
        @click="updatePropositionStatus(selectedProposition!._id, 1)"
      />
    </div>
    <div
      v-else-if="selectedProposition.user?.name === authStore.loggedUser?.name"
    >
      <span> {{ statusText }}</span>
      <app-button text="Accept deal" variant="success" @click="acceptDeal" />
    </div>

    <div v-if="otherGigs.length === 0">
      <span>It seems like this is the sole proposition for your project</span>
    </div>
    <gigs-cards-proposition
      v-for="(item, index) in otherGigs"
      v-else
      :key="index"
      :offer="item.budget"
      :days="item.deadline"
      :username="item.user?.name || 'username'"
      :description="item.description"
      :status="item.status"
    />
  </div>
</template>

<script setup lang="ts">
import type { Proposition } from "~/models/proposition.model";

definePageMeta({
  middleware: "auth",
  layout: "default",
});

const authStore = useAuthStore();
const route = useRoute();

const { loadedGig, loadGig, isOwner, updatePropositionStatus } = useGigStore();
const gigIndex = ref(parseInt(route.params.index as string) || 0);

onBeforeMount(async () => {
  console.log(loadedGig);
  if (!loadedGig) {
    await loadGig(route.params.title as string);
  }
});

const selectedProposition = computed<Proposition | undefined>(
  () => loadedGig?.propositions[gigIndex.value]
);

const statusText = computed(() => {
  switch (selectedProposition.value?.status) {
    case 0:
      return "We're still waiting for an answer";
    case 1:
      return "Your proposition was rejected, so sad";
    case 2:
      return "You've been selected, now you need to confirm the deal";
    case 3:
      return "It's time to get your hands dirty";
    default:
      return "We're still waiting for an answer";
  }
});

const acceptDeal = async () => {
  await updatePropositionStatus(selectedProposition.value!._id, 3);
};

const otherGigs = computed(
  () =>
    loadedGig?.propositions.filter((item, index) => gigIndex.value !== index) ||
    []
);
</script>
