<template>
  <div class="pr-10 pl-10 mt-5">

    <div class="flex">

    <div class="flex-col justify-center items-end flex">

    <base-form-input
      label="Nombre y Apellidos"
      field-name="name"
      v-model:value="dataReasonChange"
      type="text"
      class="pr-10 pl-10"
    />


      <div class="mb-2 mt-2 flex pr-10 pl-10">
  <label for="birthdate" class="block text-sm font-medium text-gray-500 mb-1 pr-2 items-center flex">
    Fecha de Nacimiento
  </label>
  <input
    type="date"
    id="birthdate"
    name="birthdate"
    class="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm w-[350px]"
  />
</div>


<!-- 
    <base-form-input
      label="Fecha de Nacimiento"
      field-name="name"
      v-model:value="dataReasonChange"
      type="text"
      class="pr-10 pl-10"
    /> -->

    <base-form-input
      label="Dni"
      field-name="name"
      v-model:value="dataReasonChange"
      type="text"
      class="pr-10 pl-10"
    />

    <base-form-input
      label="Edad"
      field-name="name"
      v-model:value="dataReasonChange"
      type="text"
      class="pr-10 pl-10"
    />

    <base-form-input
      label="Cip"
      field-name="name"
      v-model:value="dataReasonChange"
      type="text"
      class="pr-10 pl-10"
    />

    <base-form-input
      label="Estado Civil"
      field-name="name"
      v-model:value="dataReasonChange"
      type="text"
      class="pr-10 pl-10"
    />

  <div class="mb-2 mt-2 flex pr-10 pl-10">
  <label class="block text-sm font-medium text-gray-500 mb-1 pr-2 items-center flex">
    Género
  </label>
  <div class="flex items-center gap-4">
    <label class="inline-flex items-center">
      <input
        type="radio"
        name="gender"
        value="female"
        class="text-blue-600 focus:ring-blue-500"
      />
      <span class="ml-2 text-sm text-gray-700">Femenino</span>
    </label>

    <label class="inline-flex items-center">
      <input
        type="radio"
        name="gender"
        value="male"
        class="text-blue-600 focus:ring-blue-500"
      />
      <span class="ml-2 text-sm text-gray-700">Masculino</span>
    </label>

  </div>
</div>







    </div>

    <div class="flex-col items-end flex">

    <base-form-input
      label="Domicilio Actual"
      field-name="name"
      v-model:value="dataReasonChange"
      type="text"
      class="pr-10 pl-10"
    />

    <base-form-input
      label="Lugar de Nacimiento"
      field-name="name"
      v-model:value="dataReasonChange"
      type="text"
      class="pr-10 pl-10"
    />


     <base-form-input
      label="Grado de instrucción"
      field-name="name"
      v-model:value="dataReasonChange"
      type="text"
      class="pr-10 pl-10"
    />

     <base-form-input
      label="Ocupación"
      field-name="name"
      v-model:value="dataReasonChange"
      type="text"
      class="pr-10 pl-10"
    />

    <base-form-input
      label="Correo Electrónico"
      field-name="name"
      v-model:value="dataReasonChange"
      type="text"
      class="pr-10 pl-10"
    />

    </div>

    </div>

<h3 class="font-weight-medium mt-5">Datos del Responsable</h3>

  <base-form-input
      label="Nombre y apellidos del padre, madre o apoderado"
      field-name="name"
      v-model:value="dataReasonChange"
      type="text"
      class="pr-10 pl-10"
    />    

    <base-form-input
      label="Dni"
      field-name="name"
      v-model:value="dataReasonChange"
      type="text"
      class="pr-10 pl-10"
    />

    
    <base-form-input
      label="Correo Electrónico"
      field-name="name"
      v-model:value="dataReasonChange"
      type="text"
      class="pr-10 pl-10"
    />
<!-- 

    <base-form-textarea
      label="Observaciones"
      field-name="name"
      v-model:value="dataReasonChange"
      rows="3"
      class="pr-10 pl-10"
    /> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import baseFormInput from '@/components/BaseFormInput.vue'
import baseFormTextarea from '@/components/BaseFormTextarea.vue'

const dataReasonChange = ref<string>('')
</script>

<style scoped></style>
