<script setup>
const { user } = useUser();
const profileId = ref('');
const route = useRoute();
const router = useRouter();

function goto(url) {
  router.push(url);
}

onMounted(async () => {
  setTimeout(async () => {
    const idRaw = await fetch(`/api/v1/users/${route.params.username}/id`);
    const idData = await idRaw.json();
    profileId.value = idData.id;
  }, 1000);
});
</script>

<template>
  <div class="p-12">
    <div
      class="border-2 border-gray-300 rounded-md w-[80rem] mx-auto h-[15rem]"
    >
      <img
        src="@/assets/default-banner.jpg"
        alt="placeholder"
        class="w-full h-full object-cover rounded-sm"
      />
      <img
        :src="user.imageUrl"
        alt="profile picture"
        class="w-28 h-28 rounded-full -mt-20 mx-auto border-4 border-white object-cover"
      />
      <div class="text-center">
        <h1 class="text-3xl font-bold">{{ user.firstName }}</h1>
        <p class="text-lg text-gray-500">(@{{ user.username }})</p>
      </div>
    </div>
  </div>
</template>
