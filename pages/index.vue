<script setup>
const user = useLogtoUser();

function getGreeting() {
  const localTime = new Date().getHours();
  if (localTime < 12) return "good morning";
  if (localTime < 18) return "good afternoon";
  return "good evening";
}
</script>

<template>
  <div>
    <div v-if="user" class="relative top-14 left-14">
      <div class="flex">
        <UAvatar size="3" class="w-14 h-14 mr-3" :src="user.picture" :alt="user.name" />
        <h1 class="text-3xl mt-1">{{ getGreeting() }}, {{ user.name }}</h1>
      </div>
    </div>
  </div>
</template>
