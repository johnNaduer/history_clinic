<template>
  <div class="p-4 grid grid-cols-4 gap-4">
    <base-form-input
      label="Dni"
      field-name="name"
      v-model:value="dataReasonChange"
      type="text"
    />

    <base-form-input
      label="Nombres"
      field-name="name"
      v-model:value="dataReasonChange"
      type="text"
    />

    <base-form-input
      label="Apellidos"
      field-name="name"
      v-model:value="dataReasonChange"
      type="text"
    />

    <base-form-input
      label="Fecha de Nacimiento"
      field-name="name"
      v-model:value="dataReasonChange"
      type="text"
    />

    <base-form-input
      label="Genero"
      field-name="name"
      v-model:value="dataReasonChange"
      type="text"
    />

    <base-form-input
      label="Dirección"
      field-name="name"
      v-model:value="dataReasonChange"
      type="text"
    />

    <base-form-input
      label="Teléfono"
      field-name="name"
      v-model:value="dataReasonChange"
      type="text"
    />

    <base-form-input
      label="Correo Electrónico"
      field-name="name"
      v-model:value="dataReasonChange"
      type="text"
    />

    <base-form-input
      label="Fecha de Registro"
      field-name="name"
      v-model:value="dataReasonChange"
      type="text"
    />

    <base-form-textarea
      label="Observaciones"
      field-name="name"
      v-model:value="dataReasonChange"
      rows="3"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import baseFormInput from '@/components/BaseFormInput.vue'
import baseFormTextarea from '@/components/BaseFormTextarea.vue'

const dataReasonChange = ref<string>('')
</script>

<style scoped></style>
