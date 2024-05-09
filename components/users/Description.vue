<template>
  <div
    class="flex w-full gap-3"
    :class="[
      justifyBetween ? 'justify-between' : '',
      itemsCenter ? 'items-center' : 'items-start',
    ]"
  >
    <div
      v-if="edit && !noEdit"
      class="w-full"
      :class="type === 'textarea' ? 'h-full' : ''"
    >
      <app-inputs-text-field
        v-model="description"
        name="description"
        :type="type"
        v-bind="descriptionProps"
      />
    </div>
    <div v-else>
      <span v-if="text">{{ text }}</span>
      <span v-else class="text-slate-400">{{ emptyText }}</span>
    </div>
    <app-button
      icon="mdi:pen"
      variant="primary"
      pressed
      rounded
      outline
      @click="edit = !edit"
    />
  </div>
</template>
<script setup lang="ts">
import { useForm } from "vee-validate";
import type { TextFieldType } from "../app/inputs/TextField.vue";

export interface UserDescriptionComponentType {
  text?: string;
  emptyText?: string;
  type?: TextFieldType;
  justifyBetween?: boolean;
  itemsCenter?: boolean;
  noEdit?: boolean;
}

const { descriptionRules } = useFormRules();

const props = withDefaults(defineProps<UserDescriptionComponentType>(), {
  text: undefined,
  type: "text",
  emptyText: undefined,
});

const edit = ref(false);

const { controlledValues, handleSubmit, defineField, errors } = useForm({
  validationSchema: descriptionRules,
  initialValues: { description: props.text },
});

const [description, descriptionProps] = defineField("description");
</script>
