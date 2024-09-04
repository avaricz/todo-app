<template>

    <select
    :value="selectedValue"
    @change="onSelectChange">
        <option
        v-for="option in options"
        :value="option.sort"
        >
            {{ option.label }}
        </option>

    </select>

</template>

<script setup>

const props = defineProps({
    options: Array,
    settings: Object,
    selectedValue: String,
})

const emit = defineEmits(['update:selectedValue'])

function onSelectChange (e) {
    emit('update:selectedValue', e.target.value)
}
</script>

<style lang="scss" scoped>
@import '@/assets/base.scss';
select {
    background:inherit;
    border: 0px solid $gray-dr;
    color: $black-lt;
    outline: 0;
    }

</style>
