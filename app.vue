<script setup>
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

const route = useRoute();
const toast = useToast()

const routeWatcher = watch(() => route.path, (path) => {
  if (pagesWithLocalModes.includes(path)) {
    const lastReminded = localStorage.getItem("localModeReminder");
    if (!lastReminded || Date.now() - lastReminded > 1000 * 60 * 60 * 24) {
      toast.add({
        title: "Local Mode",
        description:
          "All data on this page is local, and may not persist correctly. To enable the full experience, please sign in.",
        status: "info",
        duration: 10000,
        isClosable: true,
      });
      localStorage.setItem("localModeReminder", Date.now());
    }
  }
});
</script>

<template>
  <div>
      <NuxtLayout>
        <NuxtPage />
        <!--at the bottom left corner of the page (never moves)-->
        <div class="fixed bottom-0 left-0 p-4">
          <UButton
            :icon="
              isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
            "
            color="gray"
            variant="ghost"
            aria-label="Theme"
            @click="isDark = !isDark"
          />
        </div>
      </NuxtLayout>
    <UNotifications />
  </div>
</template>
