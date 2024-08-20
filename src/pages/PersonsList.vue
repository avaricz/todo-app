<template>
    <ListView>
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
    import PersonItem from '@/components/PersonItem.vue'
    import ListView from '@/layouts/ListView.vue';
    import { usePinia } from '@/store';
    import { computed, onMounted } from 'vue'

    const pinia = usePinia()
    const personsList = computed(()=> pinia.persons)

    onMounted(()=>{
        pinia.fetchPersons()
    })
</script>