<script setup>
definePageMeta({
  layout: "gallary",
});

const router = useRouter();
const push = (path) => router.push(path);

const figures = ref([]);
const loading = ref(true);
const searchedFigures = ref([]);
const currentPage = ref(1);
const term = useState("searchTerm");

async function fetchNextPage() {
  loading.value = true;
  currentPage.value += 1;
  const response = await fetch(
    `/api/v1/partials/page/${currentPage.value - 1}`
  );
  const data = await response.json();

  figures.value = [...figures.value, ...data];
  searchedFigures.value = figures.value;
  loading.value = false;
}

watch(term, () => {
  if (term.value === "") {
    searchedFigures.value = figures.value;
    return;
  }

  loading.value = true;

  fetch(`/api/v1/searching/${term.value}?related=false`).then((result) => {
    result.json().then((data) => {
      loading.value = false;
      searchedFigures.value = data;
    });
  })
});

onMounted(fetchNextPage);

// when the user scrolls somewhere near the bottom of the page
window.onscroll = function () {
  if (term.value?.length > 0) {
    return;
  }
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
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
          v-for="figure in searchedFigures"
          :key="figure.id"
          class="border-2 rounded-md cursor-pointer transition-all hover:scale-105"
          @click="push('/figures/' + figure._id)"
        >
          <NuxtImg
            :src="figure.image"
            alt="figure"
            class="mx-auto w-64 px-3 pt-2 pb-3 my-auto"
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
