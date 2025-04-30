import type { filterOption } from '../components/BaseDropdownMenu.vue'
import { ref, computed, type Ref } from 'vue'

export const useCheckbox = (options: Ref<filterOption[]>, valueRow: Boolean) => {
  // ref variables
  const elementHovered = ref()
  const openDropdown = ref<boolean>(false)
  const selectAllInputs = ref<boolean>(false)
  const dropdownContainer = ref()
  const dropdownTop = ref()
  const windowHeight = ref<number>(0)
  const panelClasses = ref<string>('')
  const positionArrow = ref<string>('')
  const stylesArrow = ref<string>('')
  const checkedInputsList = ref<filterOption[]>([])
  const allInputsChecked = ref<boolean[]>([])
  const optionHeight = ref<number>(40)

  // Variables
  const events = {
    click: () => (openDropdown.value = !openDropdown.value),
    mouseenter: () => (openDropdown.value = true)
  }

  // Computed
  const checkedInputs = computed(() => {
    return allInputsChecked.value.filter((value) => value).length
  })

  // Methods
  const setElementHovered = (key: string | number) => {
    elementHovered.value = key
  }

  const quitElementHovered = (): void => {
    elementHovered.value = null
  }

  const isElementHovered = (key: string | number): boolean => {
    return elementHovered.value === key
  }

  const setDropdownPosition = (
    dropdownTop: Ref<number>,
    dropdownContainer: Ref<HTMLButtonElement>,
    _windowHeight: Ref<number>
  ): void => {
    dropdownTop.value = dropdownContainer.value?.getBoundingClientRect().bottom

    if (valueRow) {
      panelClasses.value = 'bottom-full top-auto'
      positionArrow.value = '-bottom-[8px]'
      stylesArrow.value = 'border-b-1 border-r-1 rounded-br'
    } else {
      panelClasses.value = 'bottom-auto top-full'
      stylesArrow.value = 'border-l-1 border-t-1 rounded-tl'
      positionArrow.value = '-top-[8px]'
    }
  }

  return {
    // refs
    allInputs: allInputsChecked,
    checkedInputs,
    checkedInputsList,
    dropdownContainer,
    dropdownTop,
    events,
    openDropdown,
    panelClasses,
    positionArrow,
    selectAllInputs,
    stylesArrow,
    windowHeight,
    optionHeight,

    // methods
    isElementHovered,
    quitElementHovered,
    setDropdownPosition,
    setElementHovered,

    //computed
    allChecked: computed(() => checkedInputs.value === options.value?.length),
    generalIndeterminate: computed(
      () => checkedInputs.value > 0 && checkedInputs.value < options.value.length
    )
  }
}

