<template>
    <textarea class="textarea"
    :id="settings.control"
    :placeholder="settings.placeholder || ''"
    :autofocus="settings.autofocus || false"
    :rows="settings.rows || 5"
    :cols="settings.cols || 30"
    :maxlength="settings.maxlength || ''"
    v-model="settings.inputValue"></textarea>
</template>

<script setup>

defineProps({
    settings: Object
})

</script>

<style lang="scss" scoped>

@import '@/assets/base.scss';

.textarea {
    font-family: $font-default;
    font-size: 1.1rem;
    font-weight: 400;
    color: $color-text;
    padding: 1rem;
    border: 0;
    border-radius: 10px;
    background: inherit;
    outline: 0;
    resize: none;
    &:focus {
        box-shadow: 0 0 5px -1px $black-lt;
    }
}
</style>