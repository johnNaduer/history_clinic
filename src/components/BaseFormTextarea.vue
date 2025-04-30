<template>
    <div>
      <label
        :for="props.fieldName"
        class="block mb-1 text-sm text-gray-700"
        :class="{ 'text-gray-700': !showInputWithError, 'text-red-500': showInputWithError }"
      >
        {{ props.label }}
      </label>
  
      <textarea
        v-if="!props.readonly"
        v-model="value"
        :disabled="props.disabled"
        :id="props.fieldName"
        :rows="props.rows"
        class="border text-gray-900 text-sm rounded-md block w-full px-2.5 py-1"
        :class="{ 'border-gray-400': !showInputWithError, 'border-red-600': showInputWithError }"
        @blur="resolveInputWithError()"
        @input="valueHasChanged"
      />
  
      <div v-else class="base-form__text-readonly">
        {{ value }}
      </div>
  
      <p v-show="showInputWithError" class="base-form__error_message">
        {{ errorMessage }}
      </p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { PropType, ref, watch } from 'vue'
  
  const value = defineModel('value', { default: '' })
  
  const showInputWithError = ref(false)
  const errorMessage = ref('')
  
  // Props
  const props = defineProps({
    label: {
      type: String,
      required: true
    },
  
    fieldName: {
      type: String,
      required: true
    },
  
    rows: {
      type: Number,
      required: true,
      default: () => 1
    },
  
    disabled: {
      type: Boolean,
      required: false,
      default: () => false
    },
  
    readonly: {
      type: Boolean,
      required: false,
      default: () => false
    },
  
    validator: {
      type: Function,
      required: false,
      default: () => {
        return true
      }
    },
  
    markAsError: {
      type: Object as PropType<{ apply: boolean; message: string }>,
      required: false,
      default: () => ({ apply: false, message: '' })
    }
  })
  
  // Emits
  const emit = defineEmits<{
    (e: 'onChangeInputValue', payload: { fieldName: string; value: string }): void
  }>()
  
  // Methods
  
  const resolveInputWithError = () => {
    const res = props.validator(value.value)
  
    if (res == true) {
      showInputWithError.value = false
      return
    }
    showInputWithError.value = true
    errorMessage.value = res
  }
  
  const valueHasChanged = (event: Event): void => {
    if (event.target == null) {
      return
    }
    const target = event.target as HTMLInputElement
  
    emit('onChangeInputValue', {
      fieldName: props.fieldName,
      value: target.value
    })
  }
  
  watch(
    () => props.markAsError,
    (newValue) => {
      if (newValue.apply) {
        showInputWithError.value = true
        errorMessage.value = props.markAsError.message
      } else resolveInputWithError()
    }
  )
  
  defineExpose({
    resolveInputWithError
  })
  </script>
  
  <style></style>
  