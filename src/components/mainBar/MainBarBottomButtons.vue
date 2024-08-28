<template>
    <div class="buttons-container">
        
        <Button
        size="small"
        text class="main-button"
        @click.stop="showSettingsMenu"
        >
            <i class="pi pi-cog"></i>
        </Button>

        <ContextMenu
        class="left"
        v-if="settingsMenu"
        :buttons-settings="settingsMenuList"
        @close-me="showSettingsMenu"
        />
        
        <Button
        @click.stop="showNewItemsMenu"
        text
        class="main-button"
        >
            <i class="pi pi-plus"></i>
        </Button>

        <ContextMenu
        class="right"
        v-if="newItemsMenu"
        :buttons-settings="newItemsMenuList"
        @close-me="showNewItemsMenu"
        />

    </div>
</template>

<script setup>
    import ContextMenu from '@/components/mainBar/ContextMenu.vue';
    import Button from 'primevue/button';
    import { ref } from 'vue';

    
    //Data
    const settingsMenu = ref(false)
    const newItemsMenu = ref(false)
    const newItemsMenuList = [
        { path: '/form-project', label: "New project" },
        { path: '/form-task', label: "New task" },
        { path: '/form-person', label: "New person" }
    ]
    const settingsMenuList = [
        { path: '/edit-positions', label: "Edit positions" },
    ]

    //Methods
    function showSettingsMenu () {
        settingsMenu.value = !settingsMenu.value
    }
    function showNewItemsMenu () {
        newItemsMenu.value = !newItemsMenu.value
    }

</script>

<style lang="scss" scoped>
@import '@/assets/base.scss';

.buttons-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 1rem;
    height: 3rem;
    padding-right: 1rem;
    .main-button {
        &:hover {
            background: $gray-dr;
        }
    }
    .right {
        right: 0;
        margin-right: .5rem;
    }
    .left {
        left: 0;
        margin-left: .5rem;
    }
}
</style>