<template>
    <ListView>
        <PersonItem 
                v-for="(person, index) in personsList"
                :key="`person ${index+1}`"
                :person="person"
                :number-of-tasks="7"
                @click.stop="openDetail(person.id)"
                />
    </ListView>
</template>

<script setup>
    import PersonItem from '@/components/PersonItem.vue'
    import ListView from '@/layouts/ListView.vue';
    import { computed, onMounted } from 'vue'
    import { useRouter } from 'vue-router';
    import { usePinia } from '@/store';

    const router = useRouter()
    const pinia = usePinia()
    // Data
    const personsList = computed(()=> pinia.persons.sort((a,b) => a.id - b.id
    ))

    // Methods
    function openDetail(personid) {
        router.push(`/person-detail/${personid}`)
    }

    // Lifecycle hooks
    onMounted(()=>{
        pinia.fetchPersons()
    })
</script>