<script setup>
const { getToken } = useAuth();
const watching = ref([]);
const router = useRouter();
const updates = ref([]);
const notifications = ref([]);
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

async function fetchNotifications() {
  notifications.value = await makeAuthenticatedRequest(
    `/api/v1/messages/fetch`,
    await getToken.value()
  );

  // slice the notifications array to only show the latest 3
  notifications.value = notifications.value.slice(0, 3);
}

onMounted(fetchNotifications);
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
      class="border-2 border-gray-200 rounded-md h-auto mb-5 text-center w-[38rem]"
    >
      <div class="flex items-center p-3">
        <Icon name="material-symbols:notifications-outline" class="w-6 h-6" />
        <h1 class="ml-2 text-left font-semibold text-lg">notifications</h1>
      </div>
      <div
        v-for="(message, index) in notifications"
        :key="index"
        class="w-full p-2 flex border-t-2 border-gray-200 cursor-pointer hover:bg-gray-100 transition-all"
      >
        <p class="font-bold text-base sm:text-lg w-1/4 text-left truncate mr-2">
          {{ message.title }}
        </p>
        <p class="text-sm sm:text-base truncate">
          {{ message.message }}
        </p>
      </div>
      <div v-if="notifications.length === 0" class="my-[4rem]">
        <p class="text-sm sm:text-base">all caught up!</p>
      </div>
      <div class="p-2 border-t-2 border-gray-200">
        <a
          href="#"
          @click.prevent="push('/notifications')"
          class="underline text-sm sm:text-base"
          >see more →</a
        >
      </div>
    </div>

    <!-- Characters Section -->
    <div class="mt-4 border-2 border-gray-200 rounded-md w-full h-full">
      <div class="flex flex-wrap justify-between">
        <UButton
          icon="i-heroicons-arrow-left"
          size="sm"
          color="white"
          square
          @click="prevPage"
          class="border-none"
          variant="ghost"
        />

        <p
          v-if="pages.length == 0"
          class="text-sm sm:text-base mx-auto my-auto h-[8.7rem] pt-14"
        >
          watching list is empty
        </p>

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
