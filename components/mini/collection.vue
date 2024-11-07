<script setup>
const props = defineProps({
  collection: Object,
});

const randomSkylander = ref(null);

onMounted(async () => {
  randomSkylander.value =
    props.collection[Math.floor(Math.random() * props.collection.length)];

  console.log(randomSkylander.value);
});
</script>

<template>
  <div
    class="border-2 border-gray-200 rounded-md h-[14rem] w-[12rem] text-center cursor-pointer transition-all hover:scale-105"
  >
    <img
      :src="randomSkylander?.image"
      alt="figure"
      class="mx-auto w-[12rem] px-3 pt-2 pb-3 my-auto"
    />
    <div class="flex justify-center align-middle">
      <h1 class="text-center mx-auto font-semibold text-xl mb-10">
        view collection
      </h1>
    </div>
  </div>
</template>
