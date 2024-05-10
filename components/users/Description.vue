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
      :class="[
        valueStyling,
        type === 'textarea' ? 'h-full' : '',
        bold ? 'font-bold' : '',
      ]"
    >
      <app-inputs-text-field
        v-model="thisValue"
        :name="name"
        :type="type"
        :placeholder="name"
        :schema="schema"
        v-bind="valueProps"
      />
    </div>
    <div
      v-else
      :class="[
        valueStyling,
        type === 'textarea' ? 'h-full' : '',
        bold ? 'font-bold' : '',
      ]"
    >
      <span v-if="value">{{ finalText }}</span>
      <span v-else class="text-slate-400">{{ emptyText }}</span>
    </div>
    <app-button
      v-if="!noEdit"
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
import type { AnyObject, NumberSchema, StringSchema } from "yup";
import type { TextFieldType } from "../app/inputs/TextField.vue";

export interface UserDescriptionComponentType {
  value?: string | number;
  emptyText?: string;
  appendText?: string;
  prependText?: string;
  valueStyling?: string;
  name?: string;
  bold?: boolean;
  type?: TextFieldType;
  justifyBetween?: boolean;
  itemsCenter?: boolean;
  noEdit?: boolean;
  schema?:
    | StringSchema<string | undefined, AnyObject, undefined, "">
    | NumberSchema<number | undefined, AnyObject, undefined, "">;
}

const props = withDefaults(defineProps<UserDescriptionComponentType>(), {
  appendText: "",
  prependText: "",
  valueStyling: "",
  value: "text",
  name: "value",
  type: "text",
  emptyText: undefined,
  schema: undefined,
});

const edit = ref(false);

const { controlledValues, handleSubmit, defineField, errors } = useForm({
  validationSchema: props.schema,
  initialValues: { [props.name]: props.value },
});

const [thisValue, valueProps] = defineField(props.name);

const finalText = computed(() =>
  props.prependText.concat(thisValue.value?.toString(), props.appendText)
);

watch(thisValue, () => {
  console.log(thisValue.value);
});
</script>
