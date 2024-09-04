<template>
    <div class="filter-bar">

        <div class="filter-wrapper">

            <i class="pi pi-sort-alt"></i>
            <div class="filter-labels"></div>

            <FilterSelect
            :options="filtersSettings.sort.options"
            :selected-value="filtersSettings.sort.selected"
            @update:selected-value="selectSort"
            >
            </FilterSelect>
        </div>

        <div class="filter-wrapper">
            <i class="pi pi-user"></i>
            <div class="filter-labels"></div>
            <FilterSelect
            :options="filtersSettings.assigned.options"
            :selected-value="filtersSettings.assigned.selected"
            @update:selected-value="selectAssigned"
            >
            </FilterSelect>
        </div>

        <div class="filter-wrapper">
            <i class="pi pi-check-circle"></i>
            <div class="filter-labels"></div>
            <FilterSelect
            :options="filtersSettings.completed.options"
            :selected-value="filtersSettings.completed.selected"
            @update:selected-value="selectCompleted"
            >
            </FilterSelect>
        </div>
    </div>

    <ListView>
        <TaskItem 
                v-for="(task, index) in taskList"
                :key="`task ${index+1}`"
                :task="task"
                :persons="personsByTask(task.id)"
            />
    </ListView>
    <div
    @click="isCopleted">aaa</div>
</template>

<script setup>
    import FilterSelect from '@/components/form/FilterSelect.vue';
    import TaskItem from '@/components/TaskItem.vue';
    import { computed, onMounted, ref } from 'vue';
    import ListView from '@/layouts/ListView.vue';
    import { usePinia } from '@/store';

    
    const pinia = usePinia()
    
    // Data
    const taskList = computed(() => {
        return pinia.tasks.filter(task => {
            const completed = filterCopleted(task)
            const assigned = filterAssigned(completed)

            return assigned
        })
    })
    
    const filtersSettings = ref({
        sort: {
            options:[
                {label: 'name',sort: 'task'},
                {label: 'date',sort: 'date'},
                {label: 'priority',sort: 'priority'}
            ],
            selected: ''
        },
        assigned: {
            options: [
                {label: 'all',sort: 'all'},
                {label: 'assigned',sort: 'assigned'},
                {label: 'unassigned',sort: 'unassigned'}
            ],
            selected: 'all'
        },
        completed: {
            options: [
                {label: 'all',sort: 'all'},
                {label: 'completed',sort: 'completed'},
                {label: 'uncompleted',sort: 'uncompleted'}
            ],
            selected: 'all'
        }
        
    })

    const personsByTask = (taskid) => {
        const filtered = pinia.personsTasks.filter(obj => {
            if(obj.taskid == taskid)
            return obj
        })
        return filtered.map(obj => {
            return {
                id: obj.personid,
                initials: obj.first[0] + obj.last[0]
            }
        })
    }

    // Methods
    const filterCopleted = (task) => {
        const filter = filtersSettings.value.completed.selected
        switch (filter) {
            case 'all':
                return task;
            case 'completed':
                if(task.completed)
                return task
                break
            case 'uncompleted':
                if(!task.completed)
                return task
        }
    }

    const filterAssigned = (task) => {
        const filter = filtersSettings.value.assigned.selected
        switch (filter) {
            case 'all':
                return task
            case 'assigned':
                return pinia.personsTasks.find(conection => conection.taskid === task.id)
            case 'unasigned':
                return 
        }
    }

    function selectSort (e) {
        filtersSettings.value.sort.selected = e
        sortTasks(e)
    }
    function selectCompleted (e) {
        filtersSettings.value.completed.selected = e
    }
    function selectAssigned (e) {        
        filtersSettings.value.assigned.selected = e
    }

    function sortTasks (sortBy) {
        const sorted = pinia.tasks.sort((a, b) => {
            if(sortBy === 'priority'){
                return b.priority - a.priority
            }
            return a[sortBy].localeCompare(b[sortBy])
        })
        return sorted
    }
    
    // Lifecycle hooks
    onMounted(() => {
        pinia.fetchTasks()
        pinia.fetchPersonsTasks()
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/base.scss';
    .filter-bar {
        color: $black-lt;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        width: 100%;
        background: $gray;
        height: 2.5rem;
        position: sticky;
        top: 0;
        .filter-wrapper {
            border: 1px solid $gray-dr;
            border-radius: 5px;
            padding: .2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: .3rem;
            .filter-labels {
                font-size: .8rem;
            }
        }
    }
    .pi {
        color: $black;
        font-size: .7rem;
    }
</style>