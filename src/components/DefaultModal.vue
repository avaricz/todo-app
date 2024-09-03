<template >
    <div class="modal-bg">
      <div class="modal-body" id="modal-body">
        <div class="modal-header" >
          <div>{{ header }}</div>
          <i class="pi pi-times pointer" @click.stop="$emit('cancel')"></i>
        </div>
        <div class="modal-content">
          {{  msg }}
        </div>
        <div class="modal-footer">
          <Button v-if="cancelBtn" @click.stop="cancel" outlined>{{ cancelLabel }}</button>
          <Button v-if="confirmBtn" @click.stop="confirm">{{ confirmLabel }}</button>
        </div>
      </div>
    </div>
  </template>
  
<script setup>
  import Button from 'primevue/button';
  import { onMounted, onUnmounted } from 'vue'

  const props = defineProps({
    msg: String,
    header: String,
    cancelBtn: {
      type: Boolean,
      default: false
    },
    confirmBtn: {
      type: Boolean,
      default: false
    },
    cancelLabel: {
      type: String,
      default: 'cancel'
    },
    confirmLabel: {
      type: String,
      default: 'OK'
    },
    data: {
      type: Number,
    }
  })

  const emit = defineEmits(['close-me', 'confirm', 'cancel'])

  // Methods
  function clickOutside (e) {
    e.stopPropagation()
    const el = document.getElementById('modal-body')
    if(!el.contains(e.target)) {
      emit('close-me')
    }
  }

  function confirm () {
    emit('confirm', props.data)
  }
  function cancel () {
    emit('cancel')
  }

  
  // Lifecycle hooks
  onMounted (() => {
      document.addEventListener('click', clickOutside)
  })

  onUnmounted (() => {
      document.removeEventListener('click', clickOutside)
  })   
        

  </script>
  
  <style lang="scss" scoped>
    @import '@/assets/base.scss';
    .modal-bg {
      width: 100vw;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, .2);
    }
    .modal-body {
      border: .5px solid $black-lt;
      border-radius: 10px;
      min-width: 300px;
      min-height: 100px;
      background: white;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 1.5rem;
      color: $black;
      div {
        font-weight: bold;
      }
    }
    .modal-content {
      flex-grow: 1;
      font-size: 1.1rem;
      color: $black;

    }
    .modal-footer {
      flex-basis: 30px;
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      align-items: center;
    }
    .pointer {
      padding: .5rem;
      border-radius: 10px;
      cursor: pointer;
      &:hover {
        background: $gray
      }
    }
  </style>