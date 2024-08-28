<template>
        <div id="menu"
        class="new-item-menu menu"
        >
            <Button
            v-for="button in buttonsSettings"
            class="btn"
            @click="addItem(button.path)"
            text
            >
                {{ button.label }}
            </Button>

        </div>
</template>

<script setup>
    import { onMounted, onUnmounted } from 'vue';
    import { useRouter } from 'vue-router';
    import Button from 'primevue/button';

    const emit = defineEmits(['close-me'])
    const router = useRouter()

    defineProps ({
        buttonsSettings: {
            type: Array,
            required: true
        }
    })

    // Methods
    function clickOutside (e) {
        const menu = document.getElementById('menu')
        if(!menu.contains(e.target)) {
            emit('close-me')
        }
    } 

    function addItem (path) {
        emit('close-me')
        //console.log(path)
        router.push(path)

    }

    // Lifecycle hooks
    onMounted (() => {
        document.addEventListener('click', clickOutside)
    })
    onUnmounted (() => {
        document.removeEventListener('click', clickOutside)
    })
</script>

<style lang="scss" scoped>
@import '@/assets/base';
 .menu {
        position: absolute;
        bottom: 50px;
        display: flex;
        gap: .2rem;
        flex-direction: column;
        box-shadow: 0 0 5px -1px $black-lt;
        background: $gray;
        padding: .3rem;
        border-radius: 10px;
        .btn{
            &:hover {
                background: $gray-dr
            }
        }
    }
    
</style>