<template>
  <div class="dropdown">
    <!-- Botón de activación -->
    <button>
    <base-icon 
    name="ChevronDownIcon" 
    @click="toggleDropdown"
    class="pointer"
    type="outline" />
    </button>


    <!-- Contenedor del menú con transición -->
 
  </div>
  <Transition name="fade">
      <div v-if="isOpen" class="dropdown-menu">
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
        <!-- "Colita" visual debajo del menú -->
        <div class="dropdown-arrow"></div>
      </div>
    </Transition>

</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue';
import BaseIcon from './BaseIcon.vue';


const props = defineProps({
  options: { type: Array, required: true }, // Ejemplo: [{ label: 'Opción 1', value: '1' }]
  placeholder: { type: String, default: 'Selecciona una opción' }
});

const emits = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const selectedLabel = ref('');

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  selectedLabel.value = option.label;
  emits('update:modelValue', option.value);
  isOpen.value = false;
};
</script>

<style scoped>
/* Contenedor principal */
.dropdown {
  position: relative;
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

/* Menú emergente */
.dropdown-menu {
  position: absolute;
  top: 110%;
  right: 20px;
  width: 120px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  z-index: 9999;
  animation: fadeIn 0.2s ease-in-out;
}

/* Lista de opciones */
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
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>