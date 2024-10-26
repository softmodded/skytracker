<script setup>
const router = useRouter();
const { user, isSignedIn } = useUser();
function push(link) {
  router.push(link);
}
</script>

<template>
  <div class="flex flex-wrap justify-center gap-4">
    <div
      v-for="(item, index) in [
        { icon: 'material-symbols:collections-bookmark', text: 'jump to collection', link: '/my/collection' },
        { icon: 'material-symbols:menu-book', text: 'jump to figures', link: '/figures/all' },
      ]"
      :key="index"
      class="border-2 border-gray-200 rounded-md w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)] h-[150px] sm:h-[175px] md:h-[200px] text-center cursor-pointer transition-all hover:scale-105"
      @click="push(item.link)"
    >
      <Icon
        :name="item.icon"
        class="mt-4 sm:mt-6 md:mt-8 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
        color="black"
      />
      <div class="flex text-center mx-auto align-middle justify-center">
        <p class="mt-3 sm:mt-4 md:mt-5 text-lg sm:text-xl font-bold">{{ item.text }}</p>
        <Icon class="h-5 w-5 sm:h-6 sm:w-6 mt-4 sm:mt-5 md:mt-6 ml-2" name="material-symbols:arrow-forward" />
      </div>
    </div>

    <SignInButton v-if="!isSignedIn" v-slot="props" as-child>
      <div
        v-bind="props"
        class="border-2 border-gray-200 rounded-md w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)] h-[150px] sm:h-[175px] md:h-[200px] text-center cursor-pointer transition-all hover:scale-105"
      >
        <Icon
          name="material-symbols:account-circle"
          class="mt-4 sm:mt-6 md:mt-8 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
          color="black"
        />
        <div class="flex text-center mx-auto align-middle justify-center">
          <p class="mt-3 sm:mt-4 md:mt-5 text-lg sm:text-xl font-bold">jump to profile</p>
          <Icon class="h-5 w-5 sm:h-6 sm:w-6 mt-4 sm:mt-5 md:mt-6 ml-2" name="material-symbols:arrow-forward" />
        </div>
      </div>
    </SignInButton>

    <div
      v-if="isSignedIn"
      class="border-2 border-gray-200 rounded-md w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)] h-[150px] sm:h-[175px] md:h-[200px] text-center cursor-pointer transition-all hover:scale-105"
      @click="push('/@' + user.username)"
    >
      <img class="mt-4 sm:mt-6 md:mt-8 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto border-2 rounded-full" :src="user.imageUrl" />
      <div class="flex text-center mx-auto align-middle justify-center">
        <p class="mt-3 sm:mt-4 md:mt-5 text-lg sm:text-xl font-bold">jump to profile</p>
        <Icon class="h-5 w-5 sm:h-6 sm:w-6 mt-4 sm:mt-5 md:mt-6 ml-2" name="material-symbols:arrow-forward" />
      </div>
    </div>
  </div>
</template>