<template>
    <ListView #persons>
        <PersonItem 
                v-for="(person, index) in personList"
                :key="`person ${index+1}`"
                :person-name="person.firstName + ' ' + person.lastName"
                :person-position="person.positionId"
                :number-of-tasks="person.taskId.length"
                />
    </ListView>
</template>

<script setup>
    import { ref } from 'vue'
    import PersonItem from '@/components/PersonItem.vue'
    import ListView from '@/layouts/ListView.vue';
    import  { persons}   from '@/data/db.js'

    const personList = ref(persons)
</script>