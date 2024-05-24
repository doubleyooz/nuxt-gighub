<template>
  <div class="flex flex-col gap-4 w-full items-center">
    <div class="flex flex-col gap-4 max-w-96">
      <span class="text-xl leading-6 tracking-wide font-semibold"
        >Jobs you might like
      </span>
      <div v-if="filteredGigs.length !== 0">
        <gigs-card
          v-for="(item, index) in filteredGigs"
          :key="index"
          :title="item.title"
          :description="item.description"
          :budget="item.budget"
          :created-at="item.createdAt"
          :contract-address="item.contractAddress"
          :skills="item.skills"
          :type="item.type"
          :_id="item._id"
          @click:title="navigateTo(`/gigs/${item.title}`)"
        />
      </div>

      <span v-else>Empty list</span>
    </div>
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
  await gigStore.fetchGigs({ active: true });
});

const filteredGigs = computed(() =>
  (loadedGigs.value || []).filter(
    (gig) => gig.user?._id !== authStore.loggedUser?._id
  )
);
</script>
