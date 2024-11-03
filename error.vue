<script setup>
const props = defineProps({
  error: Object,
});

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <div>
    <NuxtLayout>
      <div class="w-full mx-auto text-center mt-[20rem]">
        <h1 class="font-bold text-3xl">{{ error.statusCode }}</h1>
        <h2 class="my-5">{{ error.statusMessage }}</h2>
        <UButton variant="solid" color="white" @click="handleError"
          >Go home</UButton
        >
      </div>
    </NuxtLayout>
  </div>
</template>
