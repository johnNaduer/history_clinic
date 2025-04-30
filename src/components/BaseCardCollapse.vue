<template>
  <div class="relative bg-white rounded-lg shadow-md border border-gray-200">
    <div>
      <div
        class="flex items-center justify-between pl-4 pr-7 min-h-12 border-b border-gray-200"
      >
        <div class="flex items-center">
          <h5 class="text-responsive font-bold text-gray-800">{{ title }}</h5>
          <div
            v-if="!localIsEditing"
            class="ml-2 flex items-center"
            @click="toggleCollapse"
          >
            <base-icon
              :name="'ChevronUpIcon'"
              :class="iconRotationClass"
              type="solid"
              size="size-4"
              container-size="size-5"
              color-icon="fill-current"
              bg-color="cursor-pointer"
              class="ml-1 flex justify-center items-center"
            />
          </div>
        </div>
        <div class="flex items-center">
          <base-icon
            v-if="!localIsEditing && localIsEditingPencil"
            name="uil-pen"
            type="solid"
            size="size-5"
            container-size="size-9"
            color-icon="fill-gray-500"
            bg-color="bg-white hover:bg-gray-200 active:bg-white active:border-gray-600 cursor-pointer transition-colors duration-300 ease-in-out"
            class="flex justify-center items-center pb-1 pl-2 pr-1"
            @click.stop="editItem"
          />
          <div v-if="localIsEditing" class="flex items-center">
            <base-button
              v-if="props.showCancelButton"
              class="w-19"
              type="cancel"
              label="Cancelar"
              :plain="true"
              @click.stop="cancel"
            />
            <base-button
              v-if="props.showSaveButton"
              type="primary"
              label="Guardar"
              :plain="false"
              :is-loading="isLoadingSaveButton"
              class="ml-4 w-18"
              @click.stop="save"
            />
          </div>
        </div>
      </div>
      <div
        class="transition-all duration-500 ease-in-out"
        :class="{
          'max-h-0 overflow-hidden': !localIsOpen,
        }"
      >
        <slot name="body-collapse"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, toRef } from 'vue'
import BaseIcon from './BaseIcon.vue'
import BaseButton from './BaseButton.vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
  isEditingPencil: {
    type: Boolean,
    default: false,
  },
  showSaveButton: {
    type: Boolean,
    default: true,
  },
  showCancelButton: {
    type: Boolean,
    default: true,
  },
})

// emits
const emit = defineEmits(['edit', 'save', 'cancel'])

// data
const localIsOpen = ref(props.isOpen)
const localIsEditing = toRef(props, 'isEditing')
const localIsEditingPencil = toRef(props, 'isEditingPencil')
const isLoadingSaveButton = ref(false)

// methods

const toggleCollapse = () => {
  localIsOpen.value = !localIsOpen.value
}

const editItem = () => {
  localIsOpen.value = true
  localIsEditing.value = true
  localIsEditingPencil.value = true
  emit('edit')
}

const save = () => {
  emit('save')
}

const cancel = () => {
  localIsEditing.value = false
  emit('cancel')
}

const changeSaveButtonLoading = (isLoading: boolean) => {
  isLoadingSaveButton.value = isLoading
}

// computed
const iconRotationClass = computed(() => ({
  'rotate-180': localIsOpen.value,
  'rotate-0': !localIsOpen.value,
  transform: true,
  'transition-transform': true,
}))

// exposed
defineExpose({ changeSaveButtonLoading })
</script>

<style scoped>
@media (min-width: 368px) and (max-width: 376px) {
  .text-responsive {
    @apply text-[0.7rem];
  }
}
</style>
