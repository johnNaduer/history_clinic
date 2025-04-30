<template>
  <div class="base-form-input">
    <label
      v-if="props.label !== ''"
      :for="props.fieldName"
      :class="[
        'block mb-1 text-sm',
        {
          'text-gray-700': !showInputWithError,
          'text-red-500': showInputWithError,
        },
        classLabel,
      ]"
    >
      {{ props.label }}
    </label>

    <div v-if="!props.readonly" :class="['relative', classInputParent]">
      <input
        v-model="value"
        :type="props.type"
        :disabled="props.disabled"
        :id="props.fieldName"
        :class="[
          'border text-gray-900 text-sm rounded-md focus:ring-primary block w-full px-2.5 py-1',
          {
            'border-gray-400': !showInputWithError,
            'border-red-600': showInputWithError,
            'absolute inset-0 opacity-0 cursor-pointer z-0': props.isCustom,
          },
          classInput,
        ]"
        :style="{ height: props.heightInput, textIndent: props.textIndent }"
        @blur="resolveInputWithError()"
        @input="valueHasChanged"
        @keypress="
          props.validateKeypress ? validateNumberInput($event) : () => null
        "
        :placeholder="placeholder"
      />
      <input
        v-if="props.isCustom"
        type="text"
        :value="formattedDate"
        readonly
        class="border text-gray-900 text-sm rounded-md focus:ring-primary block w-full px-2.5 py-1 z-10"
        :class="{
          'border-gray-400': !showInputWithError,
          'border-red-600': showInputWithError,
        }"
        :style="{ height: props.heightInput, textIndent: props.textIndent }"
        @click="showCalendar"
      />
      <base-icon
        v-if="props.isCustom"
        name="CalendarIcon"
        type="outline"
        size="size-8"
        bg-color="bg-transparent"
        class="absolute inset-y-0 mt-[10px] right-2 flex items-center cursor-pointer pointer-events-none"
      />
    </div>

    <div v-else class="base-form__text-readonly">
      {{ value }}
    </div>

    <p
      v-show="showInputWithError"
      class="base-form__error_message"
      :style="`position: ${props.positionError}; line-height: ${props.lineHeightError};`"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { PropType } from 'vue'
import BaseIcon from './BaseIcon.vue'

const value = defineModel<string | number, string>('value', { default: '' })

const showInputWithError = ref(false)
const errorMessage = ref('')

const formattedDate = computed<string>(() => {
  if (new Date(value.value).toString() === 'Invalid Date') return ''

  if (props.type === 'date' && props.isCustom) {
    const inputDate = value.value
    const [year, month, day] = (inputDate as string).split('-')
    const newDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))

    const newFormattedDate = Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(newDate)

    return newFormattedDate
  }
  return ''
})

// emits
const emit = defineEmits<{
  (e: 'onChangeInputValue', payload: { fieldName: string; value: string }): void
}>()

// Props
const props = defineProps({
  classInput: String,
  classInputParent: String,
  classLabel: String,
  placeholder: String,
  label: {
    type: String,
    required: false,
  },

  fieldName: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: false,
    default: () => 'text',
    validator(value: string) {
      return ['text', 'file', 'date'].includes(value)
    },
  },

  disabled: {
    type: Boolean,
    required: false,
    default: () => false,
  },

  readonly: {
    type: Boolean,
    required: false,
    default: () => false,
  },

  validator: {
    type: Function,
    required: false,
    default: () => {
      return true
    },
  },
  validateKeypress: {
    type: Boolean,
    required: false,
    default: () => false,
  },
  markAsError: {
    type: Object as PropType<{ apply: boolean; message: string }>,
    required: false,
    default: () => ({ apply: false, message: '' }),
  },
  heightInput: {
    type: String,
    required: false,
    default: () => '34px',
  },
  textIndent: {
    type: String,
    required: false,
    default: () => '0px',
  },
  positionError: {
    type: String,
    required: false,
    default: () => 'none',
  },
  lineHeightError: {
    type: String,
    required: false,
    default: () => 'none',
  },
  isCustom: {
    type: Boolean,
    required: false,
    default: () => false,
  },
})

const showCalendar = (event: any) => {
  const dateInput = event.target.previousElementSibling
  if (dateInput) {
    dateInput.showPicker()
  }
}

const validateNumberInput = (event: KeyboardEvent) => {
  const charCode = event.key
  if (!/^[0-9]$/.test(charCode)) {
    event.preventDefault()
  }
  if (Number(value.value) <= 0 && charCode <= '0') {
    event.preventDefault()
  }
}

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
    value: target.value,
  })
}

watch(
  () => props.markAsError,
  newValue => {
    if (newValue.apply) {
      showInputWithError.value = true
      errorMessage.value = props.markAsError.message
    } else resolveInputWithError()
  },
)

defineExpose({
  resolveInputWithError,
})
</script>

<style scoped>
.border-red-600 {
  --tw-border-opacity: 1;
  border-color: rgb(220 38 38 / var(--tw-border-opacity));
}
</style>
