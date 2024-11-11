<script setup>
const route = useRoute();
const router = useRouter();
const { getToken } = useAuth();
const isWatching = ref(false);
const inCollection = ref(false);
const onWishlist = ref(false);
const skylander = ref();
const id = route.params.id;
const loading = ref(true);
const toast = useToast();

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

function capitalizeFirstLetter(string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const fetchSkylander = async () => {
  skylander.value = {};
  skylander.value.price = "Buy";
  const response = await fetch(`/api/v1/skylanders/${id}`);
  if (!response.ok) {
    console.error("Failed to fetch skylander");
    return router.push("/");
  }
  skylander.value = await response.json();

  useHead({ title: "skytracker - " + skylander.value.name });

  const watching = await makeAuthenticatedRequest(
    `/api/v1/watching/fetch`,
    await getToken.value()
  );

  watching.forEach((watch) => {
    if (watch._id.toString() == id) {
      console.log("watching");
      isWatching.value = true;
      console.log(isWatching.value);
    }
  });

  const collection = await makeAuthenticatedRequest(
    `/api/v1/collections/fetch`,
    await getToken.value()
  );

  collection.forEach((col) => {
    if (col._id.toString() == id) {
      console.log("in collection");
      inCollection.value = true;
      console.log(inCollection.value);
    }
  });

  const wishlist = await makeAuthenticatedRequest(
    `/api/v1/wishlist/fetch`,
    await getToken.value()
  );

  wishlist.forEach((wish) => {
    if (wish._id.toString() == id) {
      console.log("on wishlist");
      onWishlist.value = true;
      console.log(onWishlist.value);
    }
  });

  loading.value = false;
};

function newTab(url) {
  window.open(url, "_blank");
}

function getElement(element) {
  if (!element) return "other";
  const e = elements.find((e) => e.toLowerCase() === element.toLowerCase());
  return e ? e : "other";
}

async function watchPrice() {
  const response = await makeAuthenticatedRequest(
    `/api/v1/watching/modify/${id}`,
    await getToken.value()
  );

  if (response.result == true) {
    toast.add({
      title: "Success",
      description: "Skylander added to watchlist",
      type: "success",
    });
    isWatching.value = true;
  } else {
    toast.add({
      title: "Success",
      description: "Skylander removed from watchlist",
      type: "success",
    });
    isWatching.value = false;
  }
}

async function toggleCollection() {
  const response = await makeAuthenticatedRequest(
    `/api/v1/collections/modify/${id}`,
    await getToken.value()
  );

  if (response.result == true) {
    toast.add({
      title: "Success",
      description: "Skylander added to collection",
      type: "success",
    });
    inCollection.value = true;
  } else {
    toast.add({
      title: "Success",
      description: "Skylander removed from collection",
      type: "success",
    });
    inCollection.value = false;
  }
}

async function toggleWishlist() {
  const response = await makeAuthenticatedRequest(
    `/api/v1/wishlist/modify/${id}`,
    await getToken.value()
  );

  if (response.result == true) {
    toast.add({
      title: "Success",
      description: "Skylander added to wishlist",
      type: "success",
    });
    onWishlist.value = true;
  } else {
    toast.add({
      title: "Success",
      description: "Skylander removed from wishlist",
      type: "success",
    });
    onWishlist.value = false;
  }
}

onMounted(fetchSkylander);
</script>

<template>
  <div>
    <div class="flex w-full">
      <div class="w-1/3 pl-32 pt-10">
        <img
          v-if="!loading"
          class="w-full border-2 border-gray-200 rounded-lg mx-auto"
          :src="skylander?.image"
          alt="Skylander Image"
        />
        <USkeleton v-if="loading" class="w-full h-[400px]" />
        <div class="w-full">
          <UButton
            class="mt-4"
            block
            color="blue"
            @click="newTab(skylander?.links?.scl)"
            :label="`${skylander?.price} on SCL`"
          />
          <UButton
            class="mt-4"
            block
            color="orange"
            v-if="skylander?.links?.amazon && !loading"
            @click="newTab(skylander?.links?.amazon)"
            label="Buy on Amazon"
          />
          <USkeleton
            v-if="loading"
            class="w-full"
          />
          <UButton
            class="mt-4"
            block
            color="green"
            v-if="skylander?.links?.ebay"
            @click="newTab(skylander?.links?.ebay)"
            label="Buy on eBay"
          />
          <USkeleton
            v-if="loading"
            class="w-full"
          />
          <FigureMisc class="mt-5" :skylander="skylander" />
        </div>
      </div>
      <div>
        <div class="w-[850px] pt-10 pl-14">
          <div class="flex justify-between">
            <div>
              <div class="flex">
                <UTooltip
                  :text="`${capitalizeFirstLetter(
                    getElement(skylander?.element)
                  )} element`"
                  v-if="!loading"
                >
                  <NuxtImg
                    :src="
                      '/assets/elements/' +
                      getElement(skylander?.element).toLowerCase() +
                      '.png'
                    "
                    class="h-10 mt-[3px] pr-1"
                    alt="Element Image"
                  />
                </UTooltip>
                <USkeleton v-if="loading" class="h-10 w-10 rounded-full pr-1" />
                <h1 v-if="!loading" class="text-4xl font-bold">{{ skylander?.name }}</h1>
                <USkeleton v-if="loading" class="h-10 w-64 rounded-full ml-2" />
              </div>
              <p v-if="!loading" class="text-lg font-thin">
                (Series {{ skylander?.series || "1" }})
              </p>
              <USkeleton v-if="loading" class="h-6 w-24 mt-2" />
            </div>
            <div class="mt-2">
              <UTooltip v-if="!inCollection" text="Add to Collection">
                <UButton
                  icon="i-heroicons-plus"
                  size="sm"
                  color="white"
                  @click="toggleCollection"
                  square
                  variant="solid"
                />
              </UTooltip>
              <UTooltip v-if="inCollection" text="In your collection">
                <UButton
                  icon="material-symbols:check"
                  size="sm"
                  color="white"
                  @click="toggleCollection"
                  square
                  variant="solid"
                />
              </UTooltip>
              <UTooltip v-if="!isWatching" text="Watch price">
                <UButton
                  icon="i-heroicons-eye"
                  size="sm"
                  color="white"
                  square
                  @click="watchPrice"
                  class="mx-2.5"
                  variant="solid"
                />
              </UTooltip>
              <UTooltip v-if="isWatching" text="Stop watching">
                <UButton
                  icon="i-heroicons-eye-slash"
                  size="sm"
                  color="white"
                  square
                  @click="watchPrice"
                  class="mx-2.5"
                  variant="solid"
                />
              </UTooltip>
              <UTooltip v-if="!onWishlist" text="Add to wishlist">
                <UButton
                  @click="toggleWishlist"
                  icon="material-symbols-light:playlist-add"
                  size="sm"
                  color="white"
                  square
                  variant="solid"
                />
              </UTooltip>
              <UTooltip v-if="onWishlist" text="On your wishlist">
                <UButton
                  @click="toggleWishlist"
                  icon="material-symbols-light:playlist-add-check"
                  size="sm"
                  color="white"
                  square
                  variant="solid"
                />
              </UTooltip>
            </div>
          </div>
        </div>
        <div class="pl-14 pt-5">
          <div class="flex">
            <FigureHistory :skylander="skylander" />
            <FigureCompat class="ml-5" :skylander="skylander" />
          </div>
          <FigureRelated :skylander="skylander" />
        </div>
      </div>
    </div>
  </div>
</template>
