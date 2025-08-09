<template>
    <div class="pb-4">
      <base-loader :isLoading="isLoading" />
  
      <inventory-item-type-main-details-form
        v-if="isEditing"
        ref="form"
        :data="itemTypeData"
        :categories="categories"
        @successfullyCreated="handleSuccessfullyCreated"
        @successfullyUpdated="handleSuccessfullyUpdated"
        @failedCreated="handleFailedCreated"
        @categoryCreated="handleCategoryCreated"
        @failed-updated="handleFailedUpdated"
        @failed-request-created="handleFailedRequestCreated"
      />
  
      <inventory-item-type-main-details-view v-else :data="itemTypeData" :categories="categories" />
  
      <base-toast
        :toastStoreLength="toasterStore.toasts.length"
        :toastStore="toasterStore.toasts"
        @closeToast="closeToast"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, toRef, watch, onMounted } from 'vue'
  import InventoryItemTypeMainDetailsView from '@/components/item-type/InventoryItemTypeMainDetailsView.vue'
  import InventoryItemTypeMainDetailsForm from '@/components/item-type/InventoryItemTypeMainDetailsForm.vue'
  import { getInventoryData } from '@/composables/InventoryApiClient'
  import { useToastStore } from '@/stores/toast'
  import type { IToast } from '@/types/toast'
  
  // Stores
  const toasterStore = useToastStore()
  
  // Types
  type ItemTypeSizeEntry = {
    stock: number
    id: string
  }
  
  type ItemTypeSize = {
    [key: string]: ItemTypeSizeEntry
  }
  
  export type ItemType = {
    id?: string
    name: string
    fileName?: string | null
    description: string
    presignedUrl: string
    categoryId: string
    sizes: ItemTypeSize
    hasSizes: boolean
    stockReminder: boolean
    minimumStockReminder?: number
    itemNumberGeneration: boolean
  }
  
  // props
  const props = defineProps({
    data: {
      type: Object as () => ItemType,
      required: true
    },
    isEditing: {
      type: Boolean,
      required: true
    }
  })
  
  // Emits
  const emit = defineEmits<{
    (e: 'successfullyCreated', payload: { itemTypeId: string }): void
    (e: 'successfullyUpdated', payload: { itemTypeId: string; data: any }): void
    (e: 'failedCreated'): void
    (e: 'categoriesLoaded', categories: { id: string | number; label: string }[]): void
    (e: 'failedUpdated', isLoading: boolean): void
    (e: 'failedRequestCreated', isLoading: boolean): void
  }>()
  
  // data
  const itemTypeData = toRef(props, 'data')
  const isEditing = toRef(props, 'isEditing')
  const form = ref()
  const categories = ref<{ id: string | number; label: string }[]>([])
  const isLoading = ref<boolean>(true)
  const initialData = ref<ItemType>({ ...props.data })
  const isSaving = ref<boolean>(false)
  
  // Toast [methods]
  const showToastError = (title: string, message: string) => {
    toasterStore.error({ title, text: message })
  }
  
  const closeToast = (toast: IToast) => {
    toasterStore.removeToast(toast)
  }
  
  const isFormValid = () => {
    if (form.value) {
      return form.value.isValidItemTypeMainDetailForm()
    }
  }
  
  // methods
  const save = () => {
    if (form.value) {
      isSaving.value = true
      form.value.save()
    }
  }
  
  const handleCategoryCreated = async () => {
    await getCategories()
  }
  
  const handleFailedCreated = () => {
    emit('failedCreated')
  }
  
  const handleFailedRequestCreated = (isLoading: boolean) => {
    emit('failedRequestCreated', isLoading)
  }
  
  const handleFailedUpdated = (isLoading: boolean) => {
    emit('failedUpdated', isLoading)
  }
  
  const handleSuccessfullyUpdated = (payload: { itemTypeId: string; data: any }) => {
    emit('successfullyUpdated', {
      itemTypeId: payload.itemTypeId,
      data: payload.data
    })
  }
  
  const handleSuccessfullyCreated = (payload: { itemTypeId: string }) => {
    emit('successfullyCreated', {
      itemTypeId: payload.itemTypeId
    })
  }
  
  function isResponseValid(
    response: any
  ): response is { data: { categories: Array<{ id: string | number; name: string }> } } {
    return (
      response && typeof response === 'object' && 'data' in response && 'categories' in response.data
    )
  }
  
  const getCategories = async () => {
    try {
      const jsonBody = await getInventoryData('categories/list')
  
      if (isResponseValid(jsonBody)) {
        categories.value = jsonBody.data.categories.map((category: any) => ({
          id: category.id,
          label: category.name
        }))
        emit('categoriesLoaded', categories.value)
      }
    } catch (error) {
      console.log(
        '[InventoryItemTypeMainDetails.vue] Error on function getCategories()',
        error,
        'whilst loading categories'
      )
      showToastError('Categories Request', 'An error occurred whilst loading categories')
    }
  }
  
  const showLoading = () => {
    isLoading.value = true
  }
  
  const hiddenLoading = () => {
    isLoading.value = false
  }
  
  watch([isEditing, isSaving], ([newIsEditing, newIsSaving]) => {
    const dataParsed = props.data
    if (newIsEditing) {
      initialData.value = { ...dataParsed }
    } else if (!newIsSaving) {
      itemTypeData.value.name = dataParsed.name
      itemTypeData.value.description = dataParsed.description
      itemTypeData.value.presignedUrl = dataParsed.presignedUrl
      itemTypeData.value.categoryId = dataParsed.categoryId
      itemTypeData.value.sizes = dataParsed.sizes
      itemTypeData.value.hasSizes = dataParsed.hasSizes
      itemTypeData.value.stockReminder = dataParsed.stockReminder
      itemTypeData.value.itemNumberGeneration = dataParsed.itemNumberGeneration
      itemTypeData.value.minimumStockReminder = dataParsed.minimumStockReminder
    }
  })
  
  onMounted(async () => {
    await getCategories()
    isSaving.value = false
  })
  
  defineExpose({ save, showLoading, hiddenLoading, isFormValid, isSaving })
  </script>
  