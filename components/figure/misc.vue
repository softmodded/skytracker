<script setup>
const props = defineProps({
  skylander: Object,
});

const goto = (url) => window.open(url, "_blank");

function getWikiUrl(name) {
  return `https://skylanders.fandom.com/wiki/${name.replaceAll(" ", "_")}`;
}

function getSCLUrl(name) {
  return `https://skylanderscharacterlist.com/${name
    .replaceAll(" ", "-")
    .toLowerCase()}/`;
}
</script>

<template>
  <div
    class="border-2 border-gray-200 rounded-md w-[375px] h-[130px] text-center mb-5"
  >
    <h1 class="text-left ml-4 mt-2 font-semibold">miscellaneous links</h1>
    <div class="flex align-middle justify-around mt-3">
      <UButton
        class="mt-4"
        size="xl"
        color="blue"
        @click="goto(getSCLUrl(skylander.name))"
        label="View on SCL"
      />
      <UButton
        class="mt-4"
        size="xl"
        color="red"
        @click="goto(getWikiUrl(skylander.name))"
        label="View on Fandom"
      />
    </div>
  </div>
</template>
