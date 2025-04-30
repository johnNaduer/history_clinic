<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">REGISTRO DE RECETAS</h1>
    <base-table
      :columns="columns"
      :tableData="tableData"
      :multiSelectActive="true"
      :showActionColumn="false"
      :showExpandableColumn="false"
      :headerOptions="headerOptions"
      @headerOptionClick="handleHeaderOptionClick"
    />

    <inventory-dialog-item
      :isOpen="showModal"
      title="Confirmación"
      @close="closeModal"
    >
    </inventory-dialog-item>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseTable from '@/components/BaseTable.vue'
import type { Option } from '@/components/BaseDropdownHeader.vue'
import InventoryDialogItem from './InventoryDialogItem.vue'

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

const headerOptions: Option[] = [{ label: 'Option 1', value: 'option1' }]

const showModal = ref<boolean>(false)
const itemTypeName = ref<string>('')

const closeModal = () => {
  showModal.value = false
}

const handleHeaderOptionClick = (option: Option) => {
  console.log('Header option clicked:', option)
  itemTypeName.value = option.label
  showModal.value = true
}
</script>

<style scoped>
h1 {
  text-align: center;
}
</style>
