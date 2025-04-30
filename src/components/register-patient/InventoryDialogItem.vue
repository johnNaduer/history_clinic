<template>
  <transition name="modal" appear>
    <div
      v-if="isOpen"
      class="fixed top-0 right-0 bottom-0 left-0 overflow-auto m-0 z-[51]"
    >
      <div class="modal-backdrop" @click="closeDialog"></div>
      <div
        class="relative mx-auto mb-[50px] bg-white rounded-lg shadow-md box-border w-[50%] z-[5]"
        style="margin-top: 15vh; width: 50%"
      >
        <!-- <h1>hi world !</h1> -->
        <div class="p-[30px_20px] text-gray-800 text-sm">
          <h1>RECETA MEDICA</h1>
          <form class="el-form el-form--label-left">
            <div class="mb-[22px] is-required">
              <label
                for="newStatus"
                class="el-form-item__label_reason text-left align-middle float-left text-sm text-gray-800 leading-[35px] px-0 pr-3 box-border w-[150px]"
                style="width: 200px"
                >Fecha
              </label>
              <div
                class="select-custom leading-10 relative text-sm"
                style="margin-left: 200px"
              >
                <base-form-input
                  v-model:value="dataReasonChange2"
                  field-name="name"
                  type="text"
                  :height-input="heightInput"
                />
              </div>

              <label
                for="newStatus"
                class="el-form-item__label_reason text-left align-middle float-left text-sm text-gray-800 leading-[35px] px-0 pr-3 box-border w-[150px]"
                style="width: 200px"
                >Especialidad
              </label>
              <div
                class="select-custom leading-10 relative text-sm"
                style="margin-left: 200px"
              >
                <base-form-input
                  v-model:value="dataReasonChange2"
                  field-name="name"
                  type="text"
                  :height-input="heightInput"
                />
              </div>
              <h1>DIAGNOSTICOS</h1>
              <div class="dynamic-inputs-container">
                <div
                  v-for="(value, index) in inputs"
                  :key="index"
                  class="input-row"
                >
                  <base-form-input-select-custom
                    v-model:value="selectedOption[index]"
                    field-name="name"
                    :options="options"
                    :height-input="heightInput"
                    :is-disabled="false"
                    :is-required="true"
                    label="Diagnostico"
                    :label-width="200"
                  ></base-form-input-select-custom>

                  <base-form-input
                    v-model:value="dataReasonChange[index]"
                    field-name="name"
                    type="text"
                    :height-input="heightInput"
                  />
                  <button
                    v-if="inputs.length > 1"
                    @click="removeInput(index)"
                    type="button"
                    class="remove-btn"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>

            <button @click="addInput" type="button" class="add-btn">
              + Añadir otro
            </button>

            <h1>MEDICAMENTO O INSUMO - CONCENTRACIÓN - FORM - FARMAC.</h1>
            <div class="dynamic-inputs-container">
              <div
                v-for="(value, index) in inputs"
                :key="index"
                class="input-row"
              >
                <base-form-input-select-custom
                  v-model:value="selectedOption[index]"
                  field-name="name"
                  :options="options3"
                  :height-input="heightInput"
                  :is-disabled="false"
                  :is-required="true"
                  label="Unidad"
                  :label-width="200"
                ></base-form-input-select-custom>

                <base-form-input
                  v-model:value="dataNameMedicine[index]"
                  label="nombre"
                  field-name="name"
                  type="text"
                  :height-input="heightInput"
                />

                <base-form-input
                  v-model:value="dataDosis[index]"
                  label="Dosis"
                  field-name="name"
                  type="text"
                  :height-input="heightInput"
                />

                <base-form-input-select-custom
                  v-model:value="selectedOption[index]"
                  field-name="name"
                  :options="options2"
                  :height-input="heightInput"
                  :is-disabled="false"
                  :is-required="true"
                  label="tiempo"
                  :label-width="200"
                  @onChangeInputValue="onChangeInputValue(index, $event)"
                ></base-form-input-select-custom>

                <base-form-input
                  v-model:value="dataReasonChange4[index]"
                  label="Q (u/t)"
                  field-name="name"
                  type="text"
                  :height-input="heightInput"
                />

                frecuencia: {{ dataFrecuencia[index] }}

                <button
                  v-if="inputs.length > 1"
                  @click="removeInput(index)"
                  type="button"
                  class="remove-btn"
                >
                  ×
                </button>
              </div>
            </div>
          </form>
          <span class="dialog-footer space-x-2 mt-16 flex justify-end">
            <base-button
              class="rounded-lg"
              label="Cancel"
              type="cancel"
              :plain="false"
              @click="closeDialog"
            />
            <span
              class="el-tooltip"
              aria-describedby="el-tooltip-1986"
              tabindex="0"
            >
              <base-button
                type="primary"
                label="Update"
                :plain="false"
                :is-disabled="getIsDisabled"
                :is-loading="isLoadingEditItem"
                class="py-1 px-4 hover:bg-blue-600 transition-all duration-200 h-10 rounded-lg"
                @click="updateDialog"
              ></base-button>
            </span>
          </span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseFormInput from '../BaseFormInput.vue'
