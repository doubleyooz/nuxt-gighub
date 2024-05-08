<template>
  <div v-if="selectedProposition" class="flex flex-col mx-4 gap-5">
    <gigs-cards-proposition
      :offer="selectedProposition.budget"
      :days="selectedProposition.deadline"
      :username="selectedProposition.user?.name || 'username'"
      :description="selectedProposition.description"
      :rejected="selectedProposition.rejected"
      expanded
    />
    <div
      v-if="isOwner && selectedProposition"
      class="flex gap-3 w-full justify-center"
    >
      <app-button text="Accept" :disabled="selectedProposition.rejected" />
      <app-button
        text="Reject"
        variant="error"
        @click="rejectProposition(selectedProposition!._id)"
      />
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
      :rejected="selectedProposition.rejected"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "default",
});

const route = useRoute();

const { loadedGig, loadGig, isOwner, rejectProposition } = useGigStore();
const gigIndex = ref(parseInt(route.params.index as string) || 0);

onBeforeMount(async () => {
  if (!loadedGig) {
    await loadGig(route.params.title as string);
  }
});

const selectedProposition = computed(
  () => loadedGig?.propositions[gigIndex.value]
);

const otherGigs = computed(
  () =>
    loadedGig?.propositions.filter((item, index) => gigIndex.value !== index) ||
    []
);
</script>
