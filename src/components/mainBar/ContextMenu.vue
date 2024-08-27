<template>
        <div id="menu"
        class="new-item-menu menu"
        >
            <Button v-for="button in Buttons"
            
            class="btn"></Button>

            <Button 
            class="btn"
            @click="addTask" 
            text 
            >New task</Button>

            <Button 
            @click="addProject" 
            text 
            >New project</Button>

            <Button  
            @click="addPerson" 
            text 
            >New person</Button>
        </div>
</template>

<script setup>
    import Button from 'primevue/button';
    import { useRouter } from 'vue-router'
    import { onMounted, onUnmounted } from 'vue';

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
    const addProject = () => {
        emit('close-me')
        router.push('form-project')
    }
    const addTask = () => {
        emit('close-me')
        router.push('form-task')
    }
    const addPerson = () => {
        emit('close-me')
        router.push('form-person')
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
    .new-item-menu {
        right: 0;
        margin-right: .5rem;
    }
</style>