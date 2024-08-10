<template>
    <div class="input-container">
        <input v-if="settings.showInput" type="text"
            :id="settings.id"
            :placeholder="settings.placeholder"
            @focus="focus" 
            @blur="blur">

        <div v-if="settings.showIcon" @click="focus" @blur="blur" class="img-wrapper">
            <img width="16px" height="16px" :src="settings.icon" alt="">
        </div>    

            <div v-if="focused" class="list-container">
                <ul>
                    <li class="options-row"
                    v-for="(item, index) in itemsList"
                    :key="item + ' ' + index"
                    @click="onClick(item)">{{  item.name }}</li>
                </ul>
            </div>
    </div>
       
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    settings: Object,
    itemsList: Array,
    selectValue: ""
})

const emit = defineEmits(['selected'])

const focused = ref(false)

// Methods
const onClick = (e) => {
    emit('selected', e)
    focused.value = false
}

const focus = () => {
    focused.value = !focused.value
}

const blur = () => {
    focused.value = !focused.value
}
</script>

<style lang="scss" scoped>
@import '@/assets/base.scss';
.input-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
.img-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .3rem;
    background: inherit;
    border-radius: 5px;
    cursor: pointer;
    img {
        height: 20px;
        width: 20px;
    }
    &:hover {
        background: $gray;
    }
    &:active {
        background: $gray-dr;
    }    
}
.list-container {
    position: absolute;
    right: 0;
    top:30px;
    background: $gray;
    border: .5px solid $gray-dr;
    border-radius: 10px;
    
    box-shadow: 0 0 5px -1px $black-lt;
    ul {
        list-style-type: none;
        padding: 0.3rem;
        li {
            text-wrap: nowrap;
        }
    }
    
}
.options-row {
    padding: .2rem .7rem;
    cursor: pointer;
}
</style>