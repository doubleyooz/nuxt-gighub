<template>
  <div class="flex flex-col" :class="extraClasses">
    <div v-if="label" class="flex mb-2 text-blue">
      <p v-if="required" class="mr-1 text-xs text-error-1">*</p>
      <p
        class="text-xs"
        :class="[disabled ? 'text-gray-300' : 'text-gray-800']"
      >
        {{ label }}
      </p>
    </div>

    <input
      :name="name"
      class="overflow-hidden overflow-ellipsis border-2 font-normal text-base"
      :class="[errorMessage ? 'border-error-1 color-error-1' : '']"
      type="text"
      :value="value"
      :disabled="disabled"
      :required="required"
    />
    <span v-if="errorMessage" class="text-error-1 text-[10px]">{{
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
  label?: string;
  required?: boolean;
  // info?: string;
  disabled?: boolean;
  schema?: YupSchema;
  extraClasses?: string;
}

const props = withDefaults(defineProps<TextFieldProps>(), {
  // info: undefined,
  label: undefined,
  modelValue: undefined,
  schema: undefined,
  extraClasses: undefined,
});

const { value, errorMessage } = useField(() => props.name, props.schema, {
  syncVModel: true,
});
</script>
