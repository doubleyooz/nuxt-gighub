<template>
  <app-card title="new Gig">
    <template #content>
      <div class="flex flex-col gap-2 mb-4">
        <app-inputs-text-field
          v-model="title"
          v-bind="titleProps"
          label="Title"
          name="title"
        />
        <app-inputs-text-field
          v-model="description"
          label="Description"
          name="description"
          v-bind="descriptionProps"
        />

        <app-inputs-text-field
          v-model="budget"
          label="Budget"
          name="budget"
          type="number"
          v-bind="budgetProps"
        />
      </div>

      <app-button
        class="w-full"
        text="Create new Gig"
        :disabled="disableButton"
        @click="submit"
      />
    </template>
  </app-card>
</template>

<script setup lang="ts">
import { ethers } from "ethers";
import { useForm } from "vee-validate";
import Freelancing from "@/build/contracts/Freelancing.json";

import type { Gig } from "~/models/gig.model";
const config = useRuntimeConfig();

const { authHeaders } = useAccessToken(config.public.appServer);
const { gigSchema } = useFormRules();

const { controlledValues, handleSubmit, defineField, errors } = useForm<Gig>({
  validationSchema: gigSchema,
});

const [title, titleProps] = defineField("title");
const [description, descriptionProps] = defineField("description");
const [budget, budgetProps] = defineField("budget");
const usdToEth = (usdAmount: number) => {
  const ethExchangeRate = 3000;
  return usdAmount / ethExchangeRate;
};
const submit = handleSubmit(async (values) => {
  console.log(values);

  const provider = new ethers.JsonRpcProvider("http://localhost:7545");

  const wallet = new ethers.Wallet(
    "0x2ce0e6e5c20af3db102ce997de705422a93b46a453aae891d9d03c8a216649c9",
    provider
  );
  const contractABI = Freelancing.abi;
  const contractBinary = Freelancing.bytecode;
  const contractFactory = new ethers.ContractFactory(
    contractABI,
    contractBinary,
    wallet
  );
  console.log({ contractFactory });
  const unlockTime = Math.floor(Date.now() / 1000) + 600;
  const budgetInWei = ethers.parseEther(usdToEth(budget.value).toString());

  const contract = await contractFactory.deploy(unlockTime, {
    value: budgetInWei,
  });
  console.log({ contract });

  const rawResponse = await fetch(`${config.public.appServer}/gigs`, {
    method: "POST",
    ...authHeaders(),
    credentials: "include",
    body: JSON.stringify({
      ...values,
      type: "das",
      contractAddress: contract.target,
      preferredTechnologies: generateRandomTechnologies(),
      active: true,
    }),
  });

  const content = await rawResponse.json();

  console.log(content);
});

const disableButton = computed(
  () =>
    [title.value, description.value, budget.value].some(
      (v) => v === undefined
    ) || Object.keys(errors.value).length !== 0
);

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
