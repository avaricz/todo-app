<template>
    <div class="project-container">
        <div class="project-header">
            <div class="project-name">{{ project.name}}</div><div>V</div>
        </div>
        <template v-if="true">
        <div class="project-description">{{ project.description }}</div>
        <div class="project-footer">
            <div>{{ project.people.length }}</div><div>{{ project.deadline }}</div>
        </div>
        </template>
    </div>
    <br>
    <div class="project-container">
        <div class="project-header">
            <div class="project-name">{{ project.name}}</div><div>{{ project.todos.length }}</div>
        </div>
        <div class="project-description">{{ project.description }}</div>
        <div class="project-footer">
            <div>{{ project.people.length }}</div><div>{{ project.deadline }}</div>
        </div>
    </div>
    <br>
    <div class="project-container">
        <div class="project-header">
            <div class="project-name">{{ project.name}}</div><div>{{ project.todos.length }}</div>
        </div>
        <div class="project-description">{{ project.description }}</div>
        <div class="project-footer">
            <div>{{ project.people.length }}</div><div>{{ project.deadline }}</div>
        </div>
    </div>
    
</template>

<script setup>
    import { ref } from 'vue'

    const project = ref({
        name: "Project 1",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi quidem architecto fugiat officiis repellendus voluptatibus quam dolorem atque! Culpa consequuntur debitis accusamus vero dolor laboriosam, iste repellat optio dignissimos perspiciatis?",
        people: ["Adam", "Někdo", "Nikdo", "Ten Taky", "Tamten Též"],
        deadline: "31.12.2024",
        todos: [
            "todo1",
            "todo2",
            "todo3"
        ]
    })
</script>

<style lang="scss" scoped>
@import '@/assets/base.scss';
.project-container {
    background: white;

    display: flex;
    flex-direction: column;
    gap: .8rem;

    border: 1px solid $black-lt;
    border-radius: 10px;

    padding: .7rem;
}
.project-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .project-name {
        font-size: 1.4rem;
        font-weight: bold;
    }
}
.project-description {
    padding-left: 1rem;
    color: $black-lt;
}
.project-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
}



</style>