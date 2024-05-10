<template>
  <div
    class="flex gap-1 items-center"
    :class="[
      sizeHeightPadding(),
      clickable
        ? `${clickableVariants[variant]} cursor-pointer`
        : variants[variant],
      variant ?? '',
      rounded ? 'rounded-full' : 'rounded-lg',
      outline ? '' : '!border-0',
      isHidden ? 'hidden' : '',
    ]"
    @click="emit('click:chip')"
  >
    <Icon v-if="prependIcon" :name="prependIcon" />
    <Icon v-if="icon" :name="icon" />
    <span v-else class="text-base" :class="prependIcon ? '' : 'mb-0.5'">
      {{ text }}</span
    >
    <Icon v-if="appendIcon" :name="appendIcon" />
    <button v-if="closeable" class="cursor-pointer mb-0.5" @click="handleClick">
      <Icon name="mdi:close" />
    </button>
  </div>
</template>

<script setup lang="ts">
export interface ChipComponentType {
  text?: string;
  variant?: Variant;
  outline?: boolean;
  closeable?: boolean;
  clickable?: boolean;
  rounded?: boolean;
  prependIcon?: string;
  appendIcon?: string;
  size?: Size;
  icon?: string;
}
const emit = defineEmits(["click:close", "click:chip"]);

const props = withDefaults(defineProps<ChipComponentType>(), {
  variant: "primary",
  size: "medium",
  text: undefined,
  prependIcon: undefined,
  appendIcon: undefined,
  icon: undefined,
});

const sizeHeightPadding = () => {
  let padding = props.icon ? "p-2" : props.rounded ? "py-2 px-4" : "px-4";
  let height, width;
  switch (props.size) {
    case "x-small":
      height = "h-6";
      width = "w-6";
      break;
    case "small":
      height = "h-7";
      width = "w-7";
      break;
    case "medium":
      height = "h-8";
      width = "w-8";
      break;
    case "large":
      height = "h-9";
      width = "w-9";
      padding = props.rounded ? "p-2" : "px-4";
      break;
    default:
      height = "h-8";
      width = "w-8";
      break;
  }
  return props.icon ? `${height} ${width} ${padding}` : `${height} ${padding}`;
};

const isHidden = ref(false);

const handleClick = () => {
  isHidden.value = true;
  emit("click:close");
};

const variants: Record<Variant, string> = {
  blue: "bg-info text-white border border-secondary-700",
  grey: "bg-gray-100 text-gray-600 border border-gray-600",
  error: "bg-error text-white border border-error-700",
  text: "text-gray-600 border border-gray-600",
  success: "bg-success text-white border border-success-700",
  warning: "bg-warning text-white border border-warning-700",
  dark: "bg-primary text-white border border-white",
  secondary: "bg-gray-blue text-gray-600 border border-gray-600 ",
  primary: "bg-secondary text-white border border-secondary-700",
};

const clickableVariants: Record<Variant, string> = {
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
</script>

<style scoped lang="scss"></style>
