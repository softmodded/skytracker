<script setup>
const route = useRoute();
const skylander = ref();
const id = route.params.id;

const fetchSkylander = async () => {
    const response = await fetch(`/api/v1/skylanders/${id}`);
    skylander.value = await response.json();
};

onMounted(fetchSkylander);
</script>

<template>
    <div>
        {{ skylander }}
    </div>
</template>