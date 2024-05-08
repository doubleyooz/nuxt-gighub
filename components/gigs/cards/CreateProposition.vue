<template>
  <app-card title="New Proposition">
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

        <app-inputs-text-field
          v-model="deadline"
          label="Deadline"
          name="deadline"
          type="number"
          v-bind="deadlineProps"
        />
      </div>

      <app-button
        class="w-full"
        text="Create New Proposition"
        :disabled="disableButton"
        @click="submit"
      />
    </template>
  </app-card>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import type { Proposition } from "~/models/proposition.model";

const config = useRuntimeConfig();

export interface CreatePropositionComponentType {
  gigId: string;
  userId: string;
}

const props = withDefaults(defineProps<CreatePropositionComponentType>(), {});

const { authHeaders } = useAccessToken(config.public.appServer);
const { propositionSchema } = useFormRules();

const { controlledValues, handleSubmit, defineField, errors } =
  useForm<Proposition>({
    validationSchema: propositionSchema,
  });

const [deadline, deadlineProps] = defineField("deadline");
const [description, descriptionProps] = defineField("description");
const [budget, budgetProps] = defineField("budget");

const submit = handleSubmit(async (values) => {
  console.log(values);
  const rawResponse = await fetch(
    `${config.public.appServer}/gigs/${props.gigId}`,
    {
      method: "POST",
      ...authHeaders(),
      credentials: "include",
      body: JSON.stringify({
        ...values,
        gig: props.gigId,
        user: props.userId,
      }),
    }
  );

  const content = await rawResponse.json();

  console.log(content);
});

const disableButton = computed(
  () =>
    [deadline.value, description.value, budget.value].some(
      (v) => v === undefined
    ) || Object.keys(errors.value).length !== 0
);
</script>
