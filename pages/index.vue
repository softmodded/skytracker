<script setup>
const { user, isSignedIn } = useUser();
const userDataState = useState("user");
const { getToken } = useAuth();

useHead({ title: "skytracker"})

async function fetchUserData() {
  localStorage.theme = 'light';
  if (isSignedIn) {
    const raw = await makeAuthenticatedRequest(
      `/api/v1/users/me`,
      await getToken.value()
    );
    userDataState.value = raw;
  } else {
    userDataState.value = null;
  }
}

function getGreeting() {
  const localTime = new Date().getHours();
  if (localTime < 12) return "good morning";
  if (localTime < 18) return "good afternoon";
  return "good evening";
}

onMounted(fetchUserData);
</script>

<template>
  <div class="relative p-6 sm:p-6 md:p-8 lg:p-10 z-10">
    <div v-if="isSignedIn" class="mb-6 md:mb-10">
      <div class="flex items-center">
        <UAvatar
          size="xl"
          class="w-12 h-12 md:w-14 md:h-14 mr-3"
          :src="user.imageUrl"
          :alt="user.username"
        />
        <h1 class="text-xl sm:text-2xl md:text-3xl">
          {{ getGreeting() }}, {{ user.username }}
        </h1>
      </div>
    </div>

    <div
      class="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6"
    >
      <TilesDaily class="w-full sm:w-auto" />
      <TilesFriends v-if="isSignedIn" class="w-full sm:w-auto" />
      <TilesUpdates class="w-full sm:w-auto" />
    </div>
    
    <div class="mt-4 sm:mt-6">
      <TilesShortcuts />
    </div>
  </div>
</template>
