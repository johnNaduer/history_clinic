<template>
    <div>
     <base-card-collapse
      ref="itemTypeMainDetailCollapseRef"
      title="MAIN DETAILS"
      :is-open="true"
      :isEditing="isEditingMainDetails"
      :isEditingPencil="true"
      :show-cancel-button="showCancelButtonInMainDetail"
      @save="handleMainDetailSave"
      @edit="handleMainDetailEdit"
      @cancel="handleMainDetailCancel"
    >
      <template #body-collapse>
        <pre> hola mundo </pre>
        <!-- <h1>Página actual: {{ route.path }}</h1> -->
        <inventory-item-type-main-details
          ref="itemTypeMainDetailForm"
          :data="itemTypeData"
          :isEditing="isEditingMainDetails"
          @successfullyCreated="handleItemTypeSuccessfullyCreated"
          @successfullyUpdated="handleItemTypeSuccessfullyCreated"
          @categoriesLoaded="handleCategoriesLoaded"
          @failed-created="handleFailedCreated"
          @failed-updated="handleFailedUpdated"
          @failed-request-created="handleFailedRequestCreated"
        />

      </template>
    </base-card-collapse>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseCardCollapse from '@/components/BaseCardCollapse.vue'
import InventoryItemTypeMainDetails, {
  type ItemType
} from '@/components/item-type/InventoryItemTypeMainDetails.vue'
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