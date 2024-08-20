<template>

    <div class="person-container">

        <div class="avatar"> {{ initials }}</div>

        <div class="name-area"> {{ person.first + " " + person.last }} </div>

        <div class="position-area"> {{ person.position }} </div>

        <div class="task-area">

            <img src="@/img/icons/task.svg" alt="">
            {{ numberOfTasks }} / X

        </div>

       <div class="overdue-label"> {{ overdueLabel }} </div>
        
    </div>

</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    person: {
        type: Object,
        required: true,
    },
    numberOfTasks: {
        type: Number,
        required: true,
    },
    overdueLabel: {
        type: String,
        default: "overdue"
    }
})

const initials = ref(props.person.first[0].toUpperCase() + props.person.last[0].toUpperCase())
console.log(initials.value)

</script>

<style lang="scss" scoped>
@import '@/assets/base.scss';
.person-container {
    border: 0px solid $black-lt;
    border-radius: 50px;
    display: flex;
    align-items: center;

    padding: .1rem;

    position: relative;
    .avatar {
        border: 1px solid $black-lt;
        border-radius: 50%;

        display: flex;
        align-items: center;
        justify-content: center;

        width: 2rem;
        height: 2rem;
        background: $gray;

        font-size: 1rem;
        font-weight: bold;
    }
    .name-area {
        font-size: 1rem;
        font-weight: 500;
        margin-left: 1rem;
    }
    
    .task-area, .position-area, .name-area {
        display: flex;
        align-items: center;
        border: 1px solid black;
        gap: .3rem;
        img {
            height: 1rem;
            filter: opacity(40%);
        }
    }

    .task-area, .position-area {
        color: $black-lt;
        margin-left: 2rem;
    }

    .overdue-label {
    color: $red;
    font-size: .8rem;
    border: 1px $red solid;
    border-radius: 10px;
    position: absolute;
    right: .7rem;
    padding: .1rem .3rem;
}
}


</style>