<template>
  <div
    v-if="gigStore.loadedGig"
    class="grid grid-cols-3 gap-4 h-full px-6 pt-4 w-full"
  >
    <div class="col-span-2">
      <div class="flex text-3xl justify-between gap-2">
        <span class="font-semibold">{{ gigStore.loadedGig.title }}</span>
      </div>
      <span v-if="gigStore.loadedGig.createdAt" class="text-xs text-gray-500">{{
        gigStore.loadedGig.createdAt.getMinutes()
      }}</span>
      <div>
        <span
          >Budget: <strong>{{ gigStore.loadedGig.budget }}$</strong></span
        >
      </div>
      <span class="text-xl text-gray-800 text-ellipsis">{{
        gigStore.loadedGig.description
      }}</span>
      <div>Created by {{ gigStore.loadedGig.user.name }}</div>
    </div>
    <div class="col-span-1">
      <custom-button variant="blue" text="Bid" />
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "default",
});
const gigStore = useGigStore();

const route = useRoute();
onBeforeMount(async () => {
  await useAsyncData("gigDetails", () =>
    gigStore.loadGig(route.params?.title as string)
  );
});
</script>
