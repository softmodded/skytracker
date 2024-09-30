<script setup>
const props = defineProps({
  skylander: Object,
});

const games = [
  "spyros-adventure-figures",
  "giants-figures",
  "swap-force-figures",
  "trap-team-figures",
  "superchargers-figures",
  "imaginators-figures",
];
</script>

<template>
  <div
    class="border-2 border-gray-200 rounded-md w-[240px] h-[335px] text-center mb-5"
  >
    <h1 class="text-left ml-4 mt-2 font-semibold">game compatability</h1>
    <p class="text-left ml-4 font-thin text-xs">
      ({{ getFriendlyGameName(props?.skylander?.game) }})
    </p>

    <div class="mx-auto">
      <div v-for="game in games" class="flex justify-around align-middle mt-1" :key="game">
        <img
          :src="`/assets/games/${game}.png`"
          class="h-8 mt-2"
          alt="Game Image"
        />
        <Icon class="h-6 w-6 mt-2" v-if="getNumberFromGame(game) >= getNumberFromGame(props?.skylander?.game)" name="material-symbols:check" />
        <Icon class="h-6 w-6 mt-2" v-else name="material-symbols:close-rounded" />
      </div>
    </div>
  </div>
</template>
