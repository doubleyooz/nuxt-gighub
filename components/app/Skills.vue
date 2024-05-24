<template>
  <app-card title="Skills" outline>
    <template #content>
      <div class="flex gap-2 overflow-auto">
        <span v-if="skills.length === 0">No skills added</span>
        <app-chip
          v-for="(item, index) in skills"
          v-else
          :key="index"
          :text="item"
          variant="grey"
          :closeable="canEdit"
        />
      </div>
    </template>
  </app-card>
</template>

<script setup lang="ts">
export interface SkillsComponentType {
  skills?: string[];
  canEdit: boolean;
}

const props = withDefaults(defineProps<SkillsComponentType>(), {
  skills: [],
});
</script>
