<template>
  <span :class="pillClasses">
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue'

export type PillType =
  | 'brown'
  | 'danger'
  | 'default'
  | 'info'
  | 'primary'
  | 'purple'
  | 'secondary'
  | 'success'
  | 'warning'

export interface PillProps {
  label: string
  plain: boolean
  type: string
}
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  plain: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String as PropType<PillType>,
    required: true,
  },
})

const pillClasses = computed(() => {
  const baseClasses = 'py-0.5 px-3 rounded-xl align-middle mr-2'
  const typeClasses: Record<PillType, string> = {
    primary: props.plain
      ? 'bg-blue-100 text-brand font-semibold mr-2'
      : 'bg-blue-700 text-white mr-2',
    secondary: props.plain
      ? 'bg-gray-500/20 text-gray-600 font-semibold mr-2'
      : 'bg-gray text-white mr-2',
    success: props.plain
      ? 'bg-green-100  text-green-700 font-semibold mr-2'
      : 'bg-green-500 text-white mr-2',
    info: props.plain
      ? 'bg-teal-500/20  text-teal-600 font-semibold mr-2'
      : 'bg-teal-500 text-white mr-2',
    warning: props.plain
      ? 'bg-orange-200  text-orange-700 font-semibold mr-2'
      : 'bg-orange-500 text-white mr-2',
    danger: props.plain
      ? 'bg-red-100  text-red-700 font-semibold mr-2'
      : 'bg-red-500 text-white mr-2',
    purple: props.plain
      ? 'bg-purple-100 text-purple-600 font-semibold mr-2'
      : 'bg-purple text-white mr-2',
    brown: props.plain
      ? 'bg-[#f5d9bc] text-yellow-800 font-semibold mr-2'
      : 'bg-yellow-500 text-white mr-2',
    default: 'bg-black text-white mr-2',
  }
  return `${baseClasses} ${typeClasses[props.type]}`
})
</script>
