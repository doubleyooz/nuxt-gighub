<template>
  <div class="flex flex-col">
    <label v-if="label" class="flex mb-2 text-blue">
      <p v-if="required" class="mr-1 text-xs text-error-600">*</p>
      <p
        class="text-sm font-semibold"
        :class="[disabled ? 'text-gray-300' : 'text-gray-800']"
      >
        {{ label }}
      </p>
    </label>

    <component
      :is="variant ? 'input' : 'textarea'"
      :id="name"
      v-model="modelValue"
      :name="name"
      class="overflow-hidden overflow-ellipsis font-normal rounded-lg placeholder:text-gray-300 placeholder:text-base"
      :class="[valueStyling, inputClasses]"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder ?? name"
      :disabled="disabled"
      :required="required"
      v-bind="$attrs"
      :aria-describedby="errorMessage ? `${name}-error` : null"
      @input="updateValue"
    />
    <span
      v-if="!noErrors"
      :id="`${name}-error`"
      class="mt-1 text-error-500 h-3 text-[10px]"
      >{{ errorMessage }}</span
    >
  </div>
</template>
<script setup lang="ts">
export type TextFieldType = "text" | "textarea" | "number" | "password";

export interface TextFieldProps {
  name: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  modelValue: string | number;
  outline?: boolean;
  errorMessage?: string;
  type?: TextFieldType;
  disabled?: boolean;
  noErrors?: boolean;
  valueStyling?: string;
  noPadding?: boolean;
}

const props = withDefaults(defineProps<TextFieldProps>(), {
  label: undefined,
  schema: undefined,
  errorMessage: undefined,
  type: "text",
  valueStyling: undefined,
  placeholder: undefined,
});

const emit = defineEmits(["update:modelValue"]);

const { modelValue } = toRefs(props);

const variant = computed(() =>
  ["text", "number", "password"].includes(props.type)
);

const inputClasses = computed(() => [
  "overflow-hidden overflow-ellipsis font-normal rounded-lg placeholder:text-gray-300 placeholder:text-base",
  props.outline ? "outline outline-2" : "",
  props.errorMessage
    ? "outline-error-600 color-error-600"
    : "outline-gray-400 focus:outline-gray-700",
  props.noPadding ? "p-0" : "px-3 py-2",
]);

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>
