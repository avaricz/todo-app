<template>
    <div class="nav-container">

        <RouterLink to="/">
            HOME
        </RouterLink>

        <ul class="nav">

            <li v-for="(item, index) in navigationItems" :key="'navigationItem'+index">

                <RouterLink :to="item.link">
                    <img :src="item.imgPath" alt="">
                    {{ item.title }}
                </RouterLink>
                
                 <div class="count">{{ countOfItems[index] }}</div>
                
            </li>

        </ul>
    </div>
    
</template>

<script setup>
    import { ref, onMounted} from 'vue'
    import { RouterLink } from 'vue-router';
    import { methods, paths } from '@/data/db1.js'

    const { 
        allProjects,
        allTasks,
        allPersons
    } = paths

    const navigationItems = [
        {
            title: "Projects",
            imgPath: "src/img/icons/projects.svg",
            link: "/projects"
        },
        {
            title: "Tasks",
            imgPath: "src/img/icons/task.svg",
            link: "/tasks"
        },
        {
            title: "Persons",
            imgPath: "src/img/icons/persons.svg",
            link: "/persons"
        }
    ]

    const countOfItems = ref([])
    const itemsPath = [allProjects, allTasks, allPersons]

    const  getItemCount = async (path) => { 
        const itemData = await methods.get(path)
        return  itemData.length
    }

    onMounted(async () => {
        for (let i = 0; i < itemsPath.length; i++){
            const data = await getItemCount(itemsPath[i])
            countOfItems.value[i] = data
        }
    })
</script>

<style lang="scss" scoped>
@import '../assets/base.scss';

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