<template>
  <div class="flex flex-col gap-4 w-full items-center">
    <gigs-forms-gig header-title="Create new Gig" submit-button-text="Create Gig" :loading="loading" @click:submit="handleCreateGig"/>

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
import type { Gig } from '~/models/gig.model';

definePageMeta({
  middleware: "auth",
  layout: "default",
});


const gigStore = useGigStore();
const { loadedGigs } = storeToRefs(gigStore);

const { createGigContract, loading } = useContracts();
const { createGig } = useGigStore();

const handleCreateGig = async (values: Gig) => {
  try {
      const contract = await createGigContract(values.budget);
      if (contract)
        await createGig({
          ...values,
          type: "das",
          contractAddress: contract.target as string,
          skills: generateRandomTechnologies(),
        });
    } catch (err) {
      console.log(err);
    }
}

onBeforeMount(async () => {
  await gigStore.fetchGigs();
});

function generateRandomTechnologies() {
    const sampleTechnologies = [
      "JavaScript",
      "React",
      "Node.js",
      "HTML",
      "CSS",
      "Python",
      "Vue.js",
      "Angular",
      "Java",
      "Swift",
      "Ruby",
      "PHP",
      "Express.js",
      "Django",
      "Spring",
      "Laravel",
      "Bootstrap",
    ];
    const randomTechnologies = [];
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * sampleTechnologies.length);
      randomTechnologies.push(sampleTechnologies[randomIndex]);
    }
    return randomTechnologies;
  }
</script>
