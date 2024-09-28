<script setup>
const router = useRouter();
const date = new Date();

const dailySkylander = ref(null);
const skid = ref("");
const dailySkylanderLoading = ref(false);

const fetchDailySkylander = async () => {
  dailySkylanderLoading.value = true;
  const metadata = await fetch(`/api/v1/metadata/today`);
  const metadataJson = await metadata.json();
  skid.value = metadataJson.skylander;
  const skylander = await fetch(`/api/v1/skylanders/${metadataJson.skylander}`);
  dailySkylander.value = await skylander.json();
  dailySkylanderLoading.value = false;  
};

onMounted(() => {
  fetchDailySkylander();
});

function push(url) {
  router.push(url);
}
</script>

<template>
  <div class="border-2 border-gray-200 rounded-md w-[310px] h-[410px] text-center cursor-pointer transition-all hover:scale-105" @click="push(`/skylanders/${skid}`)">
    <div v-if="dailySkylander">
      <p class="my-3 font-thin text-md">skylander of the day</p>
      <img :src="dailySkylander.image" class="h-[300px] mx-auto" :alt="dailySkylander.name" />
      <p class="mt-3 mb-2 text-xl font-bold">{{ dailySkylander.name }}</p>
    </div>
    <div v-else>
      <p class="my-3 font-thin text-md">skylander of the day</p>
      <USkeleton class="h-[300px] mx-auto w-[270px]" :ui="{ rounded: 'rounded-none' }" />
      <USkeleton class="h-5 mt-5 mb-2 w-[250px] mx-auto" />
    </div>
  </div>
</template>
