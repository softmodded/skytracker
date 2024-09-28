<script setup>
const router = useRouter();

function push(link) {
  router.push(link);
}
</script>

<template>
  <div>
    <div
      class="border-2 border-gray-200 rounded-md w-[620px] h-[195px] text-center mb-5"
    >
      <div class="flex mb-2">
        <Icon name="material-symbols:notifications-outline" class="w-6 h-6 mt-3 ml-3" />
        <h1 class="ml-1 mt-2 text-left font-semibold text-lg">notifications</h1>
      </div>
      <div
        class="w-full h-[40px] flex border-t-2 border-gray-200  cursor-pointer hover:bg-gray-100 transition-all"
      >
        <p class="font-bold text-lg w-1/4 text-left ml-2 mt-0.5 truncate mr-4">
          Price drop alert!
        </p>
        <p class="truncate mt-1">
          The price for <strong>Stump smash</strong> has dropped below your
          threshold of <strong>$21.99</strong>
        </p>
      </div>
      <div
        class="w-full h-[40px] flex border-t-2 border-gray-200  cursor-pointer hover:bg-gray-100 transition-all"
      >
        <p class="font-bold text-lg w-1/4 text-left ml-2 mt-0.5 truncate mr-4">
          Price drop alert!
        </p>
        <p class="truncate mt-1">
          The price for <strong>Stump smash</strong> has dropped below your
          threshold of <strong>$21.99</strong>
        </p>
      </div>
      <div
        class="w-full h-[40px] flex border-t-2 border-gray-200 border-b-2  cursor-pointer hover:bg-gray-100 transition-all"
      >
        <p class="font-bold text-lg w-1/4 text-left ml-2 mt-0.5 truncate mr-4">
          Price drop alert!
        </p>
        <p class="truncate mt-1">
          The price for <strong>Stump smash</strong> has dropped below your
          threshold of <strong>$21.99</strong>
        </p>
      </div>
      <a href="#" @click="push('/updates/2024-9-28')" class="underline">see more →</a>
    </div>




    <div
      class="mt-4 border-2 border-gray-200 rounded-md w-[620px] h-[195px] text-center"
    >
      pending requests
    </div>
  </div>
</template>
