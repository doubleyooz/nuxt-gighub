<template>
  <button
    class="group flex w-100 items-center gap-1"
    :class="[
      outline ? '' : '!border-0',
      `!color`,
      sizeHeightPadding(),
      rounded ? 'rounded-full' : 'rounded-lg',
      disabled
        ? `${disabledVariants[variant]} pointer-events-none`
        : variants[variant],
    ]"
    :disabled="disabled"
  >
    <Icon v-if="prependIcon" :name="prependIcon" />
    <Icon v-if="icon" :name="icon" />
    <span v-else class="font-semibold mb-0.5"> {{ text }}</span>
    <Icon v-if="appendIcon" :name="appendIcon" />
  </button>
</template>
<script setup lang="ts">
export interface ButtonComponentType {
  text?: string;
  disabled?: boolean;
  outline?: boolean;
  rounded?: boolean;
  color?: string;
  variant?: Variant;
  size?: Size;
  prependIcon?: string;
  appendIcon?: string;
  icon?: string;
}
const props = withDefaults(defineProps<ButtonComponentType>(), {
  variant: "primary",
  size: "medium",
  color: undefined,
  prependIcon: undefined,
  appendIcon: undefined,
  icon: undefined,
  text: undefined,
});

const sizeHeightPadding = () => {
  let padding = props.rounded ? "p-2" : "px-3";
  let height;
  switch (props.size) {
    case "x-small":
      height = "h-6";
      break;
    case "small":
      height = "h-7";
      break;
    case "medium":
      height = "h-9";
      break;
    case "large":
      height = "h-11";
      padding = props.rounded ? "p-2" : "px-4";
      break;
    default:
      height = "h-9";
      break;
  }
  return `${height} ${padding}`;
};

const variants: Record<Variant, string> = {
  blue: `bg-info text-white border border-secondary-700 hover:bg-info-600 active:bg-info-700`,
  grey: `bg-gray-100 text-gray-600 border border-gray-600 hover:bg-gray-200 active:bg-gray-300`,
  error: `bg-error text-white border border-error-700 hover:bg-error-600 active:bg-error-700`,
  text: "text-gray-600 hover:bg-gray-200 active:bg-gray-300`",
  success: `bg-success text-white border border-success-700 hover:bg-success-600 active:bg-success-700`,
  warning: `bg-warning text-white border border-warning-700 hover:bg-warning-600 active:bg-warning-700`,
  dark: `bg-primary text-white border border-white hover:bg-primary-600 active:bg-primary-700`,
  secondary: `bg-gray-blue text-gray-600 border border-gray-600 hover:bg-gray-blue-100 active:bg-gray-blue-200 active:text-gray-500`,
  primary: `bg-secondary text-white border border-secondary-700 hover:bg-secondary-600 active:bg-secondary-700 active:color-white active:border-secondary`,
};

const disabledVariants: Record<Variant, string> = {
  blue: `bg-info-300 text-gray-400 border`,
  grey: `bg-gray-50 text-gray-400 border`,
  error: `bg-error-300 text-gray-400 border`,
  text: "text-gray-300",
  success: `bg-success-300 text-gray-400 border`,
  warning: `bg-warning-300 text-gray-400 border`,
  dark: `bg-gray-700 text-gray-600 border border-white`,
  secondary: `bg-gray-blue-50 text-gray-300 border border-gray-300`,
  primary: `bg-secondary-100 text-gray-300 border`,
};
</script>
