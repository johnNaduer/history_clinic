<template>
    <div class="demo-datetime-picker">
      <div class="block">
        <span class="demonstration">Default</span>
        <el-date-picker
          v-model="value1"
          type="datetime"
          placeholder="Select date and time"
        />
      </div>
      <div class="block">
        <span class="demonstration">With shortcuts</span>
        <el-date-picker
          v-model="value2"
          type="datetime"
          placeholder="Select date and time"
          :shortcuts="shortcuts"
        />
      </div>
      <div class="block">
        <span class="demonstration">With default time</span>
        <el-date-picker
          v-model="value3"
          type="datetime"
          placeholder="Select date and time"
          :default-time="defaultTime"
        />
      </div>
  
      <button @click="exportCSV" :disabled="loading" class="export-button">
        {{ loading ? "Exporting..." : "Export Tags to CSV" }}
      </button>
  
  
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  
  const value1 = ref('')
  const value2 = ref('')
  const value3 = ref('')
  const defaultTime = new Date(2000, 1, 1, 12, 0, 0)
  
  const shortcuts = [
    {
      text: 'Today',
      value: new Date(),
    },
    {
      text: 'Yesterday',
      value: () => {
        const date = new Date()
        date.setDate(date.getDate() - 1)
        return date
      },
    },
    {
      text: 'A week ago',
      value: () => {
        const date = new Date()
        date.setDate(date.getDate() - 7)
        return date
      },
    },
  ]
  
  // Estado para manejar el proceso de carga
  const loading = ref(false);
  
  // Función para exportar el CSV
  const exportCSV = async () => {
    loading.value = true;
    try {
      // Realiza la petición al endpoint
      const response = await fetch("http://localhost:3000/api/v1/tags/export/csv", {
        method: "GET",
      });
  
      // Verifica si la respuesta es válida
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      // Procesa la respuesta para crear el archivo CSV
      const blob = await response.blob(); // Convierte los datos a un archivo Blob
      const url = window.URL.createObjectURL(blob);
  
      // Crea un enlace para descargar el archivo
      const a = document.createElement("a");
      a.href = url;
      a.download = "tags_export.csv"; // Nombre del archivo descargado
      document.body.appendChild(a);
      a.click(); // Simula el clic en el enlace para iniciar la descarga
      a.remove(); // Limpia el enlace después de la descarga
  
      console.log("CSV exportado correctamente");
    } catch (error) {
      console.error("Error al exportar el CSV:", error);
      alert("Hubo un error al exportar los datos.");
    } finally {
      loading.value = false;
    }
  };
  
  </script>
  <style scoped>
  .demo-datetime-picker {
    display: flex;
    width: 100%;
    padding: 0;
    flex-wrap: wrap;
  }
  .demo-datetime-picker .block {
    padding: 30px 0;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
    flex: 1;
  }
  .demo-datetime-picker .block:last-child {
    border-right: none;
  }
  .demo-datetime-picker .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
  }
  </style>