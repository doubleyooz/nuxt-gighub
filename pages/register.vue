<template>
  <div class="grid xs:grid-cols-2 h-full">
    <div class="hidden xs:flex w-full bg-primary-800" />
    <app-card
      title="Sign up"
      :img="{ src: 'logo.png', height: 100, width: 100, alt: 'gighub' }"
      no-edit
    >
      <template #content>
        <form
          ref="form"
          class="flex flex-col gap-2 mb-4"
          @submit.prevent="submit"
        >
          <app-inputs-text-field
            v-model="name"
            label="Name"
            name="name"
            v-bind="nameProps"
          />
          <app-inputs-text-field
            v-model="email"
            label="Email"
            name="email"
            v-bind="emailProps"
          />
          <app-inputs-text-field
            v-model="password"
            label="Password"
            name="password"
            type="password"
            v-bind="passwordProps"
          />
        </form>
        <app-button
          class="w-full"
          text="Sign up"
          :disabled="disableButton"
          :loading="loading"
          @click="submit"
        />
      </template>
    </app-card>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";

definePageMeta({
  layout: "auth",
});
const router = useRouter();
const route = useRoute();
const { emailRules, passwordRules, nameRules } = useFormRules();

const redirect =
  (route.query.redirect as string) || useCookie("redirect").value;

const hasError = ref(false);

const authStore = useAuthStore();
const loading = ref(false);

const { handleSubmit, errors, values, controlledValues, defineField } = useForm(
  {
    validationSchema: {
      email: emailRules.email,
      name: nameRules.name,
      password: passwordRules.password,
    },
    keepValuesOnUnmount: true,
  }
);

const [email, emailProps] = defineField("email");
const [password, passwordProps] = defineField("password");
const [name, nameProps] = defineField("name");

const disableButton = computed(
  () =>
    [email.value, name.value, password.value].some((v) => v === undefined) ||
    Object.keys(errors.value).length !== 0
);

const submit = handleSubmit(async (values) => {
  loading.value = true;
  console.log("submit");
  await authStore.handleSignUp({
    email: values.email,
    password: values.password,
    name: values.name,
  });
  loading.value = false;
});
</script>
