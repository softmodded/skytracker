<script setup>
const date = new Date();

const dailySkylander = ref(null);
const dailySkylanderLoading = ref(false);

const fetchDailySkylander = async () => {
  dailySkylanderLoading.value = true;
  const metadata = await fetch(`/api/v1/metadata/today`);
  const metadataJson = await metadata.json();
  const skylander = await fetch(`/api/v1/skylanders/${metadataJson.skylander}`);
  dailySkylander.value = await skylander.json();
  dailySkylanderLoading.value = false;
};

onMounted(() => {
  fetchDailySkylander();
});
</script>

<template>
  <div class="border-2 border-gray-200 rounded-md w-[310px] h-[400px] text-center">
    <div v-if="dailySkylander">
      <p class="my-3 font-bold text-lg">daily skylander</p>
      <img :src="dailySkylander.image" class="h-[300px]" :alt="dailySkylander.name" />
      <p class="mt-2 text-xl">{{ dailySkylander.name }}</p>
    </div>
    <UProgress v-if="dailySkylanderLoading" animation="carousel" />
  </div>
</template>
