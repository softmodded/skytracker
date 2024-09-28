<script setup>
const { user, isSignedIn } = useUser();

function getGreeting() {
  const localTime = new Date().getHours();
  if (localTime < 12) return "good morning";
  if (localTime < 18) return "good afternoon";
  return "good evening";
}
</script>

<template>
  <div class="relative top-10 m-10">
    <div>
      <div v-if="isSignedIn" class="mb-10 ml-20">
        <div class="flex">
          <UAvatar
            size="xl"
            class="w-14 h-14 mr-3"
            :src="user.imageUrl"
            :alt="user.username"
          />
          <h1 class="text-3xl mt-1">
            {{ getGreeting() }}, {{ user.username }}
          </h1>
        </div>
      </div>
    </div>
    <div class="flex justify-center align-middle">
      <TilesDaily class="mr-5" />
      <TilesFriends v-if="isSignedIn" />
      <TilesUpdates class="ml-5" />
    </div>
    <div class="flex justify-center align-middle mt-5">
      <TilesShortcuts />
    </div>
  </div>
</template>
