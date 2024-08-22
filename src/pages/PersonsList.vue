<template>
    <ListView>
        <PersonItem 
                v-for="(person, index) in personsList"
                :key="`person ${index+1}`"
                :person="person"
                :number-of-tasks="7"
                />
    </ListView>
</template>

<script setup>
    import PersonItem from '@/components/PersonItem.vue'
    import ListView from '@/layouts/ListView.vue';
    import { computed, onMounted } from 'vue'
    import { usePinia } from '@/store';

    const pinia = usePinia()
    const personsList = computed(()=> pinia.persons.sort((a,b) => a.id - b.id
    ))

    onMounted(()=>{
        pinia.fetchPersons()
    })
</script>