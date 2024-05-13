<template>
  <div class="flex flex-col gap-4 w-full items-center">
    <gigs-cards-create-gig />

    <div v-if="loadedGigs.length !== 0" class="flex flex-col gap-4 max-w-96">
      <gigs-card
        v-for="(item, index) in loadedGigs"
        :key="index"
        :title="item.title"
        :description="item.description"
        :budget="item.budget"
        :created-at="item.createdAt"
        :contract-address="item.contractAddress"
        :_id="item._id"
        :preferred-technologies="item.preferredTechnologies"
        :type="item.type"
        @click:title="navigateTo(`/gigs/${item.title}`)"
      />
    </div>
    <span v-else>Empty list</span>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "default",
});

const gigStore = useGigStore();
const { loadedGigs } = storeToRefs(gigStore);

onBeforeMount(async () => {
  await gigStore.fetchGigs();
});
</script>
