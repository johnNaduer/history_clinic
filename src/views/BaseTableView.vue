<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Tabla desde el Componente Padre</h1>
    <base-table
      :columns="columns"
      :tableData="tableData"
      :multiSelectActive="true"
      :showActionColumn="false"
      :showExpandableColumn="false"
    />
  </div>

  <!-- <BaseIcon name="BellIcon" type="solid" colorIcon="fill-blue-500" size="size-6"  container-size="size-10" />
  <BaseIcon name="ArrowDownTrayIcon" type="outline" isSpinning />
  <BaseIcon name="HomeIcon" type="mini" bgColor="bg-blue-600" /> -->

</template>

<script setup lang="ts">
import BaseTable from '@/components/BaseTable.vue'
// import BaseIcon from '@/components/BaseIcon.vue'

// Datos de prueba para las props
const columns = [
  { prop: 'id', label: 'ID', sortable: false, width: 100 },
  { prop: 'name', label: 'Name', sortable: true, width: 200 },
  { prop: 'age', label: 'Age', sortable: true, width: 100 },
]

const tableData = [
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Smith', age: 25 },
  { id: 3, name: 'Alice Johnson', age: 28 },
]
</script>

<style scoped>
h1 {
  text-align: center;
}
</style>
