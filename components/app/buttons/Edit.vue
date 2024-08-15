<template>
  <div v-if="!noEdit" class="flex flex-wrap gap-2 min-w-fit">
    <div v-if="edit" class="flex items-center flex-wrap gap-2 mt-1 min-w-fit">
      <app-button
        icon="mdi:check"
        variant="success"
        pressed
        rounded
        outline
        @click="saveEdit"
      />
      <app-button
        icon="mdi:close"
        variant="error"
        pressed
        rounded
        outline
        @click="cancelEdit"
      />
    </div>

    <app-button
      v-else
      icon="mdi:pen"
      variant="primary"
      pressed
      rounded
      outline
      @click="saveEdit"
    />
  </div>
</template>
<script setup lang="ts">
export interface EditButtonProps {
  noEdit?: boolean;
}

withDefaults(defineProps<EditButtonProps>(), {});

const emit = defineEmits(["click:save", "click:cancel"]);
const edit = ref(false);

const toggleEdit = () => {
  edit.value = !edit.value;
};

const saveEdit = () => {
  if (edit.value) {
    emit("click:save");
  }

  toggleEdit();
};

const cancelEdit = () => {
  emit("click:cancel");
  toggleEdit();
};
</script>
