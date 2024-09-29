<script setup>
const route = useRoute();
const skylander = ref();
const id = route.params.id;

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
  const response = await fetch(`/api/v1/skylanders/${id}`);
  skylander.value = await response.json();
};

function formatName(name) {
  return name.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

function newTab(url) {
  window.open(url, "_blank");
}

function getElement(element) {
  if (!element) return "other";
  const e = elements.find((e) => e.toLowerCase() === element.toLowerCase());
  return e ? e : "other";
}

onMounted(fetchSkylander);
</script>

<template>
  <div>
    <div class="flex w-full">
      <div class="w-1/3 pl-32 pt-10">
        <NuxtImg
          class="w-full border-2 border-gray-200 rounded-lg mx-auto"
          :src="skylander?.image"
          alt="Skylander Image"
        />
        <div class="w-full">
          <UButton
            class="mt-4"
            block
            color="blue"
            @click="
              newTab(
                `https://skylanderscharacterlist.com/shop/${
                  skylander?.link.split('/')[3]
                }/`
              )
            "
            :label="`${skylander?.price} on SCL`"
          />
          <UButton
            class="mt-4"
            block
            color="orange"
            v-if="skylander?.links?.amazon"
            @click="newTab(skylander?.links?.amazon)"
            label="Buy on Amazon"
          />
          <UButton
            class="mt-4"
            block
            color="green"
            v-if="skylander?.links?.ebay"
            @click="newTab(skylander?.links?.ebay)"
            label="Buy on eBay"
          />
        </div>
      </div>
      <div class="w-[850px] pt-10 pl-14">
        <div class="flex justify-between ">
          <div>
            <div class="flex">
              <UTooltip
                :text="`${capitalizeFirstLetter(
                  getElement(skylander?.element)
                )} element`"
              >
                <NuxtImg
                  :src="
                    '/assets/elements/' +
                    getElement(skylander?.element) +
                    '.png'
                  "
                  class="h-10 mt-[3px] pr-1"
                  alt="Element Image"
                />
              </UTooltip>
              <h1 class="text-4xl font-bold">{{ skylander?.name }}</h1>
            </div>
            <p class="text-lg font-thin">
              (Series {{ skylander?.series || "1" }})
            </p>
          </div>
          <div class="mt-2">
            <UTooltip text="Add to Collection">
              <UButton
                icon="i-heroicons-plus"
                size="sm"
                color="white"
                square
                variant="solid"
              />
            </UTooltip>
            <UTooltip text="Watch price">
              <UButton
                icon="i-heroicons-eye"
                size="sm"
                color="white"
                square
                class="mx-2.5"
                variant="solid"
              />
            </UTooltip>
            <UTooltip text="Add to wishlist">
              <UButton
                icon="material-symbols-light:lists"
                size="sm"
                color="white"
                square
                variant="solid"
              />
            </UTooltip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
