<template>
  <app-card title="new Gig">
    <template #content>
      <div class="flex flex-col gap-2 mb-4">
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
import { useForm } from "vee-validate";
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

const submit = handleSubmit(async (values) => {
  console.log(values);
  const rawResponse = await fetch(`${config.public.appServer}/gigs`, {
    method: "POST",
    ...authHeaders(),
    credentials: "include",
    body: JSON.stringify({
      ...values,
      type: "das",
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
