<template>
  <div
    class="flex rounded-xl w-min px-3 py-1 gap-1 items-center"
    :class="[
      clickable ? 'cursor-pointer' : '',
      variant ?? '',
      outline ? '' : '!border-0',
      isHidden ? 'hidden' : '',
      variants[variant],
      disabled ? '' : '!border-gray-300 !bg-gray-100',
    ]"
    @click="emit('click:chip')"
  >
    <span class="text-xs"> {{ text }} </span>
    <button v-if="closeable" class="cursor-pointer mb-0.5" @click="handleClick">
      <Icon name="mdi:close" color="black" />
    </button>
  </div>
</template>

<script setup lang="ts">
export type Variant =
  | "warning"
  | "success"
  | "error"
  | "blue"
  | "grey"
  | "dark"
  | "primary"
  | "secondary";

export interface ChipComponentType {
  text: string;
  variant?: Variant;
  outline?: boolean;
  closeable?: boolean;
  clickable?: boolean;
  disabled?: boolean;
}
const emit = defineEmits(["click:close", "click:chip"]);

withDefaults(defineProps<ChipComponentType>(), { variant: "primary" });

const isHidden = ref(false);

const handleClick = () => {
  isHidden.value = true;
  emit("click:close");
};

const variants: Record<Variant, string> = {
  blue: "bg-info--2 color-secondary-2 border border-secondary-2",
  grey: "bg-gray-100 color-gray-600 border border-gray-600",
  error: "bg-error--2 color-error-2 border border-error-2 ",
  success: "bg-success--2 color-success-2 border border-success-2",
  warning: "bg-warning--2 color-warning-2 border border-warning-2",
  dark: "bg-primary color-white border border-white",
  secondary:
    "bg-gray-blue color-gray-600 border border-gray-600 [&.clickable]:hover:bg-gray-100 [&.clickable]:hover:color-secondary-2 active:bg-gray-900 active:color-white active:hover:bg-gray-600",
  primary:
    "bg-secondary--2 color-info-2 border border-info-2 [&.clickable]:hover:color-secondary-2 active:bg-secondary-0 active:color-white active:hover:bg-[#47d9eb] active:border-secondary-0",
};
</script>

<style scoped lang="scss"></style>
