<script setup>
useHead({ title: "skytracker - settings" });

const settingsMetadata = ref();
const tabData = ref([]);
const { user } = useUser();
const page = ref("website");
const clerk = useClerk();
const toast = useToast();
const userSettings = ref();
const { getToken } = useAuth();
const route = useRoute();
const bio = ref("");
const privacySettings = ref({});
const router = useRouter();
const loading = ref(true);
const currentBuild = ref("loading")
const latestBuild = ref("loading")
const language = ref("English");

const languages = ["English", "Spanish", "French", "German", "Italian"];

const goto = (path) => router.push(path);

async function fetchMetadata() {
  const response = await fetch("/api/v1/settings/fetch");
  settingsMetadata.value = await response.json();
  const me = await makeAuthenticatedRequest(`/api/v1/me/metadata`, await getToken.value());
  bio.value = me.bio;
  const arr = [];
  console.log(user.value);
  tabData.value.push([
    {
      avatar: {
        src: user.value.imageUrl,
        size: "2xl",
      },
      label: user.value.username,
      click: () => {
        page.value = "profile";
      },
    },
  ]);
  settingsMetadata.value.categories.forEach(async (category) => {
    arr.push({
      icon: settingsMetadata.value[category].icon,
      label: turnStringNice(category),
      click: () => {
        page.value = category;
      },
    });
  });

  tabData.value.push(arr);

  tabData.value.push([
    {
      label: "Log out",
      icon: "material-symbols:logout",
      click: () => {
        clerk.signOut();
      },
    },
  ]);

  const userSettingRes = await makeAuthenticatedRequest(
    `/api/v1/settings/me/fetch`,
    await getToken.value()
  );

  userSettings.value = userSettingRes;
  privacySettings.value.collection = userSettingRes.collectionVisibility;
  privacySettings.value.wishlist = userSettingRes.wishlistVisibility;
  privacySettings.value.watching = userSettingRes.watchingVisibility;
  privacySettings.value.trackers = userSettingRes.trackers;
  language.value = turnStringNice(userSettingRes.language);
  console.log(userSettingRes);

  const current = await fetch("/api/v1/metadata/buildinfo");
  const currentRes = await current.text();
  currentBuild.value = currentRes.slice(0,7)

  const latestRes = await fetch("/api/v1/metadata/latest");
  const latestBuildRes = await latestRes.text();
  latestBuild.value = latestBuildRes.slice(0,7)
}

watch(page, (newPage) => {
  goto(`/my/settings?page=${newPage}`);
});

onMounted(() => {
  page.value = route.query.page || "website";
  setTimeout(() => {
    fetchMetadata();
    loading.value = false;
  }, 500);
});

async function updateSetting(key, value) {
  const res = await makeAuthenticatedPostRequest(
    `/api/v1/settings/me/update`,
    await getToken.value(),
    {
      setting: key,
      value: value,
    }
  );

  toast.add({
    title: "Message",
    description: res.message,
  });
}

async function updateBio() {
  const res = await makeAuthenticatedPostRequest(
    `/api/v1/me/bio`,
    await getToken.value(),
    {
      bio: bio.value,
    }
  );

  toast.add({
    title: "Message",
    description: "Bio updated",
  });
}
</script>

<template>
  <div class="flex">
    <div v-if="!loading" class="w-64">
      <UVerticalNavigation :links="tabData" />
    </div>
    <div v-if="loading">
      <USkeleton class="w-64 h-[30rem]" />
    </div>
    <div v-if="page == 'profile'">
      <UserProfile class="h-10" />
    </div>
    <div>
      <h1 v-if="page != 'profile'" class="text-xl mx-auto">
        {{ page }}
      </h1>
      <div class="mt-5 ml-10" v-if="page == 'website'">
        <h1 class="text-xl">language</h1>
        <p class="text-sm font-light text-gray-600 mb-2">
          choose the language you'd like to see skytracker in
        </p>
        <USelectMenu
          v-model="language"
          :options="languages"
          @change="updateSetting('language', language.toLowerCase())"
        />
        <h1 class="text-xl mt-5">bio</h1>
        <p class="text-sm font-light text-gray-600 mb-2">
          write a short bio about yourself
        </p>
        <UTextarea
          v-model="bio"
          @change="updateBio"
          placeholder="write a short bio about yourself"
        />
      </div>
      <div class="mt-5 ml-10" v-if="page == 'privacy'">
        <h1 class="text-xl">collection visibility</h1>
        <p class="text-sm font-light text-gray-600 mb-2">
          change the visibility of your collection
        </p>
        <div class="flex">
          <UToggle
            v-model="privacySettings.collection"
            @change="
              updateSetting('collectionVisibility', privacySettings.collection)
            "
          />
          <p
            class="text-sm font-light text-gray-600 ml-2"
            v-if="privacySettings?.collection == true"
          >
            public
          </p>
          <p class="text-sm font-light text-gray-600 ml-2" v-else>private</p>
        </div>
        <h1 class="text-xl">wishlist visibility</h1>
        <p class="text-sm font-light text-gray-600 mb-2">
          change the visibility of your wishlist
        </p>
        <div class="flex">
          <UToggle
            v-model="privacySettings.wishlist"
            @change="
              updateSetting('wishlistVisibility', privacySettings.wishlist)
            "
          />
          <p
            class="text-sm font-light text-gray-600 ml-2"
            v-if="privacySettings?.wishlist == true"
          >
            public
          </p>
          <p class="text-sm font-light text-gray-600 ml-2" v-else>private</p>
        </div>
        <h1 class="text-xl">watching visibility</h1>
        <p class="text-sm font-light text-gray-600 mb-2">
          change the visibility of your watching list
        </p>
        <div class="flex">
          <UToggle
            v-model="privacySettings.watching"
            @change="
              updateSetting('watchingVisibility', privacySettings.watching)
            "
          />
          <p
            class="text-sm font-light text-gray-600 ml-2"
            v-if="privacySettings?.watching == true"
          >
            public
          </p>
          <p class="text-sm font-light text-gray-600 ml-2" v-else>private</p>
        </div>
        
        <h1 class="text-xl">trackers</h1>
        <p class="text-sm font-light text-gray-600 mb-2">
          change the analytics & trackers used
        </p>
        <div class="flex">
          <UToggle
            v-model="privacySettings.trackers"
            @change="
              updateSetting('trackers', privacySettings.trackers)
            "
          />
          <p
            class="text-sm font-light text-gray-600 ml-2"
            v-if="privacySettings?.trackers == true"
          >
            trackers enabled
          </p>
          <p class="text-sm font-light text-gray-600 ml-2" v-else>minimal trackers</p>
        </div>
      </div>
      <div v-if="page == 'about'">
        <p v-if="!currentBuild == latestBuild" class="text-sm mt-3 ml-4 text-gray-500 ">you are on build {{ currentBuild }}, while the latest build is {{ latestBuild }}</p>
        <p v-else class="text-sm mt-3 ml-4 text-gray-500 ">you are on the latest build ({{ latestBuild }})</p>
        <p class="text-xs mt-1 ml-4 text-gray-500">made with love</p>
      </div>
    </div>
  </div>
</template>

<style>
.cl-cardBox {
  box-shadow: none;
  border: none;
  height: 41.1rem;
  margin-top: 1.5rem;
  width: 89rem;
  border-radius: 0;
}
</style>
