<template>
  <div v-if="loadedGigs" class="flex flex-col gap-4 w-full items-center">
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
        :skills="item.skills"
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

const authStore = useAuthStore();
const gigStore = useGigStore();
const { loadedGigs } = storeToRefs(gigStore);

onBeforeMount(async () => {
  if (authStore.loggedUser)
    await gigStore.fetchGigs({ user: authStore.loggedUser._id });
});
</script>
