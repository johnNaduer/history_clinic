<template>
  <div class="custom-input" ref="dropdownContainer">
    <label
      :for="props.fieldName"
      class="button-category block mb-1 text-sm text-gray-700"
      :class="{
        'text-gray-700': !showInputWithError,
        'text-red-500': showInputWithError,
      }"
    >
      {{ props.label }}
    </label>
    <div class="relative flex items-center">
      <input
        ref="inputFocusRef"
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        class="block w-full px-2.5 py-1 text-sm text-gray-900 border rounded-md focus:border-primary"
        :class="{
          'border-gray-400': !showInputWithError,
          'border-red-600': showInputWithError,
        }"
        :readonly="readonly"
        autocomplete="off"
        @blur="resolveInputWithError()"
        @change="valueHasChanged"
        @focus="toggleDropdown"
        :style="{ height: props.heightInput }"
        :current-selected-item="props.currentSelectedItem"
      />
      <base-pill
        v-if="showPill && modelValue && modelValue !== ''"
        :label="modelValue"
        :plain="true"
        :type="setPillSelected(modelValue)"
        class="absolute left-2 text-[15px]"
      />
    </div>

    <base-icon
      v-if="modelValue && readonly"
      name="XCircleIcon"
      type="outline"
      bgColor="bg-white-500"
      class="xcircle-icon"
      :style="{ top: props.topXCircleIcon }"
      @click="clearSelectCustom"
    />
    <base-icon
      name="ChevronDownIcon"
      type="outline"
      bgColor="bg-white-500"
      class="arrow-icon"
      :class="{ rotated: isRotated && readonly }"
      :style="{ top: props.topArrowIcon }"
      @click="toggleDropdown"
    />

    <div v-if="isDropdownVisible && readonly" class="dropdown-wrapper">
      <ul
        class="dropdown-menu"
        :style="{
          top: isDropdownAbove ? 'auto' : '111%',
          bottom: isDropdownAbove ? valueBottomDropdown : 'auto',
        }"
      >
        <li
          v-for="option in props.options"
          :key="option.id"
          @click="selectOption(option)"
          class="select-dropdown-item"
          :class="{ selected: selectedOption?.id === option.id }"
        >
          <!-- {{ option.label }} -->
          <base-pill
            :label="option.label"
            :plain="true"
            :type="option.type"
            class="custom-pill"
            :style="{ height: '19px' }"
          />
        </li>
        <li v-if="props.options.length === 0" class="no-options text-sm">
          There are no options
        </li>
        <div
          v-if="props.optionAdd !== ''"
          class="sticky bottom-0 bg-white px-4 pb-2 pt-2 cursor-pointer"
        >
          <p class="text-primary text-sm" @click="openNewOption">
            {{ props.optionAdd }}
          </p>
        </div>
      </ul>
      <div
        x-arrow=""
        :class="isDropdownAbove ? 'popper__arrow' : 'popper__arrow-down'"
        :style="{
          left: props.leftPopperArrow,
          top: isDropdownAbove ? 'auto' : '101%',
          bottom: isDropdownAbove ? '86%' : 'auto',
        }"
      ></div>
    </div>
  </div>
  <p v-show="showInputWithError" class="base-form__error_message">
    {{ currentErrorMessage || errorMessage }}
  </p>
</template>
<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
  onUnmounted,
  type PropType,
} from 'vue'
import BaseIcon from './BaseIcon.vue'
import BasePill, { type PillType } from './BasePill.vue'

export type Option = {
  id: string | number
  label: string
  type?: any | string
}

export type ISetPillSelected = Record<string, PillType>

