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

    <app-buttons-edit
      v-if="!noEdit && inlineEdit"
      @click:editing="toggleEdit"
      @click:save="saveEdit"
      @click:cancel="cancelEdit"
    />
  </div>
</template>
<script setup lang="ts">
import { useForm } from "vee-validate";
import type { AnyObject, NumberSchema, StringSchema } from "yup";
import type { TextFieldProps } from "./TextField.vue";

export interface UserDescriptionComponentType
  extends Omit<TextFieldProps, "modelValue"> {
  value?: string | number;
  emptyText?: string;
  appendText?: string;
  prependText?: string;
  valueStyling?: string;
  bold?: boolean;
  justifyBetween?: boolean;
  itemsCenter?: boolean;
  noEdit?: boolean;
  isEditing?: boolean;
  inlineEdit?: boolean;
  schema?:
    | StringSchema<string | undefined, AnyObject, undefined, "">
    | NumberSchema<number | undefined, AnyObject, undefined, "">;
}

const props = withDefaults(defineProps<UserDescriptionComponentType>(), {
  appendText: "",
  prependText: "",
  valueStyling: "",
  value: "text",
  type: "text",
  emptyText: undefined,
  schema: undefined,
});

const emit = defineEmits(["click:save", "click:cancel"]);

const { isEditing } = toRefs(props);
const edit = ref(props.isEditing);

const { controlledValues, handleSubmit, defineField, errors } = useForm({
  validationSchema: props.schema,
  initialValues: { [props.name]: props.value },
});
const originalValue = ref(props.value);
const [thisValue, valueProps] = defineField(props.name);

const finalText = computed(() =>
  props.prependText.concat(thisValue.value?.toString(), props.appendText)
);

const toggleEdit = () => {
  edit.value = !edit.value;
};

const saveEdit = () => {
  if (edit.value) {
    originalValue.value = thisValue.value;
    emit("click:save", thisValue.value);
  }

  toggleEdit();
};

const cancelEdit = () => {
  toggleEdit();
  thisValue.value = originalValue.value;
  emit("click:cancel");
};

watch(thisValue, () => {
  console.log(thisValue.value);
});

watch(isEditing, () => {
  edit.value = props.isEditing;
});
</script>
