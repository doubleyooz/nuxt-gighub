<template>
  <div class="flex flex-col py-8 px-20 gap-8">
    <span class="text-5xl leading-10">My proposals</span>

    <app-dropdown :title="`Active Proposals (${activeProposals.length})`">
      <template #content>
        <gigs-cards-proposal
          v-for="(item, index) in activeProposals"
          :key="index"
          :offer="item.budget"
          :days="item.deadline"
          :description="item.description"
          :status="item.status"
          :username="item.user?.name || 'username'"
          no-edit
          @click:proposal="
            $router.push(`/gigs/${gigStore.loadedGig?.title}/propositions`)
          "
        />
      </template>
    </app-dropdown>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "default",
});
const { loggedUser } = useAuthStore();
const gigStore = useGigStore();
const proposals = await gigStore.fetchProposals({ user: loggedUser?._id });

const activeProposals = computed(() =>
  proposals.filter((item) => item.status < 6 && item.status !== 1)
);
</script>
