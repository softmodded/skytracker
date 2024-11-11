<script setup>
const year = new Date().getFullYear();
</script>

<template>
  <footer>
    <div
      class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between"
    >
    <!--i don't know a whole lot about legal, so if someone stumbles across this and knows if i should actually have a copyright message, feel free to pr-->
      <span class="text-sm text-gray-500 sm:text-center "
        >Skytracker is made possible by its contributors. © {{ year }} Skytracker. All rights reserved.
      </span>
      <ul
        class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0"
      >
        <li>
          <a href="https://github.com/softmodded/skytracker" class="hover:underline me-4 md:me-6">Github</a>
        </li>
        <li>
          <a href="#" class="hover:underline me-4 md:me-6">Privacy</a>
        </li>
        <li>
          <a href="https://github.com/softmodded/skytracker/blob/master/LICENSE" class="hover:underline me-4 md:me-6">Licensing</a>
        </li>
        <li>
          <a href="#" class="hover:underline">Discord</a>
        </li>
      </ul>
    </div>
  </footer>
</template>