import BaseFormInputSelectCustom, {
  type Option,
} from '../BaseFormInputSelectCustom.vue'

const inputs = ref<string[]>([''])
const selectedOption = ref<string[]>([''])

const options = ref<Option[]>([
  {
    id: '1',
    label: 'Presuntivo',
  },
  {
    id: '2',
    label: 'Definitivo',
  },
])

const options2 = ref<Option[]>([
  {
    id: '1',
    label: 'dia',
  },
  {
    id: '2',
    label: 'hora',
  },
])

const options3 = ref<Option[]>([
  {
    id: '1',
    label: 'TABLETA',
  },
  {
    id: '2',
    label: '500mg',
  },
])

type SelectStatus = {
  id: string
  label?: string
}

defineProps({
  isOpen: Boolean,
  title: {
    type: String,
    default: 'Modal Title',
  },
})

const emits = defineEmits(['close', 'confirm', 'successUpdateStatus'])

const heightInput = ref<string>('40px')

const isLoadingEditItem = ref<boolean>(false)
const dataReasonChange = ref<string[]>([''])
const dataReasonChange4 = ref<string[]>([''])
const dataNameMedicine = ref<string[]>([''])
const dataDosis = ref<string[]>([''])

const dataReasonChange2 = ref<string>('')
const selectedStatus = ref<SelectStatus>({ id: '', label: '' })
const selectedStatusDisabled = ref<string>('')

// const dataFrecuencia2 = computed<string[]>(() => {
//   return selectedOption.value.map((option, index) => {
//     const dosis = Number(dataDosis.value[index]) || 0

//     if (option === '1') {
//       const horasPorDia = 24
//       return dosis > 0 ? (horasPorDia / dosis).toString() : '0'
//     } else if (option === '2') {
//       return dosis.toString()
//     }

//     return '0'
//   })
// })

const dataFrecuencia = ref<string[]>([])

const onChangeInputValue = (
  index: number,
  payload: { fieldName: string; value: string },
) => {
  if (payload.value === '1') {
    const dosis = Number(dataDosis.value[index]) || 0
    const horasPorDia = 24
    dataFrecuencia.value[index] =
      dosis > 0 ? (horasPorDia / dosis).toString() : '0'
  } else if (payload.value === '2') {
    dataFrecuencia.value[index] = dataDosis.value[index]
  } else {
    dataFrecuencia.value[index] = '0'
  }

  console.log('value', payload)
}

const getIsDisabled = computed(() => {
  return selectedStatusDisabled.value === selectedStatus.value.label
})

const updateDialog = async () => {
  isLoadingEditItem.value = true

  try {
    closeDialog()
    emits('successUpdateStatus')
  } catch (error: any) {
    console.log(
      '[InventoryDialogItem] Error on function updateDialog()',
      error,
      'whilst Editing Status Item',
    )
  } finally {
    isLoadingEditItem.value = false
  }
}

const addInput = () => {
  inputs.value.push('') // Añade un nuevo string vacío
  console.log('inputs', inputs.value)
}

const removeInput = (index: number) => {
  if (inputs.value.length > 1) {
    inputs.value.splice(index, 1)
  }
}

const closeDialog = () => emits('close')
</script>

<style scoped>
.required > .el-form-item__label_status:before {
  content: '*';
  color: #f56c6c;
  margin-right: 4px;
}

.el-form-item__label_status {
  line-height: 45px;
}

.required > .el-form-item__label_date:before {
  content: '*';
  color: #f56c6c;
  margin-right: 4px;
}

.el-form-item__label_date {
  line-height: 35px;
  justify-content: none !important;
}

.required > .el-form-item__label_reason:before {
  content: '*';
  color: #f56c6c;
  margin-right: 4px;
}

.el-form-item__label_reason {
  line-height: 35px;
  justify-content: none !important;
}

.ClockIcon {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
}

.el-dialog__title {
  line-height: 24px;
  font-size: 18px;
  color: #303133;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (min-width: 1920px) and (max-width: 2399px) {
  .select-custom {
    @apply w-[710px];
  }
}

.dynamic-inputs-container {
  max-width: 500px;
  margin: 0 auto;
}

.input-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.standard-input {
  flex-grow: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.add-btn {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.add-btn:hover {
  background-color: #3aa876;
}

.remove-btn {
  margin-left: 10px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-btn:hover {
  background-color: #ff5252;
}

.debug {
  margin-top: 20px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 12px;
}
</style>
