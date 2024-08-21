<template>
    <div>
        HomePage
    </div>

    <h2>Projects</h2>
    <pre>{{ projectsList }}</pre>
    <h2>Tasks</h2>
    <pre>{{ tasksList }}</pre>
    <h2>Persons</h2>
    <pre>{{ personsList }}</pre>
    <h2>Positions</h2>
    <pre>{{ positionsList }}</pre>
    <h2>PersonsTasks</h2>
    <pre>{{ PersonstasksList }}</pre>


</template>

<script setup>
    import { methods, paths } from '@/data/db'

    const { get, delete:del } = methods
    const { allPersons, allPositions, allProjects, allTasks,allPersonstasks } = paths

    const projectsList = await get(allProjects)
    //const tasksList = await get(allTasks)
    const personsList = await get(allPersons)
    const positionsList = await get(allPositions)
    const PersonstasksList = await get(allPersonstasks)

</script>

<style lang="scss" scoped>

pre {
    border: 1px solid black;
    background-color: azure;
    margin: 2rem ;
}

</style>