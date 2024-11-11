<script setup>
const loading = useState("global_loading");
const router = useRouter();
const currentGameFilter = useState("currentGameFilter");
const currentCategoryFilter = useState("currentCategoryFilter");
const currentElementFilter = useState("currentElementFilter");
const collectionText = ref("your");
loading.value = true;

// when the initial page is loaded
onMounted(() => {
  loading.value = false;

  if (route.params.username) {
    collectionText.value = `${route.params.username}'s`;
  }
});

const push = (path) => router.push(path);
const goto = (link) => (window.location.href = link);

const games = [
  { id: "spyros-adventure-figures", name: "Spyro's Adventure" },
  { id: "giants-figures", name: "Giants" },
  { id: "swap-force-figures", name: "Swap Force" },
  { id: "trap-team-figures", name: "Trap Team" },
  { id: "superchargers-figures", name: "Superchargers" },
  { id: "imaginators-figures", name: "Imaginators" },
];
const categories = [
  "All Skylanders Spyro's Adventure Characters",
  "Spyro's Adventure Magic Items and Level Pieces",
  "Spyro's Adventure In-Game Variants",
  "Spyro's Adventure Chase Variants",
  "Giant Skylanders",
  "New (Series 1) Skylanders",
  "Returning (Series 2) Skylanders",
  "LightCore Skylanders",
  "Skylanders Giants Magic Items (with Variants)",
  "Skylanders Giants In-Game Variants",
  "Skylanders Giants Chase Variants",
  "SWAP Force Skylanders (Swappers)",
  "New (Series 1) Skylanders",
  "Returning (Series 2 and Series 3) Skylanders",
  "LightCore Skylanders",
  "SWAP Force Magic Items",
  "Skylanders SWAP Force In-Game Variants",
  "Skylanders SWAP Force Chase Variants",
  "Trap Master Skylanders",
  "New (Series 1) Skylanders",
  "Returning (Series 2, 3, and 4) Skylanders",
  "Mini Skylanders",
  "Trap Team Magic Items (with Variants)",
  "Skylanders Trap Team In-Game Variants",
  "Skylanders Trap Team Chase Variants",
  "Trap Team - Traptanium Crystal Traps",
  "Trap Team - Traptanium Crystal Trap Variants",
  "“Most Wanted” Trappable Villains",
  "“Most Wanted” Trappable Villain Variants",
  "SuperCharger Skylanders",
  "In-Game Variant SuperCharger Skylanders",
  "Chase Variant SuperCharger Skylanders",
  "Vehicles",
  "In-Game Variant Vehicles",
  "Chase Variant Vehicles",
  "Magic Items",
  "Imaginator Skylanders Sensei",
  "In-Game Variant Imaginator Skylanders Sensei",
  "Chase Variant Imaginator Skylanders Sensei",
  "Imaginator Villain Sensei",
  "In-Game Variant Imaginator Villain Sensei",
  "Chase Variant Imaginator Villain Sensei",
  "Creation Crystals",
  "Variant Creation Crystals",
  "Magic Items",
];

const elements = [
  "Air",
  "Dark",
  "Earth",
  "Fire",
  "Life",
  "Light",
  "Magic",
  "Tech",
  "Undead",
  "Water",
];

const route = useRoute();

const game = ref();
const category = ref();
const element = ref();

const searching = ref(false);
const term = useState("searchTerm")

function upperCaseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// whenever page changes
watch(route, () => {
  if (route.params.game) {
    game.value = route.params.game;
  } else if (route.params.category) {
    category.value = turnMeanCategoryFriendly(route.params.category);
  } else if (route.params.element) {
    element.value = upperCaseFirstLetter(route.params.element);
  }
});

// when game changes
watch(game, () => {
  if (category.value) {
    category.value = null;
  }
  if (element.value) {
    element.value = null;
  }

  term.value = "";

  if (game.value) {
    currentGameFilter.value = game.value;
  }
});

watch(category, () => {
  if (game.value) {
    game.value = null;
  }
  if (element.value) {
    element.value = null;
  }

  term.value = "";

  if (category.value) {
    currentCategoryFilter.value = category.value;
  }
});

watch(element, () => {
  if (game.value) {
    game.value = null;
  }
  if (category.value) {
    category.value = null;
  }

  term.value = "";


  if (element.value) {
    currentElementFilter.value = element.value;
  }
});

function clearFilters() {
  game.value = null;
  category.value = null;
  element.value = null;
  term.value = "";
  searching.value = false;
  currentGameFilter.value = null;
  currentCategoryFilter.value = null;
  currentElementFilter.value = null;
}
</script>

<template>
  <div>
    <div
      v-if="loading"
      class="flex items-center justify-center align-middle h-full mt-10"
    >
      <div class="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div v-if="!loading">
      <navbar class="mb-16 z-50" />
      <h1 class="text-center mx-auto font-semibold mt-32 text-4xl mb-10">
        {{ collectionText }} wishlist
      </h1>
      <div v-auto-animate class="flex mt-2 align-middle justify-center">
        <UButton
          @click="searching = !searching"
          class="mx-2"
          color="white"
          icon="material-symbols:search-rounded"
        />
        <UInput v-auto-animate color="white" v-if="searching" class="w-72" variant="outline" v-model="term" placeholder="Search..." />
        <div v-auto-animate class="flex transition-all" v-if="!searching">
          <USelectMenu
            v-model="game"
            :options="games"
            value-attribute="id"
            class="w-44"
            option-attribute="name"
            placeholder="filter by game"
          />
          <USelectMenu
            v-model="category"
            :options="categories"
            class="mx-5 w-72"
            placeholder="filter by type"
          />
          <USelectMenu
            v-model="element"
            :options="elements"
            class="w-48"
            placeholder="filter by element"
          />
        </div>
        <UButton
          @click="clearFilters()"
          class="mx-2"
          color="red"
          label="clear filters"
        ></UButton>
      </div>
      <slot class="-z-50" />
    </div>
  </div>
</template>

<style>
.spinner {
  color: gray;
  display: inline-block;
  position: relative;
  width: 70px;
  height: 70px;
  transform: scale(0.3) translateX(-5px) translateY(-5px);
}
.spinner div {
  transform-origin: 40px 40px;
  animation: spinner 1.2s linear infinite;
}
.spinner div:after {
  content: " ";
  display: block;
  position: absolute;
  top: 5px;
  left: 37px;
  width: 6px;
  height: 20px;
  border-radius: 30%;
  background: black;
}

.dark .spinner {
  color: lightgray;
}

.dark .spinner div:after {
  background: #f0f0f0;
}

.spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}
.spinner div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}
.spinner div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}
.spinner div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}
.spinner div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}
.spinner div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}
.spinner div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}
.spinner div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}
.spinner div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}
.spinner div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}
.spinner div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}
.spinner div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}
@keyframes spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.15;
  }
}
</style>
