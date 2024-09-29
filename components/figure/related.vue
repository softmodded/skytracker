<script setup>
const router = useRouter();
const loading = ref(true);
const props = defineProps({
  skylander: Object,
});

const related = ref([]);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

onMounted(async () => {
  // give it time to load
  await sleep(500);
  const response = await fetch(`/api/v1/searching/${props?.skylander?.name}`);
  const json = await response.json();
  related.value = json
    .filter((skylander) => skylander._id !== props.skylander._id)
    .slice(0, 5);
  related.value = related.value.sort(() => Math.random() - 0.5);
  related.value = related.value.slice(0, 5);
  loading.value = false;
});

const push = (url) => {
  router.push(url);
};
</script>

<template>
  <div
    class="border-2 border-gray-200 rounded-md w-[880px] h-[225px] text-center mb-5"
  >
    <h1 class="text-left ml-4 mt-2 font-semibold">related skylanders</h1>
    <div
      v-if="related.length == 0 && !loading"
      class="flex place-content-center"
    >
      <h1 class="text-center pt-20 font-semibold">no related skylanders :(</h1>
    </div>
    <div class="flex align-middle justify-start">
      <div
        v-for="skylander in related"
        class="mt-1 mx-6 cursor-pointer transition-all hover:scale-105 text-center"
        @click="push(`/figures/${skylander._id}`)"
        :key="skylander._id"
      >
        <img class="h-32" :src="skylander.image" />
        <p class="text-sm font-semibold truncate mt-1.5 w-32 text-center">
          {{ skylander.name }}
        </p>
        <p class="text-xs">{{ getFriendlyGameName(skylander.game) }}</p>
      </div>
    </div>
    <loader v-if="loading" />
  </div>
</template>
