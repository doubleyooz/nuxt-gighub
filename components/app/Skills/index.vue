<template>
    <app-card header-title="Skills" outline>
        <template #content>
            <div class="flex flex-col w-full gap-2 p-1 overflow-auto bg-red-500">
                <app-inputs-autocomplete v-if="canEdit" v-model="search" v-model:items="skills" name="skill"
                    label="Select skills" pluck-out @update:model-value="(txt) => console.log(txt)"
                    @selected:value="(txt) => skills.push(txt)" />
                <app-skills-chips :skills="skills" :can-edit="canEdit" @click:remove="handleRemoveSkill" />
            </div>
        </template>
    </app-card>
</template>

<script setup lang="ts">
import type { Skill } from "~/models/skill.model";
import type { ItemProps } from "../inputs/Autocomplete.vue";

export interface SkillsComponentType {
    data?: Skill[];
    canEdit: boolean;
    noSkillsPlaceholder?: string;
    hideEmpty?: boolean;
}

const props = withDefaults(defineProps<SkillsComponentType>(), {
    data: () => [],
    noSkillsPlaceholder: "No skills added",
});

const skills = ref<ItemProps[]>(props.data);

const search = ref("");

const handleRemoveSkill = (skill: string) => {
    const filteredSkills = skills.value.filter((item) => item.title !== skill);
    console.log({ skill, filteredSkills });
    skills.value = filteredSkills;
    skills.value.push({ title: skill });
};
</script>