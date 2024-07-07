<template>
    <div>
        <ul>
            <li v-for="item in database">{{item}}</li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import  { projects}  from '@/data/db.js'

const database = ref(projects.map(item => item.project))
</script>

<style lang="scss" scoped>
</style>