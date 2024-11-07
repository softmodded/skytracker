<script setup>
definePageMeta({
  layout: "gallary",
});

useHead({ title: "skytracker - figures" });

const router = useRouter();
const push = (path) => router.push(path);

const route = useRoute();
const game = route.params.game;

const figures = ref([]);
const loading = ref(true);
const currentPage = ref(1);
const previousData = ref([]);
const searchedFigures = ref([]);
const term = useState("searchTerm");

async function fetchNextPage() {
  loading.value = true;
  currentPage.value += 1;
  const response = await fetch(`/api/v1/partials/page/${currentPage.value - 1}?game=${game}`);
  const data = await response.json();
  if (previousData.value === data) {
    loading.value = false;
    return;
  }

  previousData.value = data;
  figures.value = [...figures.value, ...data];
  searchedFigures.value = figures.value;
  loading.value = false;
}

onMounted(fetchNextPage);
watch(term, () => {
  if (term.value === "") {
    searchedFigures.value = figures.value;
    return;
  }

  searchedFigures.value = figures.value.filter((figure) => {
    return figure.name.toLowerCase().includes(term.value.toLowerCase());
  });
});
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
