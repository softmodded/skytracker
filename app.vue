<script setup>
const colorMode = useColorMode()
const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
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
  </div>
</template>
