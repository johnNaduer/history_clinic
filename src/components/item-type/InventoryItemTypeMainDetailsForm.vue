<template>
  <div class="inventory-item-type-form">
    <form @submit.prevent="save">
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input 
          id="name" 
          v-model="formData.name" 
          type="text" 
          required 
          class="form-control"
        />
      </div>
      
      <div class="form-group">
        <label for="description">Descripción:</label>
        <textarea 
          id="description" 
          v-model="formData.description" 
          class="form-control"
        ></textarea>
      </div>
      
      <div class="form-group">
        <label for="category">Categoría:</label>
        <select 
          id="category" 
          v-model="formData.categoryId" 
          class="form-control"
        >
          <option value="">Seleccionar categoría</option>
          <option 
            v-for="category in categories" 
            :key="category.id" 
            :value="category.id"
          >
            {{ category.label }}
          </option>
        </select>
      </div>
      
      <div class="form-actions">
        <button type="submit" class="btn btn-primary">Guardar</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  categories: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits([
  'successfullyCreated',
  'successfullyUpdated', 
  'failedCreated',
  'categoryCreated',
  'failed-updated',
  'failed-request-created'
])

const formData = ref({ ...props.data })

watch(() => props.data, (newData) => {
  formData.value = { ...newData }
}, { deep: true })

const save = () => {
  // Lógica de guardado aquí
  if (formData.value.id) {
    emit('successfullyUpdated', { itemTypeId: formData.value.id, data: formData.value })
  } else {
    emit('successfullyCreated', { itemTypeId: 'new-id' })
  }
}

const isValidItemTypeMainDetailForm = () => {
  return formData.value.name && formData.value.categoryId
}

defineExpose({ save, isValidItemTypeMainDetailForm })
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}
</style>