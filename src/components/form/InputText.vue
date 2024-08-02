<template>
    <input 
    type="text"
    :id="settings.control"
    :placeholder="settings.placeholder || ''"
    :autofocus="settings.autofocus || false"
    v-model="settings.inputValue"/>   
</template>

<script setup>

defineProps({
    settings: Object
})

</script>

<style lang="scss" scoped>

</style>