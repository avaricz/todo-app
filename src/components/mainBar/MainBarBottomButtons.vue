<template>
    <div class="buttons-container">
        <button class="button" @click="addProject">+ Project</button>
        <button class="button" @click="addTask">+ Task</button>
        <button class="button" @click="addPerson">+ Person</button>

       
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const addProject = () => {
    router.push('form-project')
}
const addTask = () => {
    router.push('form-task')
}
const addPerson = () => {
    router.push('form-person')
}

</script>

<style lang="scss" scoped>
@import '@/assets/base.scss';

.buttons-container {
    display: flex;
    justify-content:center;
}
.button {
    flex-grow: 0;

    cursor: pointer;

    font-weight: bold;
    padding: .4rem .7rem;

    border: 0;
    border-radius: 50px;
    border-top: 0px solid $black-lt;
    &:hover {
        background-color: $gray-dr;
    }
    &:active {
        background-color: $gray;
    }
}

</style>