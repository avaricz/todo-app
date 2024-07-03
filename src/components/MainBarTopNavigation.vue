<template>
    <div class="nav-container">
        <ul class="nav">
            <li v-for="(item, index) in navigationItems" :key="'navigationItem'+index">
                <RouterLink :to="item.link">
                    <img :src="item.imgPath" alt="">
                    {{ item.title }}
                </RouterLink>
                <div class="count">{{ count[index] }}</div>
            </li>
        </ul>
    </div>
    
</template>

<script setup>
    import { ref } from 'vue'
    import { RouterLink } from 'vue-router';
    import { projects, tasks, persons } from '@/data/db.js'
    import navigationItems from '@/data/navigationItems';


    const count = ref([projects.length, tasks.length, persons.length])

</script>

<style lang="scss" scoped>
@import '../assets/base.scss';

.nav {
    list-style-type: none;
    padding: 0;
    
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    gap:.4rem;
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