// Props
const props = defineProps({
  label: {
    type: String,
    required: false,
  },
  fieldName: {
    type: String,
    required: true,
  },
  optionAdd: {
    type: String,
    required: false,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: 'Select',
  },
  readonly: {
    type: Boolean,
    default: true,
  },
  options: {
    type: Array as PropType<Option[]>,
    default: () => [],
  },
  validator: {
    type: Function,
    required: false,
    default: () => {
      return true
    },
  },
  markAsError: {
    type: Object as PropType<{ apply: boolean; message: string }>,
    required: false,
    default: () => ({ apply: false, message: '' }),
  },
  currentSelectedItem: {
    type: Object as PropType<{ id: string | number; label: string }>,
    required: false,
    default: () => null,
  },

  value: {
    type: String,
    required: false,
    default: '',
  },
  // Begin - Props when using outside BaseForm
  heightInput: {
    type: String,
    required: false,
    default: '32px',
  },
  leftPopperArrow: {
    type: String,
    required: false,
    default: '10%',
  },
  topArrowIcon: {
    type: String,
    required: false,
    default: '70%',
  },
  topXCircleIcon: {
    type: String,
    required: false,
    default: '70%',
  },
  topDropdownMenu: {
    type: String,
    required: false,
    default: '63.4px',
  },
  // End - Props when using outside BaseForm
  showPill: {
    type: Boolean,
    default: false,
  },
  pillSets: {
    type: Object as PropType<ISetPillSelected>,
    required: false,
    default: () => ({}),
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  currentErrorMessage: {
    type: String,
    required: false,
    default: '',
  },
})

// Emits
const emit = defineEmits<{
  (e: 'onChangeInputValue', payload: { fieldName: string; value: string }): void
  (
    e: 'clearSelectedOption',
    payload: { fieldName: string; isClear: boolean },
  ): void
  (e: 'openNewOption'): void
}>()

// Variables
const isDropdownVisible = ref<boolean>(false)
const selectedOption = ref<{ id: string | number; label: string } | null>(null)
const showInputWithError = ref<boolean>(false)
const errorMessage = ref<string>('')
const isRotated = ref<boolean>(false)
const dropdownContainer = ref<HTMLElement | null>(null)
const reactiveValue = ref<string | number>(props.value)
const inputFocusRef = ref<HTMLInputElement | null>(null)
const valueBottomDropdown = ref<string>('')
const isDropdownAbove = ref<boolean>(false)

// Computed
const modelValue = computed<string>({
  get() {
    const selectedOption = props.options.find(
      option => option.id === reactiveValue.value,
    )
    return selectedOption ? selectedOption.label : ''
  },
  set(newValue: string) {
    return newValue
  },
})

// Methods
const selectOption = (
  option: { id: string | number; label: string } | null,
) => {
  if (option) {
    isRotated.value = !isRotated.value
    isDropdownVisible.value = !isDropdownVisible.value
    reactiveValue.value = option.id
    selectedOption.value = option
    const value = typeof option.id === 'number' ? String(option.id) : option.id

    if (value) {
      showInputWithError.value = false
    }

    emit('onChangeInputValue', { fieldName: props.fieldName, value })
  }
}

const resolveInputWithError = () => {
  const res = props.validator(reactiveValue.value)
  if (res == true) {
    showInputWithError.value = false
    return
  }
  showInputWithError.value = true
  errorMessage.value = res
  setTimeout(() => (isDropdownVisible.value = false), 100)
}

const toggleDropdown = () => {
  isRotated.value = !isRotated.value
  isDropdownVisible.value = !isDropdownVisible.value
  if (isDropdownVisible.value) {
    checkDropdownPosition()
  }
}

const clearSelectCustom = () => {
  reactiveValue.value = ''
  selectedOption.value = null
  emit('clearSelectedOption', { fieldName: props.fieldName, isClear: true })
  emit('onChangeInputValue', {
    fieldName: props.fieldName,
    value: reactiveValue.value,
  })
  inputFocusRef.value?.focus()
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

const setPillSelected = (value: string): PillType => {
  return props.pillSets[value] || 'default'
}

//hideDropdown
const handleClickOutside = (event: MouseEvent) => {
  if (
    dropdownContainer.value &&
    !dropdownContainer.value.contains(event.target as Node)
  ) {
    isDropdownVisible.value = false
  }
}

const checkDropdownPosition = () => {
  if (props.label) {
    valueBottomDropdown.value = '105%'
  } else {
    valueBottomDropdown.value = '111%'
  }
  if (!dropdownContainer.value) return
  const rect = dropdownContainer.value.getBoundingClientRect()
  const windowHeight = window.innerHeight
  isDropdownAbove.value = rect.bottom + 257 > windowHeight - 40
}

const openNewOption = () => {
  emit('openNewOption')
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', checkDropdownPosition)
  window.addEventListener('resize', checkDropdownPosition)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkDropdownPosition)
  window.removeEventListener('resize', checkDropdownPosition)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

watch(
  () => props.currentSelectedItem,
  newValue => {
    if (newValue) {
      reactiveValue.value = newValue.id as string
      modelValue.value = newValue.label as string
      emit('onChangeInputValue', {
        fieldName: props.fieldName,
        value: newValue.id as string,
      })
    }
  },
)

watch(
  () => props.markAsError,
  newValue => {
    if (newValue.apply) {
      showInputWithError.value = true
      errorMessage.value = props.markAsError.message
    } else resolveInputWithError()
  },
  {
    deep: true,
  },
)

defineExpose({
  resolveInputWithError,
  clearSelectCustom,
})
</script>
<style scoped>
.border-red-600 {
  --tw-border-opacity: 1;
  border-color: rgb(220 38 38 / var(--tw-border-opacity));
}
.dropdown-menu {
  position: absolute;
  left: 0;
  width: auto;
  background: #fff;
  border: 1px solid;
  border-radius: 6px;
  z-index: 21;
  max-height: 257px;
  overflow-y: auto;
  list-style: none;
  margin: 5px 0 0;
  padding: 0;
  white-space: nowrap;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  --tw-border-opacity: 1;
  border-color: rgba(237, 242, 247, var(--tw-border-opacity));
  padding: 6px 0px;
  transition:
    opacity 0.3s,
    transform 0.3s;
}

.popper__arrow-down {
  position: absolute;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-width: 6.5px;
  border-color: transparent;
  border-bottom-color: #fff;
  z-index: 22;
  filter: drop-shadow(-2px -4px 4px rgba(0, 0, 0, 0.1));
}

.popper__arrow {
  position: absolute;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-width: 6.5px;
  border-color: transparent;
  border-top-color: #fff;
  z-index: 22;
  filter: drop-shadow(-2px 4px 4px rgba(0, 0, 0, 0.1));
}

.custom-input {
  position: relative;
  display: inline-block;
  width: 100%;
}

.el-input__inner {
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
  padding-right: 30px;
}

.arrow-icon {
  position: absolute;
  right: 10px;
  transform: translateY(-50%) rotate(0deg);
  transition: transform 0.3s ease;
  font-size: 12px;
  color: #c0c4cc;
  cursor: pointer;
}

.xcircle-icon {
  position: absolute;
  right: 30px;
  transform: translateY(-50%);
  font-size: 16px;
  color: red;
  cursor: pointer;
  visibility: hidden;
}

.custom-input:hover .xcircle-icon {
  visibility: visible;
}

.el-popper[x-placement^='bottom'] .popper__arrow {
  top: -6px;
  border-top-width: 0;
}

.dropdown-menu::-webkit-scrollbar {
  width: 6px;
  padding: 10px;
}

.dropdown-menu::-webkit-scrollbar-thumb {
  background-color: hsla(220, 4%, 58%, 0.3);
  border-radius: 4px;
  padding: 10px;
}

.dropdown-menu::-webkit-scrollbar-thumb:hover {
  background-color: #909399;
}

.dropdown-menu::-webkit-scrollbar-track {
  background-color: #fff;
  border-radius: 4px;
}

.dropdown-menu li {
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-menu li:hover {
  background-color: #f5f7fa;
}

.dropdown-menu li.selected {
  background-color: #f5f7fa;
  font-weight: 700;
  color: #0268bc;
}
.no-options {
  padding: 10px;
  color: #c0c4cc;
  text-align: center;
}

.custom-pill {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  vertical-align: baseline !important;
}

.select-dropdown-item {
  font-size: 14px;
  padding: 0 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #606266;
  height: 34px;
  line-height: 34px;
  box-sizing: border-box;
  cursor: pointer;
  justify-content: flex-start;
  align-items: center;
}

.arrow-icon.rotated {
  transform: translateY(-50%) rotate(-180deg);
}
</style>
