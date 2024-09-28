<script setup>
const props = defineProps({
  data: Object,
});

console.log(props.data);
</script>

<template>
  <div>
    <h1>hello</h1>
    <img :src="props.data.imageUrl" alt="figure" class="mx-auto" />
    <h1 class="text-center mx-auto font-semibold mt-32 text-4xl">
      {{ props.data.name }}
    </h1>
    <p class="font-thin text-center mt-2">{{ props.data.description }}</p>
  </div>
</template>
