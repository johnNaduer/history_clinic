<template>
  <div class="relative">
    <table class="min-w-full table-auto divide-y divide-gray-300">
      <thead class="bg-gray-100">
        <tr class="w-full">
          <th
            v-for="(col, colKey) in columns"
            :key="colKey"
            scope="col"
            :class="[{ 'pl-[0.625rem]': colKey == 0 && !multiSelectActive }]"
            class="custom-header-table"
            :style="{ width: col.width + 'px' }"
          >
            <div class="flex flex-row justify-start items-center px-[0.625rem]">
              <div
                v-if="col.visible !== false"
                class="inline-block cursor-pointer"
              >
                {{ col.label }}
              </div>
            </div>
          </th>
          <th
            scope="col"
            class="w-[70px] h-fit py-3.5 text-sm pr-2 sticky bg-gray-100 right-0 pl-2"
          >
            <div class="flex justify-end items-center mr-2 pl-2">
              <base-dropdown-header
                :options="props.headerOptions"
                v-model="selectedOption"
                ref="headerOptionsRefs"
                @option-on-click="handleHeaderOptions($event)"
              />
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 bg-white">
        <template v-for="(row, rowKey) in tableData" :key="rowKey">
          <tr
            class="py-3 hover:bg-gray-100"
            @mouseover="hoverIndex = rowKey"
            @mouseleave="hoverIndex = -1"
            :style="{ height: props.heightRow }"
          >
            <td
              class="py-3 text-sm font-normal text-gray-900"
              v-for="([, item], key) in maxData === 'All'
                ? Object.entries(row).filter(([key]) => key !== 'orderId')
                : Object.entries(row).slice(0, columns.length)"
              :key="key"
              :class="{
                'pl-[0.625rem]': key == 0 && !multiSelectActive,
                'whitespace-normal': !truncateRow,
                'whitespace-nowrap': truncateRow,
              }"
            >
              <div
                :class="[
                  'max-w-md px-[0.625rem]',
                  { truncate: truncateRow },
                  classDivPatternCell,
                ]"
                v-if="columns[key]?.visible !== false"
              >
                <span :class="{ truncate: truncateRow }">
                  {{ item }}
                </span>
              </div>
            </td>
            <td
              class="py-3 pr-2.5 right-0"
              :class="['fixed-right', hoverIndex === rowKey ? 'hover' : '']"
              :style="{ height: props.heightData }"
            >
              <div class="flex justify-end items-center mr-2 pl-2">
                <base-dropdown-menu
                  :options="dropdownOptions"
                  v-model="selectedOption"
                />
              </div>
            </td>
          </tr>
        </template>
        <tr v-if="!tableData.length" class="py-3 bg-white hover:bg-gray-100">
          <td
            :colspan="getHeaderColumns()"
            class="text-center text-gray-600 text-sm font-normal p-6"
          >
            No Data
          </td>
        </tr>
      </tbody>
    </table>

    <!-- <base-loader :isLoading="isLoading"> </base-loader> -->
  </div>
</template>

<script setup lang="ts">
// computed,
import { ref, toRefs, type PropType } from 'vue'
import BaseDropdownMenu from './BaseDropdownMenu.vue'
import BaseDropdownHeader, { type Option } from './BaseDropdownHeader.vue'

// Types
export type Column = {
  prop: string
  label: string
  sortable: boolean
  width?: number
  icon?: boolean
  image?: boolean
  pill?: boolean
  visible?: boolean
}

export type TableModel = {
  [x: string]: string | number | boolean | object | null
}

const hoverIndex = ref<number>(-1)

// Props
const props = defineProps({
  classDivPatternCell: String,
  truncateRow: {
    type: Boolean,
    default: true,
  },
  maxData: {
    type: String as PropType<'All' | 'Column'>,
    default: 'All',
  },
  multiSelectActive: {
    type: Boolean,
    default: () => false,
  },
  showActionColumn: {
    type: Boolean,
    default: () => false,
  },
  showExpandableColumn: {
    type: Boolean,
    default: () => false,
  },
  showHeader: {
    type: Boolean,
    default: () => true,
  },
  tableData: {
    type: Array as () => TableModel[],
    default: () => [],
  },
  columns: {
    type: Array as () => Column[],
    default: () => [],
  },
  rightOffset: {
    type: Number,
    required: false,
  },
  heightData: {
    type: String,
    default: '45px',
    required: false,
  },
  heightRow: {
    type: String,
    default: '',
    required: false,
  },
  paddingRightClass: {
    type: String,
    default: '16px',
    required: false,
  },
  headerOptions: {
    type: Array as PropType<Option[]>,
    default: () => [],
  },
  rowOptions: {
    type: Array as PropType<Option[]>,
    default: () => [],
  },
})

// Events
const emits = defineEmits<{
  headerOptionClick: [optionClicked: Option]
  checkboxChange: [checkboxArray: Record<string | number, any>]
  ascendingSortBy: [key: string, stateAsc: string]
  descendingSortBy: [key: string, stateDesc: string]
  copyButtonClick: [rowData: TableModel]
  clickSort: [key: string, stateColor: string]
  rowExpandChange: [
    isExpanded: boolean,
    firstLevelIndex: number,
    secondLevelIndex?: number | undefined,
    rowData?: any | undefined,
  ]
}>()

const { columns, showActionColumn, multiSelectActive, showExpandableColumn } =
  toRefs(props)
// const numberOfRows = computed(() => props.tableData.length)

const dropdownOptions = ref([
  { label: 'Manzana', value: 'manzana' },
  { label: 'Plátano', value: 'platano' },
  { label: 'Naranja', value: 'naranja' },
])

const selectedOption = ref('')

const getHeaderColumns = () => {
  return (
    columns.value.length +
    (showActionColumn.value ? 1 : 0) +
    (multiSelectActive.value && !showExpandableColumn.value ? 1 : 0)
  )
}

//show the dropdown options
const handleHeaderOptions = (optionClicked: Option) => {
  console.log('option clicked', optionClicked)
  emits('headerOptionClick', optionClicked)
}
</script>

<style scoped>
.custom-header-table {
  @apply py-3;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 650;
  color: #718094;
  font-size: 12px;
}

.icon-desc {
  color: rgba(0, 0, 0, 0);
  cursor: pointer;
}

.icon-asc {
  color: rgba(0, 0, 0, 0);
  cursor: pointer;
}

.iconBlue {
  color: #3b82f6;
}

.table-wrapper {
  white-space: nowrap;
  @apply flex;
  @apply w-full;
  @apply overflow-x-scroll;
}

table {
  @apply w-full;
}

.table-wrapper::-webkit-scrollbar {
  display: none;
}

.fixed-right {
  @apply flex;
  @apply items-center;
  @apply justify-end;
  @apply w-[100%];
  @apply relative;
}

.fixed-right.hover {
  @apply bg-gray-100;
}
</style>
