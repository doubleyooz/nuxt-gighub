<template>
  <app-card title="Skills" outline>
    <template #content>
      <div class="flex flex-col w-full gap-2 p-1 overflow-auto bg-red-500">
        <app-inputs-autocomplete
          v-if="canEdit"
          v-model="search"
          v-model:items="skills as ItemProps[]"
          name="skill"
          label="Select skills"
          pluck-out
          @update:model-value="(txt) => console.log(txt)"
          @selected:value="(txt) => skills.push(txt)"
        />
        <div class="flex gap-2">
          <span v-if="skills.length === 0">No skills added</span>

          <app-chip
            v-for="(item, index) in skills"
            v-else
            :key="index"
            :text="item.title"
            variant="grey"
            :closeable="canEdit"
            @click:close="handleRemoveSkill"
          />
        </div>
      </div>
    </template>
  </app-card>
</template>

<script setup lang="ts">
import type { PartialSkill, Skill } from "~/models/skill.model";
import type { ItemProps } from "./inputs/Autocomplete.vue";

export interface SkillsComponentType {
  data?: Skill[];
  canEdit: boolean;
}

const props = withDefaults(defineProps<SkillsComponentType>(), {
  data: () => [],
});

const skills = ref<PartialSkill[]>(props.data);

const search = ref("");

const handleRemoveSkill = (skill: string) => {
  const filteredSkills = skills.value.filter((item) => item.title !== skill);
  console.log({ skill, filteredSkills });
  skills.value = filteredSkills;
  skills.value.push({ title: skill });
};
</script>
