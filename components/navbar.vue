<script setup>
const router = useRouter();
const colorMode = useColorMode();
const hovering = ref(false);
const { isLoaded, isSignedIn, user } = useUser();
const clerk = useClerk();

const items = ["logo", "account"];

function push(link) {
  router.push(link);
}

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

function goto(link) {
  window.location.href = link;
}

function hover() {
  hovering.value = !hovering.value;
  console.log(hovering.value);
}
</script>

<template>
  <div>
    <div
      class="flex mx-auto align-middle justify-center w-72 text-center select-none"
    >
      <div v-for="item in items" :key="item.name || item" class="mx-auto">
        <img
          v-if="item === 'logo' && !isDark"
          src="~/assets/logo-black.png"
          alt="logo"
          class="h-10 w-10 absolute top-10 mx-auto cursor-pointer ml-10"
          @click="push('/')"
        />
        <img
          v-else-if="item === 'logo' && isDark"
          src="~/assets/logo-white.svg"
          alt="logo"
          class="h-10 w-10 absolute top-10 mx-auto cursor-pointer ml-10"
          @click="push('/')"
        />
        <div v-if="item === 'account' && !isSignedIn" class="absolute top-10">
          <SignInButton
            class="mt-2 ml-3 hover:underline text-sm"
            mode="modal"
          />
        </div>

        <div @click="hover">
          <UAvatar
            :src="user.imageUrl"
            size="xl"
            v-if="item === 'account' && isSignedIn"
            class="absolute right-5 top-7 cursor-pointer border-2 border-gray-200"
          />
          <div
            v-if="item === 'account' && isSignedIn"
            class="absolute right-20 top-5 cursor-pointer h-40"
          >
            <div v-if="hovering && !isDark" class="z-[10000000]">
              <UButton
                color="white"
                :ui="{ rounded: 'rounded-none' }"
                block
                size="sm"
                class="w-36"
                truncate=""
                @click="push('/@' + user.username)"
                :label="'@' + user.username"
              >
                <template #leading>
                  <UAvatar :src="user.imageUrl" size="2xs" /> </template
              ></UButton>
              <UButton
                color="white"
                @click="push('/my/collection')"
                :ui="{ rounded: 'rounded-none' }"
                block
                >My Collection</UButton
              >
              <div
                class="flex border-gray-200 border-b-[2px] border-x-[2px] mx-auto text-center"
              >
                <div class="w-8 mx-auto">
                  <UTooltip
                    text="Friends"
                    :popper="{ arrow: true, placement: 'left' }"
                  >
                    <UButton
                      icon="ic:baseline-people-outline"
                      size="sm"
                      variant="ghost"
                      color="white"
                      :ui="{ rounded: 'rounded-none' }"
                      :trailing="false"
                      class="mx-auto text-center"
                      @click="push('/my/friends')"
                    />
                  </UTooltip>
                </div>
                <div class="w-8 mx-auto">
                  <UTooltip text="Wishlist" :popper="{ arrow: true }">
                    <UButton
                      icon="ic:baseline-format-list-bulleted"
                      size="sm"
                      variant="ghost"
                      color="white"
                      :ui="{ rounded: 'rounded-none' }"
                      :trailing="false"
                      class="mx-auto text-center"
                      @click="push('/my/wishlist')"
                    />
                  </UTooltip>
                </div>
                <div class="w-8 mx-auto">
                  <UTooltip text="Settings" :popper="{ arrow: true }">
                    <UButton
                      icon="ic:outline-settings"
                      size="sm"
                      variant="ghost"
                      color="white"
                      :ui="{ rounded: 'rounded-none' }"
                      :trailing="false"
                      class="mx-auto text-center"
                      @click="push('/my/settings')"
                    />
                  </UTooltip>
                </div>
                <div class="w-8 mx-auto">
                  <UTooltip
                    text="Logout"
                    :popper="{ arrow: true, placement: 'right' }"
                  >
                    <UButton
                      icon="ic:baseline-logout"
                      size="sm"
                      variant="ghost"
                      color="white"
                      :ui="{ rounded: 'rounded-none' }"
                      :trailing="false"
                      @click="clerk.signOut()"
                      class="mx-auto text-center"
                    />
                  </UTooltip>
                </div>
              </div>
            </div>

            <div
              v-if="hovering && isDark"
              class="absolute right-3 top-1 cursor-pointer h-40"
            >
              <UButton
                color="white"
                :ui="{ rounded: 'rounded-none' }"
                block
                size="sm"
                class="w-36"
                truncate=""
                @click="push('/@' + user.username)"
                :label="'@' + user.username"
              >
                <template #leading>
                  <UAvatar :src="user.imageUrl" size="2xs" /> </template
              ></UButton>
              <UButton
                color="white"
                @click="push('/my/collection')"
                :ui="{ rounded: 'rounded-none' }"
                block
                >My Collection</UButton
              >
              <div
                class="flex border-slate-700 border-b-[2px] border-x-[2px] mx-auto text-center bg-slate-900"
              >
                <div class="w-8 mx-auto">
                  <UTooltip
                    text="Friends"
                    :popper="{ arrow: true, placement: 'left' }"
                  >
                    <UButton
                      icon="ic:baseline-people-outline"
                      size="sm"
                      variant="ghost"
                      color="white"
                      :ui="{ rounded: 'rounded-none' }"
                      :trailing="false"
                      class="mx-auto text-center"
                      @click="push('/my/friends')"
                    />
                  </UTooltip>
                </div>
                <div class="w-8 mx-auto">
                  <UTooltip text="Wishlist" :popper="{ arrow: true }">
                    <UButton
                      icon="ic:baseline-format-list-bulleted"
                      size="sm"
                      variant="ghost"
                      color="white"
                      :ui="{ rounded: 'rounded-none' }"
                      :trailing="false"
                      class="mx-auto text-center"
                      @click="push('/my/wishlist')"
                    />
                  </UTooltip>
                </div>
                <div class="w-8 mx-auto">
                  <UTooltip text="Settings" :popper="{ arrow: true }">
                    <UButton
                      icon="ic:outline-settings"
                      size="sm"
                      variant="ghost"
                      color="white"
                      :ui="{ rounded: 'rounded-none' }"
                      :trailing="false"
                      class="mx-auto text-center"
                      @click="push('/my/settings')"
                    />
                  </UTooltip>
                </div>
                <div class="w-8 mx-auto">
                  <UTooltip
                    text="Logout"
                    :popper="{ arrow: true, placement: 'right' }"
                  >
                    <UButton
                      icon="ic:baseline-logout"
                      size="sm"
                      variant="ghost"
                      color="white"
                      :ui="{ rounded: 'rounded-none' }"
                      :trailing="false"
                      @click="goto('/logout')"
                      class="mx-auto text-center"
                    />
                  </UTooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
