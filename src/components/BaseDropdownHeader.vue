<template>
  <div class="dropdown">
    <!-- Botón de activación -->
    <button>
      <base-icon
        name="ChevronDownIcon"
        @click="toggleDropdown"
        class="pointer"
        type="outline"
      />
    </button>

    <!-- Teleport para el menú -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isOpen" class="dropdown-menu" ref="dropdownMenu">
          <ul>
            <li
              v-for="option in options"
              :key="option.value"
              @click="selectOption(option)"
              class="dropdown-item"
            >
              {{ option.label }}
            </li>
          </ul>
          <div class="dropdown-arrow"></div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, nextTick, type PropType } from 'vue'
import BaseIcon from './BaseIcon.vue'

export type Option = {
  label: string
  value: string
}

defineProps({
  options: {
    type: Array as PropType<Option[]>,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Selecciona una opción',
  },
})

const emits = defineEmits(['optionOnClick'])

const isOpen = ref(false)
const dropdownMenu = ref<HTMLElement | null>(null)
const buttonRef = ref<HTMLElement | null>(null)
const position = ref({ top: 0, left: 0, width: 0 })

const toggleDropdown = async () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    await nextTick() // Espera a que el menú se renderice
    updatePosition()
  }
}

const updatePosition = () => {
  if (buttonRef.value && dropdownMenu.value) {
    const rect = buttonRef.value.getBoundingClientRect()
    position.value = {
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
    }
  }
}

const selectOption = (option: Option) => {
  console.log('Opción seleccionada:', option)
  emits('optionOnClick', option.value)
  isOpen.value = false
}

// Cierra el menú si se hace clic fuera
const closeDropdown = (event: MouseEvent) => {
  if (
    dropdownMenu.value &&
    buttonRef.value &&
    !dropdownMenu.value.contains(event.target as Node) &&
    !buttonRef.value.contains(event.target as Node)
  ) {
    isOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', closeDropdown)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', closeDropdown)
})
</script>

<style scoped>
.dropdown {
  display: inline-block;
}

/* Botón estilizado */
.dropdown-button {
  background: #ffffff;
  border: 1px solid #d1d5db;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}
.dropdown-button:hover {
  background: #f9fafb;
}

/* Ícono de flecha */
.icon {
  margin-left: 10px;
  font-size: 14px;
  color: #6b7280;
}

.dropdown-menu {
  position: relative;
  top: -180px;
  right: -1690px;
  width: 120px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  overflow: hidden;
}

.dropdown-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dropdown-item {
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 15px;
}

.dropdown-item:hover {
  background: #f3f4f6;
}

/* Flecha decorativa (colita) */
.dropdown-arrow {
  position: absolute;
  bottom: 100%;
  left: 20px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid white;
  filter: drop-shadow(0px -3px 3px rgba(0, 0, 0, 0.1));
}

/* Animaciones */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
