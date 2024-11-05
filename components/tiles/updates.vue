<script setup>
const router = useRouter();
const { getToken } = useAuth();
const updates = useState("updates");

async function fetchUpdates() {
  updates.value = await makeAuthenticatedRequest(
    `/api/v1/metadata/updates`,
    await getToken.value()
  );

  updates.value = updates.value.slice(0, 2);

  for (const update of updates.value) {
    update.body = update.body.split("\n");
    update.body = update.body.slice(0, 4);    
  }
}

onMounted(fetchUpdates);

function push(link) {
  router.push(link);
}

function newTab(url) {
  window.open(url, "_blank");
}
</script>

<template>
  <div>
    <div
      class="border-2 border-gray-200 rounded-md w-[310px] h-[410px] text-center"
    >
      <h1 class="mt-4 font-bold text-2xl">updates</h1>
      <div v-for="(update, index) in updates" :key="index">
        <h3 class="mt-2 font-semibold text-xl">{{ update.name }}</h3>
        <ul class="mt-7">
          <li v-for="(line, index) in update.body" :key="index" class="truncate -my-6">
            <MDC :value="'­' + line"  tag="changelog" />
            <br />
          </li>
          <a
            @click="newTab(update.html_url)"
            class="underline cursor-pointer"
            >see more →</a
          >
        </ul>
      </div>
    </div>
  </div>
</template>
