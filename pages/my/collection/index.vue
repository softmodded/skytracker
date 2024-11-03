<script setup>
definePageMeta({
  layout: "gallary-collection",
});

const router = useRouter();
const push = (path) => router.push(path);
const { getToken } = useAuth();
const figures = ref([]);
const loading = ref(true);
const searchedFigures = ref([]);
const currentPage = ref(1);
const term = useState("searchTerm");
const currentGameFilter = useState("currentGameFilter");
const currentCategoryFilter = useState("currentCategoryFilter");
const currentElementFilter = useState("currentElementFilter");

async function loadFigures() {
  loading.value = true;
  currentPage.value += 1;
  const collection = await makeAuthenticatedRequest(
    `/api/v1/collections/fetch`,
    await getToken.value()
  );

  collection.forEach(async (figure) => {
    const skylander = await fetch(`/api/v1/skylanders/${figure._id}`);
    const skylanderData = await skylander.json();

    figure = { ...figure, ...skylanderData };
  })
  
  figures.value = collection
  searchedFigures.value = figures.value;
  loading.value = false;

  console.log(collection);
}

watch(term, () => {
  if (term.value === "") {
    searchedFigures.value = figures.value;
    return;
  }

  loading.value = true;

  searchedFigures.value = figures.value.filter((figure) =>
    figure.name.toLowerCase().includes(term.value.toLowerCase())
  );

  loading.value = false;
});

watch(currentGameFilter, () => {
  if (currentGameFilter.value === null) {
    searchedFigures.value = figures.value;
    return;
  }

  loading.value = true;

  searchedFigures.value = figures.value.filter(
    (figure) => figure.game === currentGameFilter.value
  );

  loading.value = false;
});

watch(currentCategoryFilter, () => {
  if (currentCategoryFilter.value === null) {
    searchedFigures.value = figures.value;
    return;
  }

  loading.value = true;

  searchedFigures.value = figures.value.filter(
    (figure) => figure.category.toLowerCase() === turnFriendlyCategoryMean(currentCategoryFilter.value).toLowerCase()
  );

  console.log(currentCategoryFilter.value);

  loading.value = false;
});

watch(currentElementFilter, () => {
  if (currentElementFilter.value === null) {
    searchedFigures.value = figures.value;
    return;
  }

  loading.value = true;

  searchedFigures.value = figures.value.filter(
    (figure) => figure.element.toLowerCase() === currentElementFilter.value.toLowerCase()
  );

  console.log(searchedFigures.value);

  loading.value = false;
});

onMounted(loadFigures);
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
      <p v-if="!loading && (figures.length == 0 || searchedFigures.length == 0)" class="text-center">no skylanders in your collection</p>
    </div>
  </div>
</template>
