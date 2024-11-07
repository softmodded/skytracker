<script setup>
const route = useRoute();
const router = useRouter();
const tags = ref({});
const user = ref({});
const userTags = ref([]);
const collection = ref([]);
const wishlist = ref([]);
const loading = ref(true);
const watching = ref([]);

useHead({ title: "skytracker - " + route.params.username });

function goto(url) {
  router.push(url);
}

onMounted(async () => {
  const userdata = await fetch(`/api/v1/users/${route.params.username}/fetch`);
  user.value = await userdata.json();

  const collections = await fetch(`/api/v1/collections/user/${user.value.id}`);
  collection.value = await collections.json();

  const wishlists = await fetch(`/api/v1/wishlist/user/${user.value.id}`);
  wishlist.value = await wishlists.json();

  const watchlist = await fetch(`/api/v1/watching/user/${user.value.id}`);
  watching.value = await watchlist.json();

  const tagData = await fetch(`/api/v1/metadata/tags`);
  tags.value = await tagData.json();

  if (!user.value.publicMetadata?.tags) {
    loading.value = false;
    return;
  }

  for (const tag of user.value.publicMetadata?.tags) {
    userTags.value.push(tags.value.find((t) => t.id === tag));
  }

  setTimeout(() => {
    const tagElements = document.querySelectorAll(".tag");
    tagElements.forEach((tag) => {
      const tagId = tag.id;
      tag.style.backgroundColor =
        "#" + tags.value.find((tag) => tag.id === tagId).color;

      tag.style.color =
        "#" + tags.value.find((tag) => tag.id === tagId).textColor;
    });
    loading.value = false;
  }, 100);
});
</script>

<template>
  <div class="p-12">
    <div
      class="border-2 border-gray-300 rounded-md w-[80rem] mx-auto h-[15rem]"
    >
      <img
        src="@/assets/default-banner.jpg"
        alt="placeholder"
        class="w-full h-full object-cover rounded-sm"
        v-if="!loading"
      />
      <USkeleton v-if="loading" class="w-full h-full rounded-sm" />
      <img
        :src="user.image"
        alt="profile picture"
        class="w-28 h-28 rounded-full -mt-20 mx-auto border-4 border-white object-cover"
        v-if="!loading"
      />
      <USkeleton
        v-if="loading"
        class="w-28 h-28 rounded-full -mt-20 mx-auto border-4 border-white object-cover"
      />
      <div class="text-center">
        <h1 v-if="!loading" class="text-3xl font-bold">{{ user.firstName }}</h1>
        <USkeleton v-if="loading" class="w-24 h-6 mx-auto mt-2" />
        <p v-if="!loading" class="text-lg text-gray-500">
          (@{{ user.username }})
        </p>
        <USkeleton v-if="loading" class="w-20 h-4 mx-auto mt-2" />
        <div class="flex align-middle justify-center mx-auto w-full mt-2">
          <div v-for="tag in userTags" :key="tag.id">
            <span
              class="tag font-bold px-2 py-1 text-sm rounded-lg mx-1"
              :id="tag.id"
              >{{ tag.emoji }} {{ tag.text }}</span
            >
          </div>
        </div>
      </div>
      <USkeleton v-if="loading" class="w-24 h-6 mx-auto mt-2" />
      <div class="flex justify-between">
        <div v-if="!loading" class="flex justify-center mt-6 align-middle ">
          <MiniCollection
            @click="goto(`/@${user.username}/collection`)"
            class="mx-2"
            v-if="collection.length > 0"
            :collection="collection"
          />
          <MiniWishlist
            @click="goto(`/@${user.username}/wishlist`)"
            class="mx-2"
            v-if="wishlist.length > 0"
            :collection="wishlist"
          />
          <MiniWatching
            @click="goto(`/@${user.username}/watching`)"
            class="mx-2"
            v-if="watching.length > 0"
            :collection="watching"
          />
        </div>
        <USkeleton v-if="loading" class="w-[50rem] h-[10rem] mx-auto mt-5" />
        <div v-if="!loading" class="border-2 rounded-md border-gray-200 p-5 w-[40rem] h-[14rem] mt-6 text-center text-gray-500" >
          <p class="h-7 truncate">
            {{ user.publicMetadata?.bio }}
          </p>
          <div class="h-[0.1rem] w-full bg-gray-200 mt-3 mb-4"></div>
          <p>joined on {{ turnDateNice(user.createdAt) }} • last online on {{ turnDateNice(user.lastOnline) }}</p>
          <p>currently <strong>{{ user.banned ? "is" : "not" }}</strong> banned</p>
          <div class="h-[0.1rem] w-full bg-gray-200 my-3"></div>
          <p>has {{ collection.length }} skylanders in their collection</p>
          <p>has {{ wishlist.length }} skylanders on their wishlist</p>
        </div>
      </div>
    </div>
  </div>
</template>
