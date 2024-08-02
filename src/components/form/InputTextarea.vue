<template>
    <textarea 
    :id="settings.control"
    :placeholder="settings.placeholder || ''"
    :autofocus="settings.autofocus || false"
    :rows="settings.rows || 10"
    :cols="settings.cols || 30"
    v-model="settings.inputValue"></textarea>
</template>

<script setup>

defineProps({
    settings: Object
})

</script>

<style lang="scss" scoped>

</style>