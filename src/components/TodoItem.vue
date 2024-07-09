<template>
    <div class="task-container" :class="{bordered: show}" @mouseover="$emit('under-mouse')" @mouseleave="$emit('not-mouse')">

        <div class="task-header">     

            <div class="task-title-area">
                <input type="checkbox">
                {{ title }} 
                <span v-if="isMouseOver || show" class="priority no-priority">{{ priorityLabel }}</span>
                <span v-else class="label low-priority"></span>
            </div>

            <div class="arrow-area" @click="$emit('clicked')">
                <img v-if="isMouseOver || show" src="@/img/icons/arrow-down.svg" alt="" :class="{opened: show}">
            </div>

        </div>   
        
        <div v-if="show" class="task-body" >{{ content }}</div>

    </div>

    
 
</template>

<script setup>

 defineProps({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: false
    },
    priorityLabel: {
        type: String,
        default: "no priority"
    },
    show: {
        type: Boolean,
        default: false,
    },
    isMouseOver: {
        type: Boolean,
        required: true
    }
 })


</script>

<style lang="scss" scoped>
@import '@/assets/base.scss';
.task-container {
    transition: all .3s linear;
    box-sizing:content-box;

    border-radius: 10px;
    padding: .5rem .3rem;

    .task-header {
        display:flex;
        align-items: center;
        justify-content: space-between;
        .task-title-area {
            display: flex;
            align-items: center;
            gap: .5rem;
            .priority {
                color: $black-lt;
                font-size: .7rem;
                padding: .1rem .7rem;
                border-radius: 10px;
            }
        }
        .arrow-area {
            img {
                height: .8rem;
                transition: all .3s linear;
            }
        }
    }
    .task-body {
        padding: 1rem;
    }

}

    .bordered {
        border: .5px solid $black-lt;
        //box-shadow: 0px 5px 15px  $black-lt;
    }
    
    .opened {
        transform: rotateX(180deg);
    }

    .label {
        width: .7rem;
        height: .7rem;
        border-radius: 10px;
    }
    
    .low-priority{
        background: $green-lt;
    }
    .mid-priority{
        background: $yellow-lt;
    }
    .high-priority{
        background: $red-lt;
    }
    .no-priority{
        background: $gray;
    }



</style>