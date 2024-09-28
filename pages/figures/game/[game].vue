<script setup>
definePageMeta({
  layout: "gallary",
});

const router = useRouter();
const push = (path) => router.push(path);

const route = useRoute();
const game = route.params.game;

const figures = ref([]);
const loading = ref(true);
const currentPage = ref(1);

async function fetchNextPage() {
  loading.value = true;
  const response = await fetch(`/api/v1/partials/page/${currentPage.value}?game=${game}`);
  const data = await response.json();
  figures.value = [...figures.value, ...data];
  currentPage.value += 1;
  loading.value = false;
}

onMounted(fetchNextPage);

// when the user scrolls somewhere near the bottom of the page
window.onscroll = function () {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
  ) {
    fetchNextPage();
  }
};
</script>

<template>
  <div>
    <div>
      <div
        class="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 mx-4 mt-5"
      >
        <div
          v-for="figure in figures"
          :key="figure.id"
          class="border-2 rounded-md cursor-pointer transition-all hover:scale-105"
          @click="push('/figures/' + figure.id)"
        >
          <img
            :src="figure.image"
            alt="figure"
            class="mx-auto px-3 pt-2 pb-3"
          />
          <h1 class="text-center mx-auto font-semibold text-xl">
            {{ figure.name }}
          </h1>
          <p class="font-thin text-center mb-2">
            {{ getFriendlyGameName(figure.game) }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <loader v-if="loading" />
    </div>
  </div>
</template>
