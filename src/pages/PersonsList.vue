<template>
    <PersonItem 
            v-for="(person, index) in personList"
            :key="`person ${index+1}`"
            :person-name="person.firstName + ' ' + person.lastName"
            :person-position="person.positionId"
            :number-of-tasks="person.taskId.length"
            />
</template>

<script setup>
    import { ref } from 'vue'
    import PersonItem from '@/components/PersonItem.vue'
    import  { persons}   from '@/data/db.js'

    const personList = ref(persons)


</script>

<style lang="scss" scoped>

</style>