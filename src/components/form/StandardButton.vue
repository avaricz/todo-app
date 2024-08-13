<template>
    
        <button 
        class="standard-button" 
        :class="{'label-content': label}" 
        :type="type" 
        @click="onClick">
            <slot>{{ label }}</slot>
        </button>
    
</template>

<script setup>
import { defineEmits } from 'vue';

defineProps({
    label: {
        type: String,
        default: "Submit"
    },
    type: {
        type: String,
        required: true,
    }
})

const emit = defineEmits(['onclick'])

const onClick = () => {
    emit('onclick')
}

</script>

<style lang="scss" scoped>
@import '@/assets/base.scss';

.standard-button {
    cursor: pointer;
    font-family: $font-default;
    background: inherit;
    border: 0;
    border-radius: 5px;
    &:active {
        background: $gray-dr;
    }
    
}
.label-content{
    padding: .3rem .5rem;
    border: 1px solid lightgray;
    &:active {
        background: $gray;
    }
}
</style>