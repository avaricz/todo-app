<template>
    <input type="text"
    :id="settings.id"
    :placeholder="settings.placeholder"
    v-model="settings.inputValue">
</template>

<script setup>

defineProps({
    settings: Object
})

</script>

<style lang="scss" scoped>
input{
    width: 80px;
}
</style>