<template>
    <ListView #persons>
        <PersonItem 
                v-for="(person, index) in personsList"
                :key="`person ${index+1}`"
                :person-name="person.first + ' ' + person.last"
                :person-position="person.position"
                :number-of-tasks="7"
                />
    </ListView>
</template>

<script setup>
    import { ref } from 'vue'
    import PersonItem from '@/components/PersonItem.vue'
    import ListView from '@/layouts/ListView.vue';
    import {methods, paths} from '@/data/db'

    const personsList = ref(await methods.get(paths.allPersons))
</script>