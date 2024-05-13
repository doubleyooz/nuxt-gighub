<template>
  <div v-if="selectedProposition" class="flex flex-col mx-4 gap-5">
    <gigs-cards-proposal
      :offer="selectedProposition.budget"
      :days="selectedProposition.deadline"
      :username="selectedProposition.user?.name || 'username'"
      :description="selectedProposition.description"
      :status="selectedProposition.status"
      :no-edit="!isFreelancer"
      expanded
    />

    <div
      v-if="gigStore.isOwner && selectedProposition"
      class="flex flex-col gap-3 w-full items-center justify-center"
    >
      <span>{{ statusText }}</span>
      <div v-if="canReject" class="flex flex-wrap justify-center gap-2">
        <pre>{{
          {
            status: selectedProposition?.status,
            bool: selectedProposition?.status === 4,
          }
        }}</pre>
        <app-button
          v-if="isHirerAction"
          text="Accept"
          :disabled="selectedProposition.status === 1"
          @click="acceptDealBindFreelancer"
        />

        <app-button text="Reject" variant="error" @click="rejectDeal" />
      </div>
    </div>
    <div
      v-else-if="selectedProposition.user?.name === authStore.loggedUser?.name"
      class="flex flex-col gap-3 w-full items-center justify-center"
    >
      <span> {{ statusText }}</span>
      <div class="flex flex-wrap gap-2 justify-center">
        <app-button
          v-if="!isHirerAction"
          :text="canReject ? 'Accept deal' : 'Im finished'"
          variant="success"
          @click="acceptDeal"
        />
        <app-button text="Cancel" variant="error" @click="cancelDeal" />
      </div>
    </div>

    <div v-if="otherGigs.length === 0">
      <span>It seems like this is the sole proposition for your project</span>
    </div>
    <gigs-cards-proposal
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
  <div v-else>
    da fuck
    <pre>{{ { loadedGig: gigStore.loadedGig } }}</pre>
  </div>
</template>

<script setup lang="ts">
import type { PROPOSAL_STATUS, Proposal } from "~/models/proposal.model";

definePageMeta({
  middleware: "auth",
  layout: "default",
});

const route = useRoute();

const authStore = useAuthStore();
const gigStore = useGigStore();
const { bindFreelancer } = useContracts();

const gigIndex = ref(parseInt(route.params.index as string) || 0);

onBeforeMount(async () => {
  console.log({ loadedGig: gigStore.loadedGig });
  if (!gigStore.loadedGig) {
    await gigStore.loadGig(route.params.title as string);
  }
});

const selectedProposition = computed<Proposal | undefined>(
  () => (gigStore.loadedGig?.propositions || [])[gigIndex.value]
);
const currentState = ref<PROPOSAL_STATUS>(
  selectedProposition.value?.status || 0
);

const canReject = computed(() => {
  switch (selectedProposition.value?.status) {
    case 0:
    case 2:
    case 3:
    case 4:
      return true;
    default:
      return false;
  }
});

const isHirerAction = computed(() => {
  switch (selectedProposition.value?.status) {
    case 0:
    case 2:
    case 4:
      return true;
    default:
      return false;
  }
});

const statusText = computed(() => {
  if (gigStore.isOwner) {
    switch (selectedProposition.value?.status) {
      case 0:
        return "Time to review the proposal";
      case 1:
        return "You rejected this proposal";
      case 2:
        return "Time to review the proposal";
      case 3:
        return "You selected this proposal, now we're waiting for the freelancer to confirm the deal";
      case 4:
        return "You selected this proposal and the freelancer confirmed it, now you need to seal the deal";
      case 5:
        return "Now it's on the freelancer";
      case 6:
        return "It's been fulfilled, how did you like it?";
      case 7:
        return "It's been cancelled, so sad";
      default:
        return "Time to review the proposal";
    }
  } else {
    switch (selectedProposition.value?.status) {
      case 0:
        return "We're still waiting for an answer";
      case 1:
        return "Your proposition was rejected, so sad";
      case 2:
        return "We're still waiting for an answer";
      case 3:
        return "You've been selected, now you need to confirm the deal";
      case 4:
        return "You've been selected, you accepted it now we're waiting for a final approval on the hirer's part";
      case 5:
        return "It's time to get your hands dirty";
      case 6:
        return "It's been fulfilled, how did you like it?";
      case 7:
        return "It's been cancelled, so sad";
      default:
        return "We're still waiting for an answer";
    }
  }
});

const isFreelancer = computed(
  () => selectedProposition.value?.user._id === authStore.loggedUser?._id
);

const acceptDealBindFreelancer = async () => {
  console.log("here");
  if (selectedProposition.value?.status === 4)
    await bindFreelancer(
      gigStore.loadedGig?.contractAddress,
      selectedProposition.value?.user?.wallet
    );
  acceptDeal();
};

const acceptDeal = () => {
  let state: PROPOSAL_STATUS | undefined;

  switch (selectedProposition.value?.status) {
    case 0:
      state = 3;
      break;

    case 2:
      state = 3;
      break;
    case 3:
      state = 4;
      break;
    case 4:
      state = 5;
      break;
    case 5:
      state = 6;
      break;

    default:
      break;
  }
  if (state) currentState.value = state;
};

const rejectDeal = async () => {
  currentState.value = 1;
};

const cancelDeal = async () => {
  currentState.value = 7;
};

const otherGigs = computed(
  () =>
    gigStore.loadedGig?.propositions.filter(
      (item, index) => gigIndex.value !== index
    ) || []
);

watch(currentState, async () => {
  if (!selectedProposition.value) return;
  selectedProposition.value.status = currentState.value;
  await gigStore.updatePropositionStatus(
    selectedProposition.value!._id,
    currentState.value
  );
});
</script>
