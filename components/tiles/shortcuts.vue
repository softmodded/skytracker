<script setup>
const router = useRouter();
const { user, isSignedIn } = useUser();

function push(link) {
  router.push(link);
}
</script>

<template>
  <div class="flex">
    <div
      class="border-2 border-gray-200 rounded-md w-[413px] h-[200px] text-center cursor-pointer transition-all hover:scale-105"
      @click="push('/my/collection')"
    >
      <Icon
        name="material-symbols:collections-bookmark"
        class="mt-8 w-20 h-20"
        color="black"
      />
      <div class="flex text-center mx-auto align-middle justify-center">
        <p class="mt-5 text-xl font-bold">jump to collection</p>
        <Icon class="h-6 w-6 mt-6 ml-2" name="material-symbols:arrow-forward" />
      </div>
    </div>
    <div
      class="border-2 border-gray-200 rounded-md w-[413px] h-[200px] text-center cursor-pointer transition-all hover:scale-105 mx-5"
      @click="push('/figures/all')"
    >
      <Icon
        name="material-symbols:menu-book"
        class="mt-8 w-20 h-20"
        color="black"
      />
      <div class="flex text-center mx-auto align-middle justify-center">
        <p class="mt-5 text-xl font-bold">jump to figures</p>
        <Icon class="h-6 w-6 mt-6 ml-2" name="material-symbols:arrow-forward" />
      </div>
    </div>
    <SignInButton v-slot="props" v-if="!isSignedIn" as-child>
      <div
        v-bind="props"
        class="border-2 border-gray-200 rounded-md w-[413px] h-[200px] text-center cursor-pointer transition-all hover:scale-105"
        v-if="!isSignedIn"
      >
        <Icon
          name="material-symbols:account-circle"
          class="mt-8 w-20 h-20"
          color="black"
        />
        <div class="flex text-center mx-auto align-middle justify-center">
          <p class="mt-5 text-xl font-bold">jump to profile</p>
          <Icon
            class="h-6 w-6 mt-6 ml-2"
            name="material-symbols:arrow-forward"
          />
        </div>
      </div>
    </SignInButton>

    <div
      class="border-2 border-gray-200 rounded-md w-[413px] h-[200px] text-center cursor-pointer transition-all hover:scale-105"
      v-if="isSignedIn"
      @click="push('/@' + user.username)"
    >
      <img class="mt-8 w-20 h-20 mx-auto border-2 rounded-full" :src="user.imageUrl" />
      <div class="flex text-center mx-auto align-middle justify-center">
        <p class="mt-5 text-xl font-bold">jump to profile</p>
        <Icon class="h-6 w-6 mt-6 ml-2" name="material-symbols:arrow-forward" />
      </div>
    </div>
  </div>
</template>
