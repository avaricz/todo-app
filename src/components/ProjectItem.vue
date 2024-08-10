<template>

    <div class="project-container">

        <div class="project-header">
            <div class="project-name">{{ name }} <span>details</span></div><!-- TODO - po kliknutí na Name otevřít kompletní detail projektu se všemi členy, todos, atd.. -->
            <div class="arrow-area" @click="onClick">
                <img src="@/img/icons/arrow-down.svg" alt="" :class="{opened: show}">
            </div>
        </div>

            <template v-if="show">

                <div class="project-description">{{ description }}</div>

                <div class="project-footer">
                    <div class="persons-area">
                        <img src="@/img/icons/persons.svg" alt="">
                        {{ people }}
                    </div>
                    <div class="deadline-area">
                        <img src="@/img/icons/calendar.svg" alt="">
                        {{ deadline }}
                    </div>
                </div>

            </template>

    </div>    

</template>

<script setup>
    defineProps({
        name: String,
        description: String,
        people: Number,
        deadline: String, //TODO změnit props na Date
        show: Boolean
    })

    const emit = defineEmits(['clicked'])

    const onClick = () => {
        emit('clicked')
    }

</script>

<style lang="scss" scoped>
@import '@/assets/base.scss';
.project-container {
    background: white;

    display: flex;
    flex-direction: column;
    gap: .8rem;

    border: .5px solid $black-lt;
    border-radius: 10px;
    //box-shadow: 0 0 5px -1px $black-lt;

    padding: 1rem;
}
.project-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .project-name {
        display: flex;
        align-items: center;

        font-size: 1.4rem;
        font-weight: bold;

        cursor: pointer;
        span {
            display: none;
            font-size: .8rem;
            color: $black-lt;
            background: $gray;
            padding: .3rem .7rem;
            border-radius: 50px;
            margin-left: 1rem;
        }
    }
    .project-name:hover{
        span {
        display:block
    }
    } 
    .arrow-area {
        display: flex;
        align-items: center;
        cursor: pointer;
        img {
            height: 1rem;
            transition: all .3s linear;
        }
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
    .persons-area, .deadline-area {
        display: flex;
        align-items: center;
        gap: .5rem;
        img {
            height: 1rem;
        }
    }
}
.opened {
    transform: rotateX(180deg);
}




</style>