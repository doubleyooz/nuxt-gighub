<template>
  <div class="grid xs:grid-cols-2 h-full">
    <div class="hidden xs:flex w-full bg-primary-800" />
    <custom-card
      title="login"
      :img="{ src: 'logo.png', height: 100, width: 100, alt: 'gighub' }"
    >
      <template #content>
        <div class="flex flex-col gap-2 mb-4">
          <inputs-text-field
            v-model="email"
            label="Email"
            name="email"
            v-bind="emailProps"
          />
          <inputs-text-field
            v-model="password"
            label="Password"
            name="password"
            type="password"
            v-bind="passwordProps"
          />
        </div>
        <custom-button
          class="w-full"
          text="Login"
          :loading="authStore.loading"
          :disabled="disableButton"
          @click="submit"
        />
      </template>
    </custom-card>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";

definePageMeta({
  middleware: "control-access",
  layout: "auth",
});
const { emailRules, passwordRules } = useFormRules();
const authStore = useAuthStore();

interface LoginForm {
  email: string;
  password: string;
}

const { controlledValues, handleSubmit, defineField, errors } =
  useForm<LoginForm>({
    validationSchema: { ...emailRules, password: passwordRules.password },
  });

const [email, emailProps] = defineField("email");
const [password, passwordProps] = defineField("password");

const disableButton = computed(
  () =>
    [email.value, password.value].some((v) => v === undefined) ||
    Object.keys(errors.value).length !== 0
);

const submit = handleSubmit(async (values) => {
  await authStore.handleSignIn(values.email, values.password);
});
</script>
