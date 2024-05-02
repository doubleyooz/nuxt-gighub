<template>
  <div class="flex flex-col gap-4 w-full items-center">
    <gigs-cards-create-gig />

    <div v-if="data.length !== 0" class="flex flex-col gap-4 max-w-96">
      <gigs-card
        v-for="(item, index) in data"
        :key="index"
        :title="item.title"
        :description="item.description"
        :budget="item.budget"
        :created-at="item.createdAt"
        :preferred-technologies="item.preferredTechnologies"
        :type="item.type"
        @open="navigateTo(`/gigs/${item.title}`)"
      />
    </div>
    <span v-else>Empty list</span>
  </div>
</template>

<script setup lang="ts">
import type { Gig } from "~/models/gig.model";

definePageMeta({
  middleware: "auth",
  layout: "default",
});

const config = useRuntimeConfig();

const { refreshAccessToken, setAccessToken } = useAccessToken(
  config.public.appServer
);

const gigStore = useGigStore();
const data = ref<Gig[]>([]);
// Function to generate a random set of preferred technologies
onBeforeMount(async () => {
  try {
    data.value = await gigStore.fetchGigs();
  } catch (err) {
    setAccessToken(null);
  }
});
</script>
