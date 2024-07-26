<template>
    <div>
        HomePage
    </div>
    <h2>Projects</h2>
    <ul>
        <li v-for="project in projectsList"> {{ project }} </li>
    </ul>
    <h2>Tasks</h2>
    <ul>
        <li v-for="task in tasksList"> {{ task }} </li>
    </ul>
    <h2>Persons</h2>
    <ul>
        <li v-for="person in personsList"> {{ person }} </li>
    </ul>
    <h2>Positions</h2>
    <ul>
        <li v-for="position in positionsList"> {{ position }} </li>
    </ul>
</template>

<script setup>
    import { methods, paths } from '@/data/db1'
    const { get, post, put, delete:del } = methods

    const {
        allPersons,
        allPositions,
        allProjects,
        allTasks,
    } = paths

    const projectsList = await get(allProjects)
    const tasksList = await get(allTasks)
    const personsList = await get(allPersons)
    const positionsList = await get(allPositions)
</script>

<style lang="scss" scoped>

ul {
    border: 1px solid black;
    background-color: azure;
}

li {
    padding: 1rem 0;
}

</style>