<template>
  <div class="p-4 grid grid-cols-2 gap-4">
    <base-form-textarea
      label="Familiares"
      field-name="name"
      v-model:value="dataReasonChange"
      rows="3"
    />
    <base-form-textarea
      label="Personales"
      field-name="name"
      v-model:value="dataReasonChange"
      rows="3"
    />

    <base-form-input
      label="Quirúrgicos"
      field-name="name"
      v-model:value="dataReasonChange"
      type="text"
    />

    <base-form-input
      label="Alergías"
      field-name="name"
      v-model:value="dataReasonChange"
      type="text"
    />
  </div>
  habitos
  <div class="p-4 grid grid-cols-4 gap-4">
    <base-form-input
      label="Tabaquismo"
      field-name="name"
      v-model:value="dataReasonChange"
      type="text"
    />

    <base-form-input
      label="Alcohol"
      field-name="name"
      v-model:value="dataReasonChange"
      type="text"
    />

    <base-form-input
      label="Ejercicios"
      field-name="name"
      v-model:value="dataReasonChange"
      type="text"
    />
  </div>
  medicación Actual

  <div class="p-4 grid grid-cols-4 gap-4">
    <base-form-input
      label="Nombre"
      field-name="name"
      v-model:value="dataReasonChange"
      type="text"
    />

    <base-form-input
      label="Dosis"
      field-name="name"
      v-model:value="dataReasonChange"
      type="text"
    />

    <base-form-input
      label="Frecuencia"
      field-name="name"
      v-model:value="dataReasonChange"
      type="text"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
//   import baseFormInput from '@/components/BaseFormInput.vue'
import baseFormTextarea from '@/components/BaseFormTextarea.vue'
import baseFormInput from '@/components/BaseFormInput.vue'

const dataReasonChange = ref<string>('')
</script>

<style scoped></style>
