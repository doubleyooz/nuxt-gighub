<template>
  <div class="autocomplete">
    <input class="input" :value="modelValue" @input="handleInput" type="text" />
    <ul v-show="searchResults.length && isOpen">
      <li
        v-for="result in searchResults"
        :key="result.title"
        class="search-item"
        @click="setSelected(result.title)"
      >
        {{ result.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
export interface ItemProps {
  title: string;
}

export interface AutocompleteProps {
  modelValue: string;
  pluckOut?: boolean;
}

const props = withDefaults(defineProps<AutocompleteProps>(), {});

const emit = defineEmits(["update:modelValue", "selected:value"]);

const search = ref("");
const isOpen = ref(false);

const items = defineModel<ItemProps[]>("items", {
  default: [],
});

const searchResults = computed(() => {
  if (search.value === "") return [];

  return items.value.filter((item) =>
    item.title.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())
  );
});

const setSelected = (selectedItem: string) => {
  search.value = "";
  isOpen.value = false;

  if (props.pluckOut)
    items.value = items.value.filter((i) => i.title !== selectedItem);
  console.log({ items: items.value, selectedItem });
  emit("selected:value", selectedItem);
  emit("update:modelValue", "");
};

const handleInput = (event: Event): void => {
  if (!event.target) return;
  isOpen.value = true;
  search.value = (event.target as HTMLInputElement).value;
  emit("update:modelValue", search.value);
};
</script>
