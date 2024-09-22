<template>
    <app-card :header-title="headerTitle" absolute outline>
        <template #content>
            <div class="flex flex-col gap-2 mb-4">
                <app-inputs-text-field v-model="title" v-bind="titleProps" label="Title" name="title" />
                <app-inputs-text-field v-model="description" label="Description" name="description"
                    v-bind="descriptionProps" />

                <app-inputs-text-field v-model="budget" label="Budget" name="budget" type="number"
                    v-bind="budgetProps" />
                <app-button class="w-full" :text="submitButtonText" :loading="loading" :disabled="disableButton"
                    @click="submit" />
            </div>

        </template>
    </app-card>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import type { Gig } from "~/models/gig.model";

const { gigSchema } = useFormRules();


export interface FormGigComponentType {
    headerTitle?: string;
    submitButtonText?: string;
    loading?: boolean;
    title?: string;
    description?: string;
    budget?: number;
}

const props = withDefaults(defineProps<FormGigComponentType>(), {
    headerTitle: "New gig",
    submitButtonText: 'submit',
    loading: false
});

const emit = defineEmits(["click:submit"]);

const { controlledValues, handleSubmit, defineField, errors } = useForm<Gig>({
    validationSchema: gigSchema,
    initialValues: {
        title: props.title,
        description: props.description,
        budget: props.budget
    }
});

const [title, titleProps] = defineField("title");
const [description, descriptionProps] = defineField("description");
const [budget, budgetProps] = defineField("budget");

const submit = handleSubmit(async (values) => {
    console.log(values);
    emit('click:submit', values)

});

const disableButton = computed(
    () =>
        [title.value, description.value, budget.value].some(
            (v) => v === undefined
        ) || Object.keys(errors.value).length !== 0
);


</script>