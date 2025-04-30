<template>
  <div :class="[{ 'spinner-icon': props.isSpinning }, containerClass]">
    <icon-async-component :class="iconClass" />
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import type { Component, PropType } from 'vue'

/**
 * Lista de íconos disponibles en Heroicons
 */
const heroIconNames = [
  'AdjustmentsHorizontalIcon',
  'ArchiveBoxIcon',
  'ArrowDownTrayIcon',
  'Bars3Icon',
  'BellIcon',
  'CalendarIcon',
  'CameraIcon',
  'ChevronDownIcon',
  'ChevronLeftIcon',
  'ChevronRightIcon',
  'ChevronUpIcon',
  'ClockIcon',
  'Cog6ToothIcon',
  'DocumentIcon',
  'ExclamationCircleIcon',
  'HomeIcon',
  'InformationCircleIcon',
  'MagnifyingGlassIcon',
  'UserIcon',
  'XMarkIcon',
  'XCircleIcon',
  'WrenchIcon',
  'EyeIcon',
] as const

/**
 * Tipos de íconos disponibles en Heroicons
 */
export type HeroIconName = (typeof heroIconNames)[number]
export type IconType = 'solid' | 'outline' | 'mini' | 'micro'

/**
 * Props del componente
 */
const props = defineProps({
  name: {
    type: String as PropType<HeroIconName>,
    required: true,
  },
  type: {
    type: String as PropType<IconType>,
    default: 'solid',
  },
  size: {
    type: String,
    default: 'size-4', // Tailwind class
  },
  containerSize: {
    type: String,
    default: 'size-6',
  },
  colorIcon: {
    type: String,
    default: 'fill-white',
  },
  bgColor: {
    type: String,
    default: 'bg-gray-500',
  },
  isSpinning: {
    type: Boolean,
    default: false,
  },
})

/**
 * Carga dinámica del componente de ícono
 */
const IconAsyncComponent = defineAsyncComponent({
  loader: async () => {
    try {
      let iconComponent: Component | undefined

      if (isHeroIconName(props.name)) {
        if (props.type === 'solid') {
          const module = await import('@heroicons/vue/24/solid')
          iconComponent = module[props.name as HeroIconName] as Component
        } else if (props.type === 'outline') {
          const module = await import('@heroicons/vue/24/outline')
          iconComponent = module[props.name as HeroIconName] as Component
        } else if (props.type === 'mini') {
          const module = await import('@heroicons/vue/20/solid')
          iconComponent = module[props.name as HeroIconName] as Component
        } else if (props.type === 'micro') {
          const module = await import('@heroicons/vue/16/solid')
          iconComponent = module[props.name as HeroIconName] as Component
        }
      }

      if (!iconComponent) {
        throw new Error()
      }
      return iconComponent
    } catch (error) {
      throw new Error('Error al cargar el icono: ' + error)
    }
  },
  delay: 200,
})

/**
 * Clases dinámicas para ícono y contenedor
 */
const iconClass = computed(() => [props.size, props.colorIcon].join(' '))
const containerClass = computed(() =>
  [
    'flex justify-center items-center rounded-full',
    props.containerSize,
    props.bgColor,
  ].join(' '),
)

/**
 * Validación de nombres de iconos
 */
function isHeroIconName(name: any): name is HeroIconName {
  return heroIconNames.includes(name)
}
</script>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.spinner-icon {
  animation: spin 1.7s linear infinite;
}
</style>
