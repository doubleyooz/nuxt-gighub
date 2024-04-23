<template>
  <div class="flex flex-col" :class="extraClasses">
    <div v-if="label" class="flex mb-2 text-blue">
      <p v-if="required" class="mr-1 text-xs text-error-600">*</p>
      <p
        class="text-sm font-semibold"
        :class="[disabled ? 'text-gray-300' : 'text-gray-800']"
      >
        {{ label }}
      </p>
    </div>

    <input
      v-model="value"
      :name="name"
      class="overflow-hidden overflow-ellipsis px-3 py-2 outline outline-2 font-normal text-base rounded-lg placeholder:text-gray-300 placeholder:text-base"
      :class="[
        errorMessage
          ? 'outline-error-600 color-error-600'
          : 'outline-gray-400 focus:outline-gray-700',
      ]"
      type="text"
      :placeholder="placeholder ?? name"
      :disabled="disabled"
      :required="required"
      v-bind="$attrs"
      @change="emit('is:valid', !errorMessage)"
    />

    <span v-if="!noErrors" class="mt-1 text-error-500 h-3 text-[10px]">{{
      errorMessage
    }}</span>
  </div>
</template>
<script setup lang="ts">
import type { YupSchema } from "vee-validate";
import { useField } from "vee-validate";

interface TextFieldProps {
  modelValue?: string | number | boolean | unknown[] | any;
  name: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  size?: Size;
  disabled?: boolean;
  schema?: YupSchema;
  noErrors?: boolean;
  extraClasses?: string;
}

const props = withDefaults(defineProps<TextFieldProps>(), {
  // info: undefined,
  label: undefined,
  modelValue: undefined,
  schema: undefined,
  size: "medium",
  extraClasses: undefined,
  placeholder: undefined,
});

const emit = defineEmits(["is:valid"]);

const sizeHeightPadding = () => {
  let height;
  switch (props.size) {
    case "x-small":
      height = "max-h-7";
      break;
    case "small":
      height = "max-h-8";
      break;
    case "medium":
      height = "max-h-9";
      break;
    case "large":
      height = "max-h-10";
      break;
    default:
      height = "max-h-9";
      break;
  }
  return height;
};

const { value, errorMessage } = useField(() => props.name, props.schema, {
  syncVModel: true,
});

watch(errorMessage, (prev) => {
  emit("is:valid", !prev);
});
</script>
