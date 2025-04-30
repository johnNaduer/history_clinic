<template>
  <div class="demo-datetime-picker">


    <button @click="exportCSV" :disabled="loading" class="export-button">
      {{ loading ? "Exporting..." : "Export Tags to CSV" }}
    </button>


  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'


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

</style>