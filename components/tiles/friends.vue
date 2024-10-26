<script setup>
const { getToken } = useAuth();
const watching = ref([]);
const router = useRouter();
const updates = ref([]);
const pages = ref([]);
const currentPage = ref(1);
function push(link) {
  router.push(link);
}

async function fetchWatching() {
  watching.value = await makeAuthenticatedRequest(
    `/api/v1/watching/fetch`,
    await getToken.value()
  );
  // split the watching array into chunks of 
  pages.value = watching.value.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 5);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
}

onMounted(fetchWatching);

function nextPage() {
  if (currentPage.value < pages.value.length) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}
</script>

<template>
  <div class="w-full max-w-[620px]">
    <!-- Notifications Section -->
    <div
      class="border-2 border-gray-200 rounded-md w-full h-auto mb-5 text-center"
    >
      <div class="flex items-center p-3">
        <Icon name="material-symbols:notifications-outline" class="w-6 h-6" />
        <h1 class="ml-2 text-left font-semibold text-lg">notifications</h1>
      </div>
      <div
        v-for="(_, index) in 3"
        :key="index"
        class="w-full p-2 flex border-t-2 border-gray-200 cursor-pointer hover:bg-gray-100 transition-all"
      >
        <p class="font-bold text-base sm:text-lg w-1/4 text-left truncate mr-2">
          Price drop alert!
        </p>
        <p class="text-sm sm:text-base truncate">
          The price for <strong>Stump smash</strong> has dropped below your
          threshold of <strong>$21.99</strong>
        </p>
      </div>
      <div class="p-2 border-t-2 border-gray-200">
        <a
          href="#"
          @click.prevent="push('/updates/2024-9-28')"
          class="underline text-sm sm:text-base"
          >see more →</a
        >
      </div>
    </div>

    <!-- Characters Section -->
    <div class="mt-4 border-2 border-gray-200 rounded-md w-full h-auto">
      <div class="flex flex-wrap justify-between ">
        <UButton
          icon="i-heroicons-arrow-left"
          size="sm"
          color="white"
          square
          @click="prevPage"
          class="border-none"
          variant="ghost"
        />
        <div class="flex flex-wrap justify-center">
          <div
            v-for="(skylander, index) in pages[currentPage - 1]"
            :key="index"
            class="w-[90px] min-w-[100px] flex flex-col items-center cursor-pointer transition-all hover:scale-105"
            @click="push('/figures/' + skylander._id)"
          >
            <img
              :src="skylander.image"
              :alt="skylander.name"
              class="w-[80px] sm:w-[100px] md:w-[120px]"
            />
            <p
              class="font-bold text-sm sm:text-base truncate w-[70px] text-center"
            >
              {{ skylander.name }}
            </p>
            <p class="text-xs sm:text-sm -mt-1">
              <strong>{{ skylander.price }}</strong>
            </p>
          </div>
        </div>
        <UButton
          icon="i-heroicons-arrow-right"
          size="sm"
          color="white"
          square
          @click="nextPage"
          class="justify-start"
          variant="ghost"
        />
      </div>
    </div>
  </div>
</template>
