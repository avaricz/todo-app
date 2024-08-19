<template>
    <div class="nav-container">

        <ul class="nav">
            <li class="home-link">
                <RouterLink to="/">
                    <img src="@/img/icons/home.svg" alt="">HOME
                </RouterLink>
            </li>

            <li v-for="(item, index) in navigationItems" :key="'navigationItem'+index">

                <RouterLink :to="item.link">
                    <img :src="item.imgPath" alt="">
                    {{ item.title }}
                </RouterLink>
                
                 <div class="count">{{ item.count }}</div>
                
            </li>

        </ul>
    </div>

</template>

<script setup>
    import { usePinia } from '@/store';
    import { RouterLink } from 'vue-router';
    import {  computed } from 'vue'
    
    const pinia = usePinia()

   

    const navigationItems = computed(() => {
        return [
        {
            title: "Projects",
            imgPath: "./src/img/icons/projects.svg",
            link: "/projects",
            count: pinia.projects.length,
        },
        {
            title: "Tasks",
            imgPath: "./src/img/icons/task.svg",
            link: "/tasks",
            count: pinia.projects.reduce((acc,cur) => acc + cur.taskscount, 0),

        },
        {
            title: "Persons",
            imgPath: "./src/img/icons/persons.svg",
            link: "/persons",
            count: pinia.projects.length ? pinia.projects[0].personscount : 0,
        }
    ]})

</script>

<style lang="scss" scoped>
@import '../../assets/base.scss';

.home-icon {
    height: 1rem;
    width: 1rem;
}
.nav {
    list-style-type: none;
    padding: 0;
    
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    gap:.4rem;
    .home-link {
        margin-bottom: 1rem;
    }
    li {
        display: flex;
        img {
            height: 1rem;
            width: 1rem;
        }
        a {
            display:flex;
            align-items:center;
            gap: .5rem;

            font-size: .9rem;
            font-weight: bold;

            text-decoration: none;
            color: $blue;
        } 
        .count {
            font-size: .8rem;
            color: $black-lt;
            margin-left: auto;
        } 
    }
}
</style>