<script setup>
const router = useRouter();
const date = new Date();
const dailySkylander = ref(null);
const skid = ref("");
const dailySkylanderLoading = ref(false);
const { getToken } = useAuth();

const fetchDailySkylander = async () => {
  dailySkylanderLoading.value = true;
  const metadataJson = await makeAuthenticatedRequest(`/api/v1/metadata/today`);
  skid.value = metadataJson.skylander;
  const skylander = await makeAuthenticatedRequest(`/api/v1/skylanders/${metadataJson.skylander}`);
  dailySkylander.value = await skylander
  dailySkylanderLoading.value = false;
};

fetchDailySkylander();

function push(url) {
  router.push(url);
}
</script>

<template>
  <div
    class="border-2 border-gray-200 rounded-md w-full sm:w-[280px] md:w-[310px] h-auto sm:h-[380px] md:h-[410px] text-center cursor-pointer transition-all hover:scale-105"
    @click="push(`/figures/${skid}`)"
  >
    <div v-if="dailySkylander" class="p-4">
      <p class="my-2 sm:my-3 font-thin text-sm sm:text-md">skylander of the day</p>
      <img
        :src="dailySkylander.image"
        class="h-[200px] sm:h-[250px] md:h-[300px] mx-auto object-contain"
        :alt="dailySkylander.name"
      />
      <p class="truncate mt-2 sm:mt-3 mb-1 sm:mb-2 text-lg sm:text-xl font-bold">{{ dailySkylander.name }}</p>
    </div>
    <div v-else class="p-4">
      <p class="my-2 sm:my-3 font-thin text-sm sm:text-md">skylander of the day</p>
      <USkeleton
        class="h-[200px] sm:h-[250px] md:h-[300px] mx-auto w-full sm:w-[240px] md:w-[270px]"
        :ui="{ rounded: 'rounded-none' }"
      />
      <USkeleton class="h-5 mt-3 sm:mt-5 mb-1 sm:mb-2 w-3/4 mx-auto" />
    </div>
  </div>
</template>