<template>
  <div v-if="gigStore.loadedGig" class="grid grid-cols-3 gap-4 h-full px-6 pt-4 w-full">
    <div class="col-span-2">
      <gigs-forms-gig v-if="isEditing" v-model:title="gigStore.loadedGig.title"
        v-model:description="gigStore.loadedGig.description" v-model:budget="gigStore.loadedGig.budget"
        header-title="Update Gig" submit-button-text="Update Gig" :loading="gigStore.loading"/>
      <div v-else class="col-span-2">
        <app-inputs-editable-text-field :value="gigStore.loadedGig.title" type="text" name="description"
          valueStyling="text-3xl  font-semibold" justify-between empty-text="No title was added"
          @click:save="(value) => { }
            " />
        <span v-if="gigStore.loadedGig.createdAt" class="text-xs text-gray-500">{{
          gigStore.loadedGig.createdAt.getMinutes()
        }}</span>
        <div>
          <span>Budget: <strong>{{ gigStore.loadedGig.budget }}$</strong></span>
        </div>
        <span class="text-xl text-gray-800 text-ellipsis">{{
          gigStore.loadedGig.description
        }}</span>
        <div>Created by {{ gigStore.loadedGig.user?.name }}</div>
      </div>
    </div>
    <div class="col-span-1 border-l-2 pl-2">
      <app-button v-if="gigStore.isOwner" variant="blue" :text="'Edit'" @click="isEditing = !isEditing" />
      <gigs-cards-create-proposition v-else-if="authStore.loggedUser && !propositionAlreadySent"
        :gig-id="gigStore.loadedGig._id" :user-id="authStore.loggedUser._id" />

      <div v-if="gigStore.loadedGig.propositions.length !== 0">
        <gigs-cards-proposal v-for="(item, index) in gigStore.loadedGig.propositions" :key="index" :offer="item.budget"
          :days="item.deadline" :description="item.description" :status="item.status"
          :username="item.user?.name || 'username'" no-edit @click:proposal="
            $router.push(`/gigs/${gigStore.loadedGig?.title}/propositions`)
            " />
      </div>
      <div v-else>
        <span v-if="gigStore.isOwner">
          There are no proposals as for now, keep waiting!
        </span>
        <span v-else>It's a gold mine, you're can be the first one to dig it!</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "default",
});
const gigStore = useGigStore();
const authStore = useAuthStore();


const route = useRoute();
onBeforeMount(async () => {
  await useAsyncData("gigDetails", () =>
    gigStore.loadGig(route.params?.title as string)
  );
});

const isEditing = ref(false);

const propositionAlreadySent = computed(() =>
  (gigStore.loadedGig?.propositions || []).some(
    (item) => item.user?._id === authStore.loggedUser?._id
  )
);
</script>
