<template>
    <div class="container">
        <h2>Projects</h2>
        <ul>
            <li v-for="project in projectsList">{{ project }}</li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue'


const projectsList = ref([ "jedna",  "dva", "tři", "čtyři" ])


</script>

<style lang="scss" scoped>
@import "@/assets/main.scss";

.container {
    min-height: 100vh;
    background: $color-background-mainbar
}

</style>