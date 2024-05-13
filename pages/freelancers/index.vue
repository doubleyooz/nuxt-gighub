<template>
  <div>
    <users-cards-user
      v-for="(item, index) in users"
      :key="index"
      :description="item.description || 'pretty nice description'"
      :title="item.title || 'harding working Freelancer'"
      :name="item.name"
      :profile-picture="
        getImageUrl(
          config.public.imageServer,
          item.picture._id,
          item.picture.ext
        )
      "
      @click="router.push(`freelancers/${item.name}`)"
    />
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "default",
});

const router = useRouter();
const config = useRuntimeConfig();

const userStore = useUserStore();

const users = await userStore.loadUsers({});
</script>
