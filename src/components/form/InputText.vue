<template>
    <input 
    type="text"
    :id="settings.id"
    :placeholder="settings.placeholder || ''"
    :autofocus="settings.autofocus || false"
    :maxlength="settings.maxlength"
    v-model="settings.inputValue"/>   
</template>

<script setup>

defineProps({
    settings: Object
})

</script>

<style lang="scss" scoped>
@import '@/assets/base.scss';

input {
    font-family: $font-default;
    font-size: 1.4rem;
    font-weight: bold;
    color: $color-text;
    padding: 1rem;
    border: 0;
    border-radius: 10px;
    outline-width: 0px;
    background: inherit;
    &:focus {
        box-shadow: 0 0 5px -1px $black-lt;
    }
}

</style>