<template>
    <div class="justify-center items-center flex flex-col">
   
     <base-card-collapse
      ref="itemTypeMainDetailCollapseRef"
      title="HISTORIA CLINICA DENTAL"
      :is-open="true"
      :isEditing="isEditingMainDetails"
      :isEditingPencil="true"
      :show-cancel-button="showCancelButtonInMainDetail"
      @save="handleMainDetailSave"
      @edit="handleMainDetailEdit"
      @cancel="handleMainDetailCancel"
    >

      <template #body-collapse>
      <RegisterPatientForm
        ref="itemTypeMainDetailForm"
        :data="itemTypeData"
        :isEditing="isEditingMainDetails"
        @successfullyCreated="handleItemTypeSuccessfullyCreated"
        @successfullyUpdated="handleItemTypeSuccessfullyCreated"
      />
    
      
      <!-- <RecordHistory
        ref="itemTypeRecordHistory"
        :data="itemTypeData"
        :isEditing="isEditingMainDetails"
        @successfullyCreated="handleItemTypeSuccessfullyCreated"
        @successfullyUpdated="handleItemTypeSuccessfullyCreated"
      /> -->
      </template>
    </base-card-collapse>

    
        <!-- <register-consultation
          ref="itemTypeAssignmentsForm"
          :isEditing="isEditingMainDetails"
          @successfullyCreated="handleItemTypeSuccessfullyCreated"
          @successfullyUpdated="handleItemTypeSuccessfullyCreated"
        /> -->
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseCardCollapse from '@/components/BaseCardCollapse.vue'
import{ type ItemType
} from '@/components/item-type/InventoryItemTypeMainDetails.vue'
import RegisterConsultation from '@/components/register-patient/RegisterConsultation.vue'
import RegisterPatientForm from '@/components/register-patient/RegisterPatientForm.vue'
import RecordHistory from '@/components/register-patient/RecordHistory.vue'
import { useRouter} from 'vue-router'



// const route = useRoute()

// composables
// Removed unused 'route' variable
const router = useRouter()

const itemTypeMainDetailCollapseRef = ref()
const isEditingMainDetails = ref(false)
const isCreateView = ref<boolean>(true)
const itemTypeMainDetailForm = ref()
const itemTypeAssignmentsForm = ref()
const isSavedFlag = ref(false)

let itemTypeData = ref<ItemType>({
  name: '',
  description: '',
  presignedUrl: '',
  categoryId: '',
  sizes: {},
  fileName: null,
  hasSizes: false,
  stockReminder: false,
  itemNumberGeneration: false
})


const showCancelButtonInMainDetail = computed(() => {
  return isCreateView.value == false
})

const handleMainDetailSave = () => {
  if (itemTypeMainDetailForm.value) {
    changeSaveLoadingInItemTypeMainDetailCollapse(true)
    itemTypeMainDetailForm.value.save()
    isSavedFlag.value = !isSavedFlag.value
  }
}

const changeSaveLoadingInItemTypeMainDetailCollapse = (isLoading: boolean) => {
  if (itemTypeMainDetailCollapseRef.value) {
    itemTypeMainDetailCollapseRef.value.changeSaveButtonLoading(isLoading)
  }
}

const showFormViewInMainDetail = () => {
  isEditingMainDetails.value = true
}

const handleMainDetailEdit = () => {
  showFormViewInMainDetail()
  isSavedFlag.value = false
}

const handleMainDetailCancel = () => {
  showPreviewViewInMainDetail()
}

const showPreviewViewInMainDetail = () => {
  isEditingMainDetails.value = false
}

const handleItemTypeSuccessfullyCreated = async (payload: { itemTypeId: string }) => {
  showPreviewViewInMainDetail()
  changeSaveLoadingInItemTypeMainDetailCollapse(false)

  router.push({
    name: 'inventoryItemTypeDetail',
    params: { id: payload.itemTypeId },
    query: { new: 'true' }
  })

  isCreateView.value = false

  itemTypeAssignmentsForm.value?.hiddenLoading()
  itemTypeMainDetailForm.value?.hiddenLoading()
}


</script>

<style lang="scss" scoped>

</style>