<template>
  <div
    class="flex w-full gap-3"
    :class="[
      justifyBetween ? 'justify-between' : '',
      itemsCenter && !edit ? 'items-center' : 'items-start',
    ]"
  >
    <div
      v-if="edit && !noEdit"
      class="w-full"
      :class="[type === 'textarea' ? 'h-full' : '', bold ? 'font-bold' : '']"
    >
      <app-inputs-text-field
        v-model="thisValue"
        :name="name"
        :type="type"
        :placeholder="name"
        v-bind="valueProps"
        :value-styling="valueStyling"
      />
    </div>
    <div
      v-else
      class="text-ellipsis overflow-hidden text-nowrap"
      :class="[
        valueStyling,
        type === 'textarea' ? 'h-full' : '',
        bold ? 'font-bold' : '',
      ]"
    >
      <span v-if="finalText">{{ finalText }}</span>
      <span v-else class="text-slate-400">{{ emptyText }}</span>
    </div>
    <div v-if="!noEdit" class="flex flex-wrap gap-2 min-w-fit">
      <app-button
        :icon="edit ? 'mdi:check' : 'mdi:pen'"
        :variant="edit ? 'success' : 'primary'"
        pressed
        rounded
        outline
        @click="toggleEdit"
      />
      <app-button
        v-if="edit"
        icon="mdi:close"
        variant="error"
        pressed
        rounded
        outline
        @click="toggleEdit"
      />
    </div>
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

const toggleEdit = () => {
  edit.value = !edit.value;
};

watch(thisValue, () => {
  console.log(thisValue.value);
});
</script>
