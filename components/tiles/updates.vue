<script setup>
const router = useRouter();

function push(link) {
    router.push(link);
}
</script>

<template>
    <div>
        <div class="border-2 border-gray-200 rounded-md w-[310px] h-[410px] text-center">
            <h1 class="mt-4 font-bold text-2xl">updates</h1>
            <h3 class="mt-2 font-semibold text-xl">2024-9-28</h3>
            <ul class="mt-0.5">
                <li>- added new skylanders</li>
                <li>- added new figures</li>
                <li>- added new games</li>
                <li>- added new features</li>
                <a href="#" @click="push('/updates/2024-9-28')" class="underline">see more →</a>
            </ul>

            <h3 class="mt-4 font-semibold text-xl">2024-9-28</h3>
            <ul class="mt-0.5">
                <li>- added new skylanders</li>
                <li>- added new figures</li>
                <li>- added new games</li>
                <li>- added new features</li>
                <a href="#" @click="push('/updates/2024-9-28')" class="underline">see more →</a>
            </ul>

            
        </div>
    </div>
</template>