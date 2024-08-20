<template>
    <div class="buttons-container">
        
        <Button  size="small" text class="main-button">
            <i class="pi pi-cog"></i>
        </Button>
        
        <Button @click="showMenu" text class="main-button">
            <i class="pi pi-plus"></i>
        </Button>
        <div v-if="show" class="buttons-wrapper">
            <Button label="Secondary" @click="addTask" >New task</Button>
            <Button label="Secondary" @click="addProject" >New project</Button>
            <Button  @click="addPerson" >New person</Button>
        </div>

    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import { ref } from 'vue';

const router = useRouter()

const show = ref(true)
function showMenu () {
    show.value = !show.value
}

const addProject = () => {
    router.push('form-project')
    showMenu()
}
const addTask = () => {
    router.push('form-task')
    showMenu()
}
const addPerson = () => {
    router.push('form-person')
    showMenu()
}

</script>

<style lang="scss" scoped>
@import '@/assets/base.scss';

.buttons-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 1rem;
    height: 3rem;
    padding-right: 1rem;
    .buttons-wrapper {
        position: absolute;
        bottom: 50px;
        right: 0;
        margin-right: 1rem;
        display: flex;
        gap: .2rem;
        flex-direction: column;
        .main-button {
            &:hover {
                background: $gray-dr;
            }
        }
    }
}
</style